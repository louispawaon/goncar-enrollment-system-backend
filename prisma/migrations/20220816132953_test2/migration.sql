/*
  Warnings:

  - The primary key for the `Registrations` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "Registrations" DROP CONSTRAINT "Registrations_pkey";

-- AddForeignKey
ALTER TABLE "Registrations" ADD CONSTRAINT "Registrations_traineeId_fkey" FOREIGN KEY ("traineeId") REFERENCES "Trainees"("traineeId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Registrations" ADD CONSTRAINT "Registrations_batchId_fkey" FOREIGN KEY ("batchId") REFERENCES "batch"("batchId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "transactions" ADD CONSTRAINT "transactions_registraionNumber_fkey" FOREIGN KEY ("registraionNumber") REFERENCES "Registrations"("registrationNumber") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "transactions" ADD CONSTRAINT "transactions_payableId_fkey" FOREIGN KEY ("payableId") REFERENCES "payables"("payableId") ON DELETE RESTRICT ON UPDATE CASCADE;
