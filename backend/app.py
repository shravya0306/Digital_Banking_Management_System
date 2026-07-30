"""TrustBank authentication backend.

Endpoints:
    POST /register  - create a new customer account
    POST /login      - authenticate with email OR mobile + password

Run with:
    python app.py
"""

import sqlite3

from flask import Flask, jsonify, request
from flask_cors import CORS
from werkzeug.security import check_password_hash, generate_password_hash

from database import get_connection, init_db

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "http://localhost:4200"}})

DEFAULT_INITIAL_BALANCE = 10000
DEFAULT_IFSC_CODE = "VELR0001001"
DEFAULT_BRANCH = "Bangalore Main"

REQUIRED_REGISTER_FIELDS = [
    "full_name",
    "email",
    "mobile",
    "aadhaar",
    "pan",
    "address",
    "account_type",
    "password",
]


def generate_account_number(customer_id: int) -> str:
    """Deterministic, unique 12-digit account number derived from customer_id."""
    return f"5010{customer_id:08d}"


@app.post("/register")
def register():
    data = request.get_json(silent=True) or {}

    missing = [field for field in REQUIRED_REGISTER_FIELDS if not data.get(field)]
    if missing:
        return jsonify(
            {
                "success": False,
                "message": f"Missing required field(s): {', '.join(missing)}.",
            }
        ), 400

    full_name = data["full_name"]
    email = data["email"]
    mobile = data["mobile"]
    aadhaar = data["aadhaar"]
    pan = data["pan"]
    address = data["address"]
    account_type = data["account_type"]
    password = data["password"]

    conn = get_connection()
    try:
        existing = conn.execute(
            """
            SELECT 1 FROM Customer
            WHERE email = ? OR mobile = ? OR aadhaar = ? OR pan = ?
            """,
            (email, mobile, aadhaar, pan),
        ).fetchone()

        if existing:
            return jsonify(
                {"success": False, "message": "Customer already exists."}
            ), 400

        password_hash = generate_password_hash(password)

        cursor = conn.execute(
            """
            INSERT INTO Customer
                (full_name, email, mobile, aadhaar, pan, address, account_type, password_hash)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)
            """,
            (full_name, email, mobile, aadhaar, pan, address, account_type, password_hash),
        )

        customer_id = cursor.lastrowid
        account_number = generate_account_number(customer_id)

        conn.execute(
            """
            INSERT INTO Account
                (account_number, customer_id, account_type, balance, ifsc_code, branch)
            VALUES (?, ?, ?, ?, ?, ?)
            """,
            (
                account_number,
                customer_id,
                account_type,
                DEFAULT_INITIAL_BALANCE,
                DEFAULT_IFSC_CODE,
                DEFAULT_BRANCH,
            ),
        )

        conn.commit()

        return jsonify(
            {"success": True, "message": "Registration successful."}
        ), 201

    except sqlite3.IntegrityError:
        return jsonify(
            {"success": False, "message": "Customer already exists."}
        ), 400
    finally:
        conn.close()


@app.post("/login")
def login():
    data = request.get_json(silent=True) or {}

    identifier = data.get("identifier") or data.get("email") or data.get("mobile")
    password = data.get("password")

    if not identifier or not password:
        return jsonify(
            {"success": False, "message": "Invalid credentials."}
        ), 401

    conn = get_connection()
    try:
        customer = conn.execute(
            "SELECT * FROM Customer WHERE email = ? OR mobile = ?",
            (identifier, identifier),
        ).fetchone()

        if customer is None or not check_password_hash(
            customer["password_hash"], password
        ):
            return jsonify(
                {"success": False, "message": "Invalid credentials."}
            ), 401

        account = conn.execute(
            "SELECT account_number FROM Account WHERE customer_id = ?",
            (customer["customer_id"],),
        ).fetchone()

        return jsonify(
            {
                "success": True,
                "customer_id": customer["customer_id"],
                "full_name": customer["full_name"],
                "account_number": account["account_number"] if account else None,
            }
        ), 200
    finally:
        conn.close()


@app.get("/customer/dashboard")
def customer_dashboard():
    customer_id = request.args.get("customer_id")

    if not customer_id:
        return jsonify({"success": False, "message": "customer_id is required."}), 400

    conn = get_connection()
    try:
        row = conn.execute(
            """
            SELECT c.full_name, a.account_number, a.account_type, a.balance
            FROM Customer c
            JOIN Account a ON a.customer_id = c.customer_id
            WHERE c.customer_id = ?
            """,
            (customer_id,),
        ).fetchone()

        if row is None:
            return jsonify({"success": False, "message": "Customer not found."}), 404

        return jsonify(
            {
                "success": True,
                "full_name": row["full_name"],
                "account_number": row["account_number"],
                "account_type": row["account_type"],
                "balance": row["balance"],
            }
        ), 200
    finally:
        conn.close()


