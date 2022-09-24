/*
  Warnings:

  - You are about to drop the column `trainingYearId` on the `batch` table. All the data in the column will be lost.
  - You are about to drop the `roles` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[batchName]` on the table `batch` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "batch" DROP CONSTRAINT "batch_trainingYearId_fkey";

-- AlterTable
ALTER TABLE "Registrations" ADD COLUMN     "SGLicenseCopy" TEXT,
ADD COLUMN     "SSSNumCopy" TEXT,
ADD COLUMN     "TINNumCopy" TEXT,
ADD COLUMN     "expiryDateCopy" DATE;

-- AlterTable
ALTER TABLE "Trainees" ALTER COLUMN "middleName" DROP NOT NULL;

-- AlterTable
ALTER TABLE "batch" DROP COLUMN "trainingYearId";

-- AlterTable
ALTER TABLE "courses" ADD COLUMN     "trainingYearsId" INTEGER;

-- DropTable
DROP TABLE "roles";

-- DropEnum
DROP TYPE "Role";

-- CreateIndex
CREATE UNIQUE INDEX "batch_batchName_key" ON "batch"("batchName");

-- AddForeignKey
ALTER TABLE "courses" ADD CONSTRAINT "courses_trainingYearsId_fkey" FOREIGN KEY ("trainingYearsId") REFERENCES "trainingYears"("trainingYearId") ON DELETE SET NULL ON UPDATE CASCADE;
