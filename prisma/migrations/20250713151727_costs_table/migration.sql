-- CreateTable
CREATE TABLE "Costs" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Costs_pkey" PRIMARY KEY ("id")
);
