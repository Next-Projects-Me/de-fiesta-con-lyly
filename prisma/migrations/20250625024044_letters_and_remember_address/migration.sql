/*
  Warnings:

  - Added the required column `letters` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "letters" BOOLEAN NOT NULL;

-- AlterTable
ALTER TABLE "UserAddress" ADD COLUMN     "rememberAddress" BOOLEAN NOT NULL DEFAULT true;
