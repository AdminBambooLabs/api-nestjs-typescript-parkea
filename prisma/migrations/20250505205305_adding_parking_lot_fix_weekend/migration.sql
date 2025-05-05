/*
  Warnings:

  - You are about to drop the column `weekebdClose` on the `parkings` table. All the data in the column will be lost.
  - Added the required column `weekendClose` to the `parkings` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "parkings" DROP COLUMN "weekebdClose",
ADD COLUMN     "weekendClose" TEXT NOT NULL;
