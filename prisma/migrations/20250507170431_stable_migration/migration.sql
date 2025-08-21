/*
  Warnings:

  - The primary key for the `ProductImage` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `imageId` on the `ProductImage` table. All the data in the column will be lost.
  - The `id` column on the `ProductImage` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the `Image` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `OrderItemColor` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `OrderItemGender` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ProductColor` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ProductGender` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ProductTag` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Tag` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `url` to the `ProductImage` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "OrderItemColor" DROP CONSTRAINT "OrderItemColor_colorId_fkey";

-- DropForeignKey
ALTER TABLE "OrderItemColor" DROP CONSTRAINT "OrderItemColor_productOrderId_fkey";

-- DropForeignKey
ALTER TABLE "OrderItemGender" DROP CONSTRAINT "OrderItemGender_genderId_fkey";

-- DropForeignKey
ALTER TABLE "OrderItemGender" DROP CONSTRAINT "OrderItemGender_productOrderId_fkey";

-- DropForeignKey
ALTER TABLE "ProductColor" DROP CONSTRAINT "ProductColor_colorId_fkey";

-- DropForeignKey
ALTER TABLE "ProductColor" DROP CONSTRAINT "ProductColor_productId_fkey";

-- DropForeignKey
ALTER TABLE "ProductGender" DROP CONSTRAINT "ProductGender_genderId_fkey";

-- DropForeignKey
ALTER TABLE "ProductGender" DROP CONSTRAINT "ProductGender_productId_fkey";

-- DropForeignKey
ALTER TABLE "ProductImage" DROP CONSTRAINT "ProductImage_imageId_fkey";

-- DropForeignKey
ALTER TABLE "ProductTag" DROP CONSTRAINT "ProductTag_productId_fkey";

-- DropForeignKey
ALTER TABLE "ProductTag" DROP CONSTRAINT "ProductTag_tagId_fkey";

-- AlterTable
ALTER TABLE "OrderItem" ADD COLUMN     "colors" TEXT[],
ADD COLUMN     "genders" TEXT[];

-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "colors" TEXT[],
ADD COLUMN     "genders" TEXT[],
ADD COLUMN     "tags" TEXT[];

-- AlterTable
ALTER TABLE "ProductImage" DROP CONSTRAINT "ProductImage_pkey",
DROP COLUMN "imageId",
ADD COLUMN     "url" TEXT NOT NULL,
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "ProductImage_pkey" PRIMARY KEY ("id");

-- DropTable
DROP TABLE "Image";

-- DropTable
DROP TABLE "OrderItemColor";

-- DropTable
DROP TABLE "OrderItemGender";

-- DropTable
DROP TABLE "ProductColor";

-- DropTable
DROP TABLE "ProductGender";

-- DropTable
DROP TABLE "ProductTag";

-- DropTable
DROP TABLE "Tag";
