/*
  Warnings:

  - You are about to drop the `OrderItemSize` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ProductSize` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "OrderItemSize" DROP CONSTRAINT "OrderItemSize_productOrderId_fkey";

-- DropForeignKey
ALTER TABLE "OrderItemSize" DROP CONSTRAINT "OrderItemSize_sizeId_fkey";

-- DropForeignKey
ALTER TABLE "ProductSize" DROP CONSTRAINT "ProductSize_productId_fkey";

-- DropForeignKey
ALTER TABLE "ProductSize" DROP CONSTRAINT "ProductSize_sizeId_fkey";

-- AlterTable
ALTER TABLE "OrderItem" ADD COLUMN     "sizes" TEXT[];

-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "sizes" TEXT[];

-- DropTable
DROP TABLE "OrderItemSize";

-- DropTable
DROP TABLE "ProductSize";
