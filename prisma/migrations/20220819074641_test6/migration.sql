/*
  Warnings:

  - You are about to drop the `Registrations_Batch` table. If the table is not empty, all the data it contains will be lost.
  - Changed the type of `dateEnrolled` on the `Registrations` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `birthDay` on the `Trainees` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `expiryDate` on the `Trainees` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Registrations" DROP COLUMN "dateEnrolled",
ADD COLUMN     "dateEnrolled" DATE NOT NULL;

-- AlterTable
ALTER TABLE "Trainees" DROP COLUMN "birthDay",
ADD COLUMN     "birthDay" DATE NOT NULL,
DROP COLUMN "expiryDate",
ADD COLUMN     "expiryDate" DATE NOT NULL;

-- AlterTable
ALTER TABLE "batch" ALTER COLUMN "startDate" SET DATA TYPE DATE,
ALTER COLUMN "endDate" SET DATA TYPE DATE;

-- AlterTable
ALTER TABLE "employees" ALTER COLUMN "birthDay" SET DATA TYPE DATE;

-- DropTable
DROP TABLE "Registrations_Batch";
