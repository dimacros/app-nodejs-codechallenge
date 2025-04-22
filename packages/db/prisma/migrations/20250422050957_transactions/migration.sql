-- CreateEnum
CREATE TYPE "TransactionTypeEnum" AS ENUM ('TRANSFER', 'PAYMENT', 'CHARGEBACK');

-- CreateEnum
CREATE TYPE "TransactionStatusEnum" AS ENUM ('PENDING', 'COMPLETED', 'FAILED');

-- CreateTable
CREATE TABLE "Transaction" (
    "transactionExternalId" TEXT NOT NULL,
    "accountExternalIdDebit" TEXT NOT NULL,
    "accountExternalIdCredit" TEXT NOT NULL,
    "value" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "transactionTypeId" INTEGER NOT NULL,
    "transactionStatusId" INTEGER NOT NULL,

    CONSTRAINT "Transaction_pkey" PRIMARY KEY ("transactionExternalId")
);

-- CreateTable
CREATE TABLE "TransactionType" (
    "id" SERIAL NOT NULL,
    "name" "TransactionTypeEnum" NOT NULL,

    CONSTRAINT "TransactionType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TransactionStatus" (
    "id" SERIAL NOT NULL,
    "name" "TransactionStatusEnum" NOT NULL,

    CONSTRAINT "TransactionStatus_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "TransactionType_name_key" ON "TransactionType"("name");

-- CreateIndex
CREATE UNIQUE INDEX "TransactionStatus_name_key" ON "TransactionStatus"("name");

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_transactionTypeId_fkey" FOREIGN KEY ("transactionTypeId") REFERENCES "TransactionType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_transactionStatusId_fkey" FOREIGN KEY ("transactionStatusId") REFERENCES "TransactionStatus"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
