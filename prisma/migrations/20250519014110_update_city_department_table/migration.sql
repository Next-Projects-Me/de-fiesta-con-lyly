/*
  Warnings:

  - You are about to drop the column `city` on the `City` table. All the data in the column will be lost.
  - You are about to drop the column `department` on the `Department` table. All the data in the column will be lost.
  - Added the required column `name` to the `City` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Department` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "City" DROP COLUMN "city",
ADD COLUMN     "name" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Department" DROP COLUMN "department",
ADD COLUMN     "name" TEXT NOT NULL;
