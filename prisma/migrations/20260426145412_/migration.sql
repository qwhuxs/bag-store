-- AlterTable
ALTER TABLE "Order" ALTER COLUMN "orderNumber" DROP NOT NULL,
ALTER COLUMN "orderNumber" DROP DEFAULT;
DROP SEQUENCE "Order_orderNumber_seq";
