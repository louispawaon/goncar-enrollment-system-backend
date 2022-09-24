/*
  Warnings:

  - You are about to drop the column `trainingYearSpan` on the `Registrations` table. All the data in the column will be lost.
  - The primary key for the `tuitionview` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `CourseId` on the `tuitionview` table. All the data in the column will be lost.
  - Added the required column `trainingYearId` to the `Registrations` table without a default value. This is not possible if the table is not empty.
  - Added the required column `courseId` to the `tuitionview` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Registrations" DROP COLUMN "trainingYearSpan",
ADD COLUMN     "trainingYearId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "payableNames" ADD COLUMN     "payableID" SERIAL NOT NULL,
ADD CONSTRAINT "payableNames_pkey" PRIMARY KEY ("payableID");

-- AlterTable
ALTER TABLE "payables" ADD CONSTRAINT "payables_pkey" PRIMARY KEY ("payableId");

-- AlterTable
CREATE SEQUENCE "trainingyears_trainingyearid_seq";
ALTER TABLE "trainingYears" ALTER COLUMN "trainingYearId" SET DEFAULT nextval('trainingyears_trainingyearid_seq');
ALTER SEQUENCE "trainingyears_trainingyearid_seq" OWNED BY "trainingYears"."trainingYearId";

-- AlterTable
ALTER TABLE "transactions" ADD CONSTRAINT "transactions_pkey" PRIMARY KEY ("transactionId");

-- AlterTable
ALTER TABLE "tuitionview" DROP CONSTRAINT "tuitionview_pkey",
DROP COLUMN "CourseId",
ADD COLUMN     "courseId" INTEGER NOT NULL,
ADD COLUMN     "tuitionViewId" SERIAL NOT NULL,
ADD CONSTRAINT "tuitionview_pkey" PRIMARY KEY ("tuitionViewId");

-- AddForeignKey
ALTER TABLE "Registrations" ADD CONSTRAINT "Registrations_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "courses"("courseId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Registrations" ADD CONSTRAINT "Registrations_trainingYearId_fkey" FOREIGN KEY ("trainingYearId") REFERENCES "trainingYears"("trainingYearId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "batch" ADD CONSTRAINT "batch_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "courses"("courseId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "batch" ADD CONSTRAINT "batch_trainingYearId_fkey" FOREIGN KEY ("trainingYearId") REFERENCES "trainingYears"("trainingYearId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "batch" ADD CONSTRAINT "batch_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "employees"("employeeId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tuitionview" ADD CONSTRAINT "tuitionview_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "courses"("courseId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tuitionview" ADD CONSTRAINT "tuitionview_trainingYearId_fkey" FOREIGN KEY ("trainingYearId") REFERENCES "trainingYears"("trainingYearId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "payables" ADD CONSTRAINT "payables_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "courses"("courseId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "payables" ADD CONSTRAINT "payables_trainingYearId_fkey" FOREIGN KEY ("trainingYearId") REFERENCES "trainingYears"("trainingYearId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "payableNames" ADD CONSTRAINT "payableNames_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "courses"("courseId") ON DELETE RESTRICT ON UPDATE CASCADE;
