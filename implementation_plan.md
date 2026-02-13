# Engineering Plan: TDAH Ebook Backend & Auth Migration

This document outlines the architecture and implementation steps to add backend logic, database persistence, and authentication to the TDAH Next.js application.

## 1. System Architecture

### Components
-   **Database**: Supabase (PostgreSQL)
    -   Store buyer information (`users` table).
-   **Payment Gateway**: Cakto
    -   Triggers Webhook on `purchase_approved`.
-   **Backend**: Next.js API Routes
    -   `/api/webhooks/cakto`: Receives payment notifications.
    -   `/api/auth/login`: verifies email and issues session.
-   **Security**: Next.js Middleware
    -   Protects `/chapters/*` routes.
-   **Frontend**: Login Page
    -   Custom UI matching the branding.

---

## 2. Database Schema (Supabase)

We will create a single table to track authorized users.

### Table: `users`
| Column | Type | Constraints | Description |
| :--- | :--- | :--- | :--- |
| `id` | UUID | PK, Default: `gen_random_uuid()` | Internal User ID |
| `email` | Text | Unique, Not Null | Buyer's email (Login key) |
| `purchase_id` | Text | Not Null | Transaction ID from Cakto (`data.id`) |
| `product_id` | Text | Nullable | Content ID (`data.product.id`) |
| `status` | Text | Default: 'active' | User access status |
| `created_at` | Timestamptz | Default: `now()` | Record creation time |

**Indexes:**
-   `email`: For fast login lookups.
-   `purchase_id`: For idempotency (prevent duplicate webhook processing).

---

## 3. API Routes Implementation

### A. Webhook Handler: `/api/webhooks/cakto`
**Method:** `POST`

**Logic:**
1.  **Validate Secret**: Check if `payload.secret` matches `process.env.CAKTO_SECRET`.
2.  **Filter Event**: Process only if `event === 'purchase_approved'`.
3.  **Extract Data**:
    -   Email: `data.customer.email`
    -   Purchase ID: `data.id`
4.  **Database Operation**:
    -   Perform `upsert` on `users` table based on `email` or `purchase_id`.
    -   *Note*: If email exists, update purchase info; if not, create new user.
5.  **Response**: Return `200 OK` (to satisfy Cakto's retry mechanism).

### B. Login Handler: `/api/auth/login`
**Method:** `POST`

**Body:** `{ email: string }`

**Logic:**
1.  **Validate Input**: Ensure email is valid format.
2.  **Database Lookup**: `SELECT * FROM users WHERE email = ?`.
3.  **Verification**:
    -   If user exists -> **Success**.
    -   If user does not exist -> **Error** ("Email não encontrado ou compra não confirmada").
4.  **Session Creation**:
    -   Create a JWT containing `{ userId, email, role: 'reader' }`.
    -   Sign with `process.env.JWT_SECRET`.
5.  **Cookie Setting**:
    -   Set `httpOnly` cookie named `tdah_session`.
    -   Path: `/`.
    -   MaxAge: 30 days (persistent login).
6.  **Response**: JSON `{ success: true }`.

---

## 4. Security & Middleware

### Middleware: `middleware.js`
**Scope:** Match `/chapters/:path*`

**Logic:**
1.  Check for `tdah_session` cookie.
2.  **Verify Token**: Decode and verify JWT signature.
3.  **Decision**:
    -   **Valid**: Allow request (`NextResponse.next()`).
    -   **Invalid/Missing**: Redirect to `/login?callbackUrl=...`.

---

## 5. Frontend Implementation

### Login Page: `app/login/page.js`
**Design:**
-   **Background**: Uses `cover-bg.jpeg` with overlay (same as Cover).
-   **UI Elements**:
    -   Book Title/Branding.
    -   Card with "Área do Leitor".
    -   Input Field: `type="email"`, white text, minimal border.
    -   **Mobile Optimization**: `font-size: 16px` on input to prevent iOS zoom on focus.
    -   Button: "Acessar Guia".
-   **Feedback**: Loading state and error messages (toast).

---

## 6. Migration Steps

1.  **Supabase Setup**:
    -   Create Project.
    -   Run SQL to create table `users`.
    -   Get API Keys (`NEXT_PUBLIC_SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`).
2.  **Environment Variables**:
    -   Add `CAKTO_SECRET`, `JWT_SECRET`, and Supabase keys to `.env.local`.
3.  **Install Dependencies**:
    -   `@supabase/supabase-js` (Database client).
    -   `jose` (Lightweight JWT library for Edge Runtime/Middleware compatibility).
4.  **Develop Backend**:
    -   Create API Routes.
    -   Create Middleware.
5.  **Develop Frontend**:
    -   Create Login Page.
    -   Connect Login Form to API.

## 7. MCP Usage
-   **Supabase MCP**: Not required directly. We will use the standard `@supabase/supabase-js` library which is the industry standard for Next.js applications alongside `database-design` principles for the schema.
-   **Validation**: We will manually implement the secret validation logic as per Cakto docs.
