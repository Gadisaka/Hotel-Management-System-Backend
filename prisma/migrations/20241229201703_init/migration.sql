/*
  Warnings:

  - You are about to drop the column `disabilities` on the `Employee` table. All the data in the column will be lost.
  - Added the required column `disabilities` to the `Customer` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Customer" ADD COLUMN     "disabilities" "Disability" NOT NULL;

-- AlterTable
ALTER TABLE "Employee" DROP COLUMN "disabilities";
