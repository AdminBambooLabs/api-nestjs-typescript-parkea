/*
  # Create tickets table

  1. New Tables
    - `tickets`
      - `id` (uuid, primary key)
      - `plate` (text, not null)
      - `vehicleType` (enum, not null)
      - `status` (enum, not null)
      - `paymentType` (enum, nullable)
      - `priceTable` (enum, not null)
      - `checkin` (timestamp, not null)
      - `checkout` (timestamp, nullable)
      - `discount` (float, nullable)
      - `total` (float, nullable)
      - `createdAt` (timestamp, not null)
      - `updatedAt` (timestamp, not null)
  
  2. Enums
    - `VehicleType`: car, motorcycle, transport
    - `TicketStatus`: open, canceled, closed, paid
    - `PaymentType`: pix, cash, card
    - `PriceTable`: hourly, diarist, monthly
  
  3. Security
    - Enable RLS on `tickets` table
    - Add policy for authenticated users to read all tickets
    - Add policy for authenticated users to insert tickets
    - Add policy for authenticated users to update tickets
    - Add policy for authenticated users to delete tickets
*/

-- Create enums
CREATE TYPE "VehicleType" AS ENUM ('car', 'motorcycle', 'transport');
CREATE TYPE "TicketStatus" AS ENUM ('open', 'canceled', 'closed', 'paid');
CREATE TYPE "PaymentType" AS ENUM ('pix', 'cash', 'card');
CREATE TYPE "PriceTable" AS ENUM ('hourly', 'diarist', 'monthly');

-- Create tickets table
CREATE TABLE IF NOT EXISTS "tickets" (
  "id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  "plate" TEXT NOT NULL,
  "vehicleType" "VehicleType" NOT NULL DEFAULT 'car',
  "status" "TicketStatus" NOT NULL DEFAULT 'open',
  "paymentType" "PaymentType",
  "priceTable" "PriceTable" NOT NULL,
  "checkin" TIMESTAMPTZ NOT NULL DEFAULT now(),
  "checkout" TIMESTAMPTZ,
  "discount" FLOAT,
  "total" FLOAT,
  "createdAt" TIMESTAMPTZ NOT NULL DEFAULT now(),
  "updatedAt" TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create index on plate for faster lookups
CREATE INDEX IF NOT EXISTS "tickets_plate_idx" ON "tickets" ("plate");

-- Create index on status for filtering
CREATE INDEX IF NOT EXISTS "tickets_status_idx" ON "tickets" ("status");

-- Enable Row Level Security
ALTER TABLE "tickets" ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Allow authenticated users to read all tickets"
  ON "tickets"
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Allow authenticated users to insert tickets"
  ON "tickets"
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Allow authenticated users to update tickets"
  ON "tickets"
  FOR UPDATE
  TO authenticated
  USING (true);

CREATE POLICY "Allow authenticated users to delete tickets"
  ON "tickets"
  FOR DELETE
  TO authenticated
  USING (true);

-- Create trigger to automatically update the updatedAt timestamp
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW."updatedAt" = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_tickets_updated_at
BEFORE UPDATE ON "tickets"
FOR EACH ROW
EXECUTE FUNCTION update_updated_at();