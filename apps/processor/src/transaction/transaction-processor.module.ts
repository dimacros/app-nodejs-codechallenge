import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { ConfigModule } from '@nestjs/config';
import { db } from '@yape-modules/core';
import { TransactionModule } from '@yape-modules/transaction';
import { TransactionProxyModule } from './transaction-proxy/transaction-proxy.module';
import { EventPublisherAdapter } from './transaction-proxy/adapters/event-publisher.adapter';
import { CommandPublisherAdapter } from './transaction-proxy/adapters/command-publisher.adapter';
import { QueryPublisherAdapter } from './transaction-proxy/adapters/query-publisher.adapter';
import { TransactionProcessorController } from './transaction-processor.controller';
import databaseConfig from '../config/database.config';
import transactionKafkaConfig from '../config/transaction-kafka.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [
        databaseConfig,
        transactionKafkaConfig,
      ]
    }),
    CqrsModule.forRoot(),
    db.DatabaseModule.forRootAsync(
      databaseConfig.asProvider()
    ),
    TransactionModule,
  ],
  controllers: [TransactionProcessorController],
  providers: [],
})
export class TransactionProcessorModule { }
