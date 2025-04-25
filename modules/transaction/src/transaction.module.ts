import { Module } from "@nestjs/common";
import { CqrsModule } from "@nestjs/cqrs";
import { TransactionService } from "./transaction.service";
import { GetTransactionHandler } from "./app/queries/get-transaction.handler";
import { GetAllTransactionsHandler } from "./app/queries/get-all-transactions.handler";
import { CreateTransactionHandler } from "./app/commands/create-transaction.handler";
import { TransactionRepo, TransactionTypeRepo } from "./domain/transaction.repo";
import { PrismaTransactionTypeRepo } from "./infra/persistence/prisma-transaction-type.repo";
import { PrismaTransactionRepo } from "./infra/persistence/prisma-transaction.repo";
import { db, transactionProxy } from "@yape-modules/core";

@Module({
  imports: [
    db.DatabaseModule,
    CqrsModule.forRootAsync({
      imports: [transactionProxy.TransactionProxyModule],
      useFactory: (
        commandPublisher: transactionProxy.CommandPublisherAdapter,
        eventPublisher: transactionProxy.EventPublisherAdapter,
        queryPublisher: transactionProxy.QueryPublisherAdapter,
      ) => ({
        commandPublisher: commandPublisher,
        eventPublisher: eventPublisher,
        queryPublisher: queryPublisher,
        unhandledExceptionPublisher: undefined,
        rethrowUnhandled: false,
      }),
      inject: [
        transactionProxy.CommandPublisherAdapter,
        transactionProxy.EventPublisherAdapter,
        transactionProxy.QueryPublisherAdapter,
      ],
      extraProviders: [],
    }),
  ],
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