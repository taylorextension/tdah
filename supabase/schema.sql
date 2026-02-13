-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create Users Table
CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email TEXT UNIQUE NOT NULL,
    purchase_id TEXT NOT NULL,          -- Transaction ID (Cakto)
    product_id TEXT,                    -- Product ID (Cakto) - Useful if you sell multiple books later
    status TEXT DEFAULT 'active',       -- 'active', 'refunded', 'canceled'
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_users_purchase_id ON users(purchase_id);

-- Row Level Security (RLS)
-- We enable RLS but create a policy allowing only service role to insert/update, 
-- effectively blocking public access via anon key.
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow service role full access" ON users
    USING (auth.role() = 'service_role')
    WITH CHECK (auth.role() = 'service_role');
