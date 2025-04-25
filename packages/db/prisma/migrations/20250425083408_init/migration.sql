-- CreateEnum
CREATE TYPE "TransactionStatusEnum" AS ENUM ('PENDING', 'APPROVED', 'REJECTED');

-- CreateEnum
CREATE TYPE "FraudSeverity" AS ENUM ('LOW', 'MEDIUM', 'HIGH');

-- CreateTable
CREATE TABLE "Wallet" (
    "id" SERIAL NOT NULL,
    "accountExternalId" TEXT NOT NULL,
    "balance" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Wallet_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TransactionType" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "TransactionType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Transaction" (
    "id" SERIAL NOT NULL,
    "transactionExternalId" TEXT NOT NULL,
    "accountExternalIdDebit" TEXT NOT NULL,
    "accountExternalIdCredit" TEXT NOT NULL,
    "transactionTypeId" INTEGER NOT NULL,
    "transactionStatus" "TransactionStatusEnum" NOT NULL,
    "value" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Transaction_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FraudFlag" (
    "id" SERIAL NOT NULL,
    "transactionId" INTEGER NOT NULL,
    "severity" "FraudSeverity" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "FraudFlag_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Wallet_accountExternalId_key" ON "Wallet"("accountExternalId");

-- CreateIndex
CREATE UNIQUE INDEX "Transaction_transactionExternalId_key" ON "Transaction"("transactionExternalId");

-- CreateIndex
CREATE UNIQUE INDEX "FraudFlag_transactionId_key" ON "FraudFlag"("transactionId");

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_transactionTypeId_fkey" FOREIGN KEY ("transactionTypeId") REFERENCES "TransactionType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FraudFlag" ADD CONSTRAINT "FraudFlag_transactionId_fkey" FOREIGN KEY ("transactionId") REFERENCES "Transaction"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
