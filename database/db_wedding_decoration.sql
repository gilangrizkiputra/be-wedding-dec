-- Active: 1728986511960@@127.0.0.1@5432@db_wedding
CREATE DATABASE db_wedding;

-- Enable extension for UUID generation
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT,
  email TEXT UNIQUE NOT NULL,
  phone_number TEXT UNIQUE NOT NULL,
  image TEXT,
  password TEXT,
  role TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE decorations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT,
  description TEXT,
  base_price INT,
  category TEXT,
  image TEXT, 
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE additional_services (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT,
  price INT,
  unit TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE bookings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id),
  decoration_id UUID REFERENCES decorations(id),
  date DATE,
  status TEXT, -- 'pending', 'dp_paid', 'fully_paid', 'cancelled'
  dp_amount INT,
  full_amount INT,
  invoice_url TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE booking_additional_services (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  booking_id UUID REFERENCES bookings(id),
  additional_service_id UUID REFERENCES additional_services(id),
  quantity INT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE payments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  booking_id UUID REFERENCES bookings(id),
  type TEXT, -- 'dp' or 'pelunasan'
  amount INT,
  snap_token TEXT,
  payment_status TEXT, -- 'pending', 'paid', 'failed'
  midtrans_transaction_id TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE gallery_decorations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT,
  image TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE project_decorations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT, -- contoh: "Dinda & Rafi"
  description TEXT,
  decoration_id UUID REFERENCES decorations(id),
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE project_images (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID REFERENCES project_decorations(id),
  image_url TEXT,
  order_index INT,
  created_at TIMESTAMP DEFAULT NOW()
);


SELECT * FROM users;

DROP TABLE users;


-- DROP ALL TABLE IN DATABASE
-- DO $$
-- DECLARE
--   r RECORD;
-- BEGIN
--   FOR r IN (SELECT tablename FROM pg_tables WHERE schemaname = 'public') LOOP
--     EXECUTE 'DROP TABLE IF EXISTS public.' || quote_ident(r.tablename) || ' CASCADE';
--   END LOOP;
-- END $$;

ALTER TABLE payments ADD COLUMN order_id TEXT;
