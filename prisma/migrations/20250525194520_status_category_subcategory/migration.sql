-- AlterTable
ALTER TABLE "Category" ADD COLUMN     "isActive" BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE "Subcategory" ADD COLUMN     "isActive" BOOLEAN NOT NULL DEFAULT true;
