import { Module } from '@nestjs/common';
import { TransactionModule } from '@yape-modules/transaction';
import { TransactionProcessorController } from './transaction-processor.controller';
import { CoreModule } from '@yape-modules/core';

@Module({
  imports: [
    CoreModule,
    TransactionModule,
  ],
  controllers: [TransactionProcessorController],
  providers: [],
})
export class TransactionProcessorModule { }
