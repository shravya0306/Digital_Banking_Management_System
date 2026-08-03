"""SQLite connection + schema setup for the Velora Bank backend.

Uses the standard library sqlite3 module only (no SQLAlchemy).
"""

import sqlite3
from pathlib import Path
from werkzeug.security import generate_password_hash

DB_PATH = Path(__file__).parent / "banking.db"


def get_connection() -> sqlite3.Connection:
    """Return a new SQLite connection with row access by column name."""
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    conn.execute("PRAGMA foreign_keys = ON")
    return conn


def init_db() -> None:
    """Create the Customer, Account and Transaction tables if they don't already exist."""
    conn = get_connection()
    try:
        conn.execute(
            """
            CREATE TABLE IF NOT EXISTS Customer (
                customer_id INTEGER PRIMARY KEY AUTOINCREMENT,
                full_name TEXT NOT NULL,
                email TEXT UNIQUE NOT NULL,
                mobile TEXT UNIQUE NOT NULL,
                aadhaar TEXT UNIQUE NOT NULL,
                pan TEXT UNIQUE NOT NULL,
                address TEXT NOT NULL,
                account_type TEXT NOT NULL,
                password_hash TEXT NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
            """
        )

        conn.execute(
            """
            CREATE TABLE IF NOT EXISTS Account (
                account_number TEXT PRIMARY KEY,
                customer_id INTEGER NOT NULL,
                account_type TEXT NOT NULL,
                balance REAL NOT NULL DEFAULT 10000,
                ifsc_code TEXT NOT NULL,
                branch TEXT NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (customer_id) REFERENCES Customer (customer_id)
            )
            """
        )

        conn.execute(
            """
            CREATE TABLE IF NOT EXISTS "Transaction" (
                transaction_id INTEGER PRIMARY KEY AUTOINCREMENT,
                sender_account TEXT NOT NULL,
                receiver_account TEXT NOT NULL,
                amount REAL NOT NULL,
                remarks TEXT,
                status TEXT NOT NULL,
                transaction_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
            """
        )

        conn.execute(
            """
            CREATE TABLE IF NOT EXISTS Admin (
                admin_id INTEGER PRIMARY KEY AUTOINCREMENT,
                username TEXT UNIQUE NOT NULL,
                password_hash TEXT NOT NULL
                
            )
            """
        )
        admin_exists = conn.execute(
            "SELECT 1 FROM Admin WHERE username = ?",
            ("admin",)
        ).fetchone()

        if not admin_exists:
            conn.execute(
                """
                INSERT INTO Admin (username, password_hash)
                VALUES (?, ?)
                """,
                (
                    "admin",
                    generate_password_hash("admin123"),
                ),
            )

        conn.commit()
    finally:
        conn.close()
