import { Module } from '@nestjs/common';
import { TransactionModule } from '@yape-modules/transaction';
import { CoreModule } from '@yape-modules/core';
import { TransactionController } from './api/v1/transaction.controller';

@Module({
  imports: [
    CoreModule,
    TransactionModule,
  ],
  controllers: [
    TransactionController,
  ]
})
export class GatewayModule { }
