# Velora Bank: Digital Banking Management System

**A full-stack digital banking web application with customer accounts,
money transfers, transaction history, and an admin portal.**


## Overview

Velora Bank is an educational digital banking application built with an
Angular frontend, a Flask REST API, and SQLite. Customers can register,
log in, view account information, transfer money, and review transaction
history. An admin portal provides views of customers and transactions.

## Live demo

-   **Frontend (Netlify): https://sparkly-wisp-4bc6ce.netlify.app/
-   **Backend API (Render): https://digital-banking-management-system.onrender.com
-   **GitHub:**
    https://github.com/shravya0306/Digital_Banking_Management_System

Do not publish demo credentials unless you have intentionally created
safe, non-sensitive demo accounts. If you do, document the demo customer
and admin logins here.

## Features

### Customer

-   Registration with validation
-   Login
-   Dashboard and profile
-   Account details
-   Transfers between accounts
-   Transaction history

### Admin

-   Admin login
-   View customers
-   View transactions

### Audit logging

Document this section only if audit logging is implemented in the
current code. If implemented, specify the recorded events, stored
fields, and where authorized admins can view the records. Otherwise,
remove this section from the published README.

## Tech stack

  Layer        Technology
  ------------ --------------------------------------
  Frontend     Angular, TypeScript, HTML, SCSS
  Backend      Flask (Python), Flask-CORS, Werkzeug
  Database     SQLite
  Deployment   Netlify (frontend), Render (backend)

## Architecture

``` mermaid
flowchart LR
    A[Angular frontend] -->|REST API calls| B[Flask backend]
    B --> C[(SQLite database)]
```

## Security measures

The project description indicates the following measures; confirm they
are implemented in the current code before presenting them as
verified: - Password hashing with Werkzeug rather than storing plaintext
passwords - Input validation for registration and transfers - Uniqueness
checks for email, mobile number, Aadhaar, and PAN - SQLite foreign-key
constraints for data consistency

This is an educational demo, not production banking software. Use dummy
data only.

## Database design

Add the actual database tables and key columns from `database.py` here.
For example, document users, accounts, and transactions only if those
tables exist in the current implementation. Include an audit table only
if one is implemented.

## Project structure

``` text
Digital_Banking_Management_System/
├── backend/
│   ├── app.py
│   ├── database.py
│   └── requirements.txt
├── src/
│   ├── app/
│   ├── assets/
│   └── styles.scss
├── angular.json
├── package.json
└── README.md
```

Adjust this tree if the actual repository structure differs.

## Run locally

### Requirements

-   Python and pip
-   Node.js and npm
-   Angular CLI, if it is not installed through the project's scripts

Clone the repository:

``` bash
git clone https://github.com/shravya0306/Digital_Banking_Management_System.git
cd Digital_Banking_Management_System
```

### Backend

In a terminal:

``` bash
cd backend
pip install -r requirements.txt
python app.py
```

The backend is expected to run at http://localhost:5000 if that is the
port configured in `app.py`.

### Frontend

Open a second terminal from the repository root:

``` bash
npm install
npx ng serve
```

The frontend is expected to run at http://localhost:4200 with the
default Angular development server settings. If the backend URL is
configured through an environment file, use the appropriate local API
URL.

## What I learned

-   Designing relational data models for users, accounts, and
    transactions
-   Building REST endpoints and connecting them to an Angular frontend
-   Implementing authentication, password hashing, and input validation
-   Deploying frontend and backend services separately

## Roadmap

-   [ ] Add or strengthen role-based access control and token-based
    authentication, if not already implemented
-   [ ] Add tamper-evident audit logs using a hash chain
-   [ ] Add automated tests and CI
-   [ ] Verify transfers are atomic and add rollback tests

Update these roadmap items to reflect the current state of the project.

## Disclaimer

Educational project only. This application is not production banking
software and must not be used for real financial transactions or
sensitive personal information.

## Author

**Shravya H Somayaji** ·
[LinkedIn](https://www.linkedin.com/in/shravya-somayaji-38b051357/) ·
[GitHub](https://github.com/shravya0306)
