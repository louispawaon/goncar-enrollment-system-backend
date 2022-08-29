/*
  Warnings:

  - You are about to drop the column `trainingYearId` on the `Registrations` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Registrations" DROP CONSTRAINT "Registrations_trainingYearId_fkey";

-- AlterTable
ALTER TABLE "Registrations" DROP COLUMN "trainingYearId";
