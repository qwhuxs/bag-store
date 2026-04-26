/*
  Warnings:

  - You are about to drop the column `email` on the `Order` table. All the data in the column will be lost.
  - Added the required column `branch` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `deliveryType` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Order" DROP COLUMN "email",
ADD COLUMN     "branch" TEXT NOT NULL,
ADD COLUMN     "deliveryType" TEXT NOT NULL;
