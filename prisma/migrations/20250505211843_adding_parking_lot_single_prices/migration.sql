/*
  Warnings:

  - A unique constraint covering the columns `[parkingId]` on the table `diarist_prices` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[parkingId]` on the table `hourly_prices` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[parkingId]` on the table `monthly_prices` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "diarist_prices_parkingId_key" ON "diarist_prices"("parkingId");

-- CreateIndex
CREATE UNIQUE INDEX "hourly_prices_parkingId_key" ON "hourly_prices"("parkingId");

-- CreateIndex
CREATE UNIQUE INDEX "monthly_prices_parkingId_key" ON "monthly_prices"("parkingId");
