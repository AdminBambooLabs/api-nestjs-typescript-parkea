-- CreateEnum
CREATE TYPE "VehicleType" AS ENUM ('car', 'motorcycle', 'transport');

-- CreateEnum
CREATE TYPE "TicketStatus" AS ENUM ('open', 'canceled', 'closed', 'paid');

-- CreateEnum
CREATE TYPE "PaymentType" AS ENUM ('pix', 'cash', 'card');

-- CreateEnum
CREATE TYPE "PriceTable" AS ENUM ('hourly', 'diarist', 'monthly');

-- CreateTable
CREATE TABLE "tickets" (
    "id" TEXT NOT NULL,
    "plate" TEXT NOT NULL,
    "vehicleType" "VehicleType" NOT NULL DEFAULT 'car',
    "status" "TicketStatus" NOT NULL DEFAULT 'open',
    "paymentType" "PaymentType",
    "priceTable" "PriceTable" NOT NULL,
    "checkin" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "checkout" TIMESTAMP(3),
    "discount" DOUBLE PRECISION,
    "total" DOUBLE PRECISION,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "tickets_pkey" PRIMARY KEY ("id")
);
