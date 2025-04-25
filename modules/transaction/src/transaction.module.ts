import { Module } from "@nestjs/common";
import { TransactionService } from "./transaction.service";
import { GetTransactionHandler } from "./app/queries/get-transaction.handler";
import { GetAllTransactionsHandler } from "./app/queries/get-all-transactions.handler";
import { CreateTransactionHandler } from "./app/commands/create-transaction.handler";
import { TransactionRepo, TransactionTypeRepo } from "./domain/transaction.repo";
import { PrismaTransactionTypeRepo } from "./infra/persistence/prisma-transaction-type.repo";
import { PrismaTransactionRepo } from "./infra/persistence/prisma-transaction.repo";

@Module({
  imports: [],
  providers: [
    { provide: TransactionRepo, useClass: PrismaTransactionRepo },
    { provide: TransactionTypeRepo, useClass: PrismaTransactionTypeRepo },
    CreateTransactionHandler,
    GetAllTransactionsHandler,
    GetTransactionHandler,
    TransactionService,
  ],
  exports: [TransactionService],
})
export class TransactionModule { }