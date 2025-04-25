import { Module } from '@nestjs/common';
import { FraudService } from './fraud.service';
import { CheckTransactionHandler } from './app/commands/check-transaction.handler';

@Module({
  imports: [],
  providers: [
    CheckTransactionHandler,
    FraudService,
  ],
  exports: [
    FraudService,
  ],
})
export class FraudModule { }