-- DropForeignKey
ALTER TABLE "Registrations" DROP CONSTRAINT "Registrations_batchId_fkey";

-- DropForeignKey
ALTER TABLE "Registrations" DROP CONSTRAINT "Registrations_courseId_fkey";

-- DropForeignKey
ALTER TABLE "Registrations" DROP CONSTRAINT "Registrations_traineeId_fkey";

-- DropForeignKey
ALTER TABLE "Registrations" DROP CONSTRAINT "Registrations_trainingYearId_fkey";

-- DropForeignKey
ALTER TABLE "batch" DROP CONSTRAINT "batch_courseId_fkey";

-- DropForeignKey
ALTER TABLE "batch" DROP CONSTRAINT "batch_employeeId_fkey";

-- DropForeignKey
ALTER TABLE "batch" DROP CONSTRAINT "batch_trainingYearId_fkey";

-- DropForeignKey
ALTER TABLE "payableNames" DROP CONSTRAINT "payableNames_courseId_fkey";

-- DropForeignKey
ALTER TABLE "payables" DROP CONSTRAINT "payables_courseId_fkey";

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

-- AlterTable
ALTER TABLE "Registrations" ALTER COLUMN "traineeId" DROP NOT NULL,
ALTER COLUMN "courseId" DROP NOT NULL,
ALTER COLUMN "batchId" DROP NOT NULL,
ALTER COLUMN "trainingYearId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "batch" ALTER COLUMN "trainingYearId" DROP NOT NULL,
ALTER COLUMN "courseId" DROP NOT NULL,
ALTER COLUMN "employeeId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "payableNames" ALTER COLUMN "courseId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "payables" ALTER COLUMN "trainingYearId" DROP NOT NULL,
ALTER COLUMN "courseId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "transactions" ALTER COLUMN "registraionNumber" DROP NOT NULL,
ALTER COLUMN "payableId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "tuitionview" ALTER COLUMN "trainingYearId" DROP NOT NULL,
ALTER COLUMN "courseId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Registrations" ADD CONSTRAINT "Registrations_traineeId_fkey" FOREIGN KEY ("traineeId") REFERENCES "Trainees"("traineeId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Registrations" ADD CONSTRAINT "Registrations_batchId_fkey" FOREIGN KEY ("batchId") REFERENCES "batch"("batchId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Registrations" ADD CONSTRAINT "Registrations_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "courses"("courseId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Registrations" ADD CONSTRAINT "Registrations_trainingYearId_fkey" FOREIGN KEY ("trainingYearId") REFERENCES "trainingYears"("trainingYearId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "batch" ADD CONSTRAINT "batch_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "courses"("courseId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "batch" ADD CONSTRAINT "batch_trainingYearId_fkey" FOREIGN KEY ("trainingYearId") REFERENCES "trainingYears"("trainingYearId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "batch" ADD CONSTRAINT "batch_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "employees"("employeeId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tuitionview" ADD CONSTRAINT "tuitionview_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "courses"("courseId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tuitionview" ADD CONSTRAINT "tuitionview_trainingYearId_fkey" FOREIGN KEY ("trainingYearId") REFERENCES "trainingYears"("trainingYearId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "transactions" ADD CONSTRAINT "transactions_registraionNumber_fkey" FOREIGN KEY ("registraionNumber") REFERENCES "Registrations"("registrationNumber") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "transactions" ADD CONSTRAINT "transactions_payableId_fkey" FOREIGN KEY ("payableId") REFERENCES "payables"("payableId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "payables" ADD CONSTRAINT "payables_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "courses"("courseId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "payables" ADD CONSTRAINT "payables_trainingYearId_fkey" FOREIGN KEY ("trainingYearId") REFERENCES "trainingYears"("trainingYearId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "payableNames" ADD CONSTRAINT "payableNames_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "courses"("courseId") ON DELETE SET NULL ON UPDATE CASCADE;
