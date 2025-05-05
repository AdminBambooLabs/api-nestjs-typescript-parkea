-- CreateTable
CREATE TABLE "parkings" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "document" TEXT NOT NULL,
    "contact" TEXT NOT NULL,
    "street" TEXT NOT NULL,
    "streetNumber" INTEGER NOT NULL,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "zipCode" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "weekdayOpen" TEXT NOT NULL,
    "weekdayClose" TEXT NOT NULL,
    "weekendOpen" TEXT NOT NULL,
    "weekebdClose" TEXT NOT NULL,

    CONSTRAINT "parkings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "hourly_prices" (
    "id" TEXT NOT NULL,
    "parkingId" TEXT NOT NULL,
    "pricePer15" DOUBLE PRECISION NOT NULL,
    "pricePer30" DOUBLE PRECISION NOT NULL,
    "pricePer60" DOUBLE PRECISION NOT NULL,
    "pricePerAdditional" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "hourly_prices_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "diarist_prices" (
    "id" TEXT NOT NULL,
    "parkingId" TEXT NOT NULL,
    "pricePerHalfDay" DOUBLE PRECISION NOT NULL,
    "pricePerFullDay" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "diarist_prices_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "monthly_prices" (
    "id" TEXT NOT NULL,
    "parkingId" TEXT NOT NULL,
    "value" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "monthly_prices_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "hourly_prices" ADD CONSTRAINT "hourly_prices_parkingId_fkey" FOREIGN KEY ("parkingId") REFERENCES "parkings"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "diarist_prices" ADD CONSTRAINT "diarist_prices_parkingId_fkey" FOREIGN KEY ("parkingId") REFERENCES "parkings"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "monthly_prices" ADD CONSTRAINT "monthly_prices_parkingId_fkey" FOREIGN KEY ("parkingId") REFERENCES "parkings"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
