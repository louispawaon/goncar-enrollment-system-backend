/*
  Warnings:

  - You are about to drop the column `courseId` on the `Registrations` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Registrations" DROP CONSTRAINT "Registrations_courseId_fkey";

-- AlterTable
ALTER TABLE "Registrations" DROP COLUMN "courseId";
