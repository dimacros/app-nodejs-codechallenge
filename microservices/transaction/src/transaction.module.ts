import { DynamicModule, Module } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { CreateTransactionHandler } from './app/commands/create-transaction.handler';
import { GetAllTransactionsHandler } from './app/queries/get-all-transactions.handler';
import { GetTransactionHandler } from './app/queries/get-transaction.handler';
import { ConfigurableModuleClass, ASYNC_OPTIONS_TYPE, OPTIONS_TYPE, TRANSACTION_MODULE_OPTIONS } from './transaction.module-definition';
import { PrismaService } from './app/services/prisma.service';
import { TransactionRepo, TransactionTypeRepo } from './domain/transaction.repo';
import { PrismaTransactionRepo } from './infra/persistence/prisma-transaction.repo';

@Module({
  providers: [
    CreateTransactionHandler,
    GetAllTransactionsHandler,
    GetTransactionHandler,
    TransactionService,
    {
      provide: TransactionRepo,
      useClass: PrismaTransactionRepo,
    },
    {
      provide: TransactionTypeRepo,
      useClass: PrismaTransactionRepo,
    },
    {
      provide: PrismaService,
      inject: [TRANSACTION_MODULE_OPTIONS],
      useFactory: (options: typeof OPTIONS_TYPE) => {
        return new PrismaService(options.prismaOptions);
      }
    }
  ],
  exports: [TransactionService],
})
export class TransactionModule extends ConfigurableModuleClass {
  static forRoot(options: typeof OPTIONS_TYPE): DynamicModule {
    return {
      ...super.forRoot(options),
    };
  }

  static forRootAsync(options: typeof ASYNC_OPTIONS_TYPE): DynamicModule {
    return {
      ...super.forRootAsync(options),
    };
  }
}