@app.get("/customer/profile")
def customer_profile():
    customer_id = request.args.get("customer_id")

    if not customer_id:
        return jsonify({"success": False, "message": "customer_id is required."}), 400

    conn = get_connection()
    try:
        row = conn.execute(
            """
            SELECT
                c.customer_id, c.full_name, c.email, c.mobile, c.aadhaar, c.pan, c.address,
                a.account_type, a.account_number, a.ifsc_code, a.branch
            FROM Customer c
            JOIN Account a ON a.customer_id = c.customer_id
            WHERE c.customer_id = ?
            """,
            (customer_id,),
        ).fetchone()

        if row is None:
            return jsonify({"success": False, "message": "Customer not found."}), 404

        return jsonify({"success": True, "profile": dict(row)}), 200
    finally:
        conn.close()


@app.post("/transfer")
def transfer():
    data = request.get_json(silent=True) or {}

    customer_id = data.get("customer_id")
    receiver_account = data.get("receiver_account")
    amount = data.get("amount")
    remarks = data.get("remarks", "")

    if not customer_id or not receiver_account or amount is None:
        return jsonify(
            {"success": False, "message": "customer_id, receiver_account and amount are required."}
        ), 400

    try:
        amount = float(amount)
    except (TypeError, ValueError):
        return jsonify({"success": False, "message": "Invalid amount."}), 400

    if amount <= 0:
        return jsonify({"success": False, "message": "Amount must be greater than zero."}), 400

    conn = get_connection()
    try:
        sender = conn.execute(
            "SELECT * FROM Account WHERE customer_id = ?", (customer_id,)
        ).fetchone()

        if sender is None:
            return jsonify({"success": False, "message": "Sender account not found."}), 404

        if sender["account_number"] == receiver_account:
            return jsonify(
                {"success": False, "message": "Cannot transfer to the same account."}
            ), 400

        receiver = conn.execute(
            "SELECT * FROM Account WHERE account_number = ?", (receiver_account,)
        ).fetchone()

        if receiver is None:
            return jsonify({"success": False, "message": "Receiver account does not exist."}), 404

        if sender["balance"] < amount:
            return jsonify({"success": False, "message": "Insufficient balance."}), 400

        conn.execute(
            "UPDATE Account SET balance = balance - ? WHERE account_number = ?",
            (amount, sender["account_number"]),
        )
        conn.execute(
            "UPDATE Account SET balance = balance + ? WHERE account_number = ?",
            (amount, receiver["account_number"]),
        )
        conn.execute(
            """
            INSERT INTO "Transaction"
                (sender_account, receiver_account, amount, remarks, status)
            VALUES (?, ?, ?, ?, ?)
            """,
            (sender["account_number"], receiver["account_number"], amount, remarks, "SUCCESS"),
        )
        conn.commit()

        return jsonify({"success": True, "message": "Transfer successful."}), 200
    finally:
        conn.close()


@app.get("/transactions")
def transactions():
    customer_id = request.args.get("customer_id")

    if not customer_id:
        return jsonify({"success": False, "message": "customer_id is required."}), 400

    conn = get_connection()
    try:
        account = conn.execute(
            "SELECT account_number FROM Account WHERE customer_id = ?", (customer_id,)
        ).fetchone()

        if account is None:
            return jsonify({"success": False, "message": "Account not found."}), 404

        account_number = account["account_number"]

        rows = conn.execute(
            """
            SELECT transaction_id, sender_account, receiver_account, amount, remarks, status, transaction_date
            FROM "Transaction"
            WHERE sender_account = ? OR receiver_account = ?
            ORDER BY transaction_date DESC
            """,
            (account_number, account_number),
        ).fetchall()

        results = []
        for row in rows:
            results.append(
                {
                    "transaction_id": row["transaction_id"],
                    "sender_account": row["sender_account"],
                    "receiver_account": row["receiver_account"],
                    "amount": row["amount"],
                    "remarks": row["remarks"],
                    "status": row["status"],
                    "transaction_date": row["transaction_date"],
                    "direction": "DEBIT" if row["sender_account"] == account_number else "CREDIT",
                }
            )

        return jsonify({"success": True, "transactions": results}), 200
    finally:
        conn.close()


if __name__ == "__main__":
    init_db()
    app.run(debug=True, port=5000)
