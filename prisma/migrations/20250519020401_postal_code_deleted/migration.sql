/*
  Warnings:

  - You are about to drop the column `postalCode` on the `OrderAddress` table. All the data in the column will be lost.
  - You are about to drop the column `postalCode` on the `UserAddress` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "OrderAddress" DROP COLUMN "postalCode";

-- AlterTable
ALTER TABLE "UserAddress" DROP COLUMN "postalCode";
