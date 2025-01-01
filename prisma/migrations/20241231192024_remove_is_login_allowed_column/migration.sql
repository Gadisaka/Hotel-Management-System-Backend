/*
  Warnings:

  - You are about to drop the column `isLoginAllowed` on the `Employee` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Customer" ALTER COLUMN "disabilities" SET DEFAULT 'NONE';

-- AlterTable
ALTER TABLE "Employee" DROP COLUMN "isLoginAllowed";
