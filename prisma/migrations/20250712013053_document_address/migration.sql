/*
  Warnings:

  - You are about to drop the column `rememberAddress` on the `UserAddress` table. All the data in the column will be lost.
  - Added the required column `document` to the `OrderAddress` table without a default value. This is not possible if the table is not empty.
  - Added the required column `document` to the `UserAddress` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "OrderAddress" ADD COLUMN     "document" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "UserAddress" DROP COLUMN "rememberAddress",
ADD COLUMN     "document" TEXT NOT NULL;
