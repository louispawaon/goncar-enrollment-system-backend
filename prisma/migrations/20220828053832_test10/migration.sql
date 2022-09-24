-- AlterTable
ALTER TABLE "Registrations" ADD COLUMN     "courseId" INTEGER;

-- AddForeignKey
ALTER TABLE "Registrations" ADD CONSTRAINT "Registrations_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "courses"("courseId") ON DELETE SET NULL ON UPDATE CASCADE;
