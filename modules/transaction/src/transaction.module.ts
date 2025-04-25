import { Inject, Module, OnModuleInit } from "@nestjs/common";
import { TransactionService } from "./transaction.service";
import { GetTransactionHandler } from "./app/queries/get-transaction.handler";
import { GetAllTransactionsHandler } from "./app/queries/get-all-transactions.handler";
import { CreateTransactionHandler } from "./app/commands/create-transaction.handler";
import { TransactionRepo, TransactionTypeRepo } from "./domain/transaction.repo";
import { PrismaTransactionTypeRepo } from "./infra/persistence/prisma-transaction-type.repo";
import { PrismaTransactionRepo } from "./infra/persistence/prisma-transaction.repo";
import { db } from "@yape-modules/core";

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
export class TransactionModule implements OnModuleInit {
  constructor(
    @Inject(db.PRISMA_CLIENT)
    private readonly prismaClient: db.prisma.PrismaClient,
  ) { }

  async onModuleInit() {
    await this.prismaClient.transactionType.createMany({
      data: [
        { id: 1, name: 'TRANSFER' },
        { id: 2, name: 'PAYMENT' },
        { id: 3, name: 'CHARGEBACK' },
      ],
      skipDuplicates: true,
    });
  }
}