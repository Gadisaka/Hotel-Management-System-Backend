-- AlterTable
ALTER TABLE "Customer" ALTER COLUMN "status" DROP NOT NULL,
ALTER COLUMN "status" SET DEFAULT 'INACTIVE';
