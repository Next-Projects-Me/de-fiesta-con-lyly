/*
  Warnings:

  - You are about to drop the column `rol` on the `Role` table. All the data in the column will be lost.
  - Added the required column `role` to the `Role` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Role" DROP COLUMN "rol",
ADD COLUMN     "role" TEXT NOT NULL;
