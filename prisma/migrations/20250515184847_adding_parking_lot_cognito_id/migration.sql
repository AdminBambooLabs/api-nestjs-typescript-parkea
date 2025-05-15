/*
  Warnings:

  - You are about to drop the column `value` on the `monthly_prices` table. All the data in the column will be lost.
  - Added the required column `price` to the `monthly_prices` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cognitoId` to the `parkings` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "monthly_prices" DROP COLUMN "value",
ADD COLUMN     "price" DOUBLE PRECISION NOT NULL;

-- AlterTable
ALTER TABLE "parkings" ADD COLUMN     "cognitoId" TEXT NOT NULL;
