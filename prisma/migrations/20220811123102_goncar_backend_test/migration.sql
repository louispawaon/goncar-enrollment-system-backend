-- CreateEnum
CREATE TYPE "Role" AS ENUM ('BASIC', 'ADMIN', 'EDITOR');

-- CreateTable
CREATE TABLE "Trainees" (
    "traineeId" SERIAL NOT NULL,
    "firstName" TEXT NOT NULL,
    "middleName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "birthDay" TIMESTAMP(3) NOT NULL,
    "sex" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "emailAdd" TEXT NOT NULL,
    "cpNum" TEXT NOT NULL,
    "educationalAttainment" TEXT NOT NULL,
    "yearGrad" TIMESTAMP(3) NOT NULL,
    "SSSNum" TEXT NOT NULL,
    "TINNum" TEXT NOT NULL,
    "SGLicense" TEXT NOT NULL,
    "expiryDate" TEXT NOT NULL,

    CONSTRAINT "Trainees_pkey" PRIMARY KEY ("traineeId")
);

-- CreateTable
CREATE TABLE "Registrations" (
    "registrationNumber" SERIAL NOT NULL,
    "traineeId" INTEGER NOT NULL,
    "courseId" INTEGER NOT NULL,
    "batchId" INTEGER NOT NULL,
    "trainingYearSpan" INTEGER NOT NULL,
    "dateEnrolled" TIMESTAMP(3) NOT NULL,
    "registrationStatus" TEXT NOT NULL,

    CONSTRAINT "Registrations_pkey" PRIMARY KEY ("traineeId")
);

-- CreateTable
CREATE TABLE "Registrations_Batch" (
    "registrationNumber" INTEGER NOT NULL,
    "batchId" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "batch" (
    "batchId" SERIAL NOT NULL,
    "trainingYearId" INTEGER NOT NULL,
    "courseId" INTEGER NOT NULL,
    "employeeId" INTEGER NOT NULL,
    "laNumber" TEXT NOT NULL,
    "batchName" TEXT NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,
    "maxStudents" INTEGER NOT NULL,

    CONSTRAINT "batch_pkey" PRIMARY KEY ("batchId")
);

-- CreateTable
CREATE TABLE "tuitionview" (
    "trainingYearId" INTEGER NOT NULL,
    "CourseId" INTEGER NOT NULL,
    "tuition" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "tuitionview_pkey" PRIMARY KEY ("trainingYearId")
);

-- CreateTable
CREATE TABLE "trainingYears" (
    "trainingYearId" INTEGER NOT NULL,
    "trainingYearSpan" TEXT NOT NULL,

    CONSTRAINT "trainingYears_pkey" PRIMARY KEY ("trainingYearId")
);

-- CreateTable
CREATE TABLE "courses" (
    "courseId" INTEGER NOT NULL,
    "courseName" TEXT NOT NULL,
    "courseDescription" TEXT NOT NULL,
    "requiredHours" DOUBLE PRECISION NOT NULL,
    "units" DOUBLE PRECISION NOT NULL
);

-- CreateTable
CREATE TABLE "transactions" (
    "transactionId" INTEGER NOT NULL,
    "registraionNumber" INTEGER NOT NULL,
    "payableId" INTEGER NOT NULL,
    "payableCost" DOUBLE PRECISION NOT NULL,
    "paymentMethod" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "payables" (
    "payableId" INTEGER NOT NULL,
    "trainingYearId" INTEGER NOT NULL,
    "courseId" INTEGER NOT NULL,
    "payableName" TEXT NOT NULL,
    "payableCost" DOUBLE PRECISION NOT NULL
);

-- CreateTable
CREATE TABLE "payableNames" (
    "payableName" TEXT NOT NULL,
    "courseId" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "employees" (
    "employeeId" SERIAL NOT NULL,
    "roleId" INTEGER NOT NULL,
    "firstName" TEXT NOT NULL,
    "middleName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "birthDay" TIMESTAMP(3) NOT NULL,
    "sex" TEXT NOT NULL,
    "emailAdd" TEXT NOT NULL,
    "cpNum" TEXT NOT NULL,
    "employeeStatus" TEXT NOT NULL,
    "dateHired" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "employees_pkey" PRIMARY KEY ("employeeId")
);

-- CreateTable
CREATE TABLE "roles" (
    "roleId" SERIAL NOT NULL,
    "roleName" TEXT NOT NULL,

    CONSTRAINT "roles_pkey" PRIMARY KEY ("roleId")
);

-- CreateIndex
CREATE UNIQUE INDEX "Trainees_emailAdd_key" ON "Trainees"("emailAdd");

-- CreateIndex
CREATE UNIQUE INDEX "Registrations_registrationNumber_key" ON "Registrations"("registrationNumber");

-- CreateIndex
CREATE UNIQUE INDEX "Registrations_Batch_batchId_key" ON "Registrations_Batch"("batchId");

-- CreateIndex
CREATE UNIQUE INDEX "courses_courseId_key" ON "courses"("courseId");

-- CreateIndex
CREATE UNIQUE INDEX "transactions_payableId_key" ON "transactions"("payableId");

-- CreateIndex
CREATE UNIQUE INDEX "payables_payableId_key" ON "payables"("payableId");

-- CreateIndex
CREATE UNIQUE INDEX "payableNames_payableName_key" ON "payableNames"("payableName");
