/*
  Warnings:

  - You are about to drop the column `trainingYearId` on the `payables` table. All the data in the column will be lost.
  - You are about to alter the column `payableCost` on the `payables` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Decimal(65,30)`.
  - You are about to drop the column `payableCost` on the `transactions` table. All the data in the column will be lost.
  - You are about to drop the column `payableId` on the `transactions` table. All the data in the column will be lost.
  - You are about to drop the column `registraionNumber` on the `transactions` table. All the data in the column will be lost.
  - You are about to drop the `payableNames` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `tuitionview` table. If the table is not empty, all the data it contains will be lost.
  - Made the column `employeeId` on table `batch` required. This step will fail if there are existing NULL values in that column.
  - Made the column `trainingYearsId` on table `courses` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `address` to the `employees` table without a default value. This is not possible if the table is not empty.
  - Added the required column `maritalStatus` to the `employees` table without a default value. This is not possible if the table is not empty.
  - Added the required column `payableName` to the `payables` table without a default value. This is not possible if the table is not empty.
  - Added the required column `paymentAmount` to the `transactions` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "batch" DROP CONSTRAINT "batch_employeeId_fkey";

-- DropForeignKey
ALTER TABLE "courses" DROP CONSTRAINT "courses_trainingYearsId_fkey";

-- DropForeignKey
ALTER TABLE "payableNames" DROP CONSTRAINT "payableNames_courseId_fkey";

-- DropForeignKey
ALTER TABLE "payables" DROP CONSTRAINT "payables_trainingYearId_fkey";

-- DropForeignKey
ALTER TABLE "transactions" DROP CONSTRAINT "transactions_payableId_fkey";

-- DropForeignKey
ALTER TABLE "transactions" DROP CONSTRAINT "transactions_registraionNumber_fkey";

-- DropForeignKey
ALTER TABLE "tuitionview" DROP CONSTRAINT "tuitionview_courseId_fkey";

-- DropForeignKey
ALTER TABLE "tuitionview" DROP CONSTRAINT "tuitionview_trainingYearId_fkey";

-- DropIndex
DROP INDEX "Trainees_emailAdd_key";

-- DropIndex
DROP INDEX "payables_payableId_key";

-- DropIndex
DROP INDEX "transactions_payableId_key";

-- AlterTable
ALTER TABLE "Trainees" ADD COLUMN     "hasActiveRegistration" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "batch" ADD COLUMN     "batchStatus" TEXT NOT NULL DEFAULT 'Active',
ALTER COLUMN "employeeId" SET NOT NULL;

-- AlterTable
ALTER TABLE "courses" ADD COLUMN     "courseStatus" TEXT NOT NULL DEFAULT 'Active',
ALTER COLUMN "trainingYearsId" SET NOT NULL;

-- AlterTable
ALTER TABLE "employees" ADD COLUMN     "address" TEXT NOT NULL,
ADD COLUMN     "hasActiveBatch" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "maritalStatus" TEXT NOT NULL,
ALTER COLUMN "middleName" DROP NOT NULL;

-- AlterTable
CREATE SEQUENCE "payables_payableid_seq";
ALTER TABLE "payables" DROP COLUMN "trainingYearId",
ADD COLUMN     "payableName" TEXT NOT NULL,
ALTER COLUMN "payableId" SET DEFAULT nextval('payables_payableid_seq'),
ALTER COLUMN "payableCost" SET DATA TYPE DECIMAL(65,30);
ALTER SEQUENCE "payables_payableid_seq" OWNED BY "payables"."payableId";

-- AlterTable
ALTER TABLE "trainingYears" ADD COLUMN     "trainingYearStatus" TEXT NOT NULL DEFAULT 'Active';

-- AlterTable
CREATE SEQUENCE "transactions_transactionid_seq";
ALTER TABLE "transactions" DROP COLUMN "payableCost",
DROP COLUMN "payableId",
DROP COLUMN "registraionNumber",
ADD COLUMN     "employeeId" INTEGER,
ADD COLUMN     "paymentAmount" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "registrationNumber" INTEGER,
ADD COLUMN     "traineeId" INTEGER,
ADD COLUMN     "transactionDate" DATE,
ALTER COLUMN "transactionId" SET DEFAULT nextval('transactions_transactionid_seq');
ALTER SEQUENCE "transactions_transactionid_seq" OWNED BY "transactions"."transactionId";

-- DropTable
DROP TABLE "payableNames";

-- DropTable
DROP TABLE "tuitionview";

-- CreateTable
CREATE TABLE "roles" (
    "roleId" SERIAL NOT NULL,
    "roleName" TEXT NOT NULL,

    CONSTRAINT "roles_pkey" PRIMARY KEY ("roleId")
);

-- CreateIndex
CREATE UNIQUE INDEX "roles_roleName_key" ON "roles"("roleName");

-- AddForeignKey
ALTER TABLE "batch" ADD CONSTRAINT "batch_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "employees"("employeeId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "courses" ADD CONSTRAINT "courses_trainingYearsId_fkey" FOREIGN KEY ("trainingYearsId") REFERENCES "trainingYears"("trainingYearId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "transactions" ADD CONSTRAINT "transactions_traineeId_fkey" FOREIGN KEY ("traineeId") REFERENCES "Trainees"("traineeId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "transactions" ADD CONSTRAINT "transactions_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "employees"("employeeId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "transactions" ADD CONSTRAINT "transactions_registrationNumber_fkey" FOREIGN KEY ("registrationNumber") REFERENCES "Registrations"("registrationNumber") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "employees" ADD CONSTRAINT "employees_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "roles"("roleId") ON DELETE RESTRICT ON UPDATE CASCADE;
