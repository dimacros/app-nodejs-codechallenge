import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { db } from '@yape-modules/core';
import { TransactionModule } from '@yape-modules/transaction';
import { TransactionController } from './api/v1/transaction.controller';
import { ConfigModule, ConfigType } from '@nestjs/config';
import { TransactionProxyModule } from './transaction-proxy/transaction-proxy.module';
import { CommandPublisherAdapter } from './transaction-proxy/adapters/command-publisher.adapter';
import { EventPublisherAdapter } from './transaction-proxy/adapters/event-publisher.adapter';
import { QueryPublisherAdapter } from './transaction-proxy/adapters/query-publisher.adapter';
import databaseConfig from './config/database.config';
import transactionKafkaConfig from './config/transaction-kafka.config';
import { ClientsModule } from '@nestjs/microservices';
import { TRANSACTION_SERVICE } from './transaction-proxy/transaction-proxy.constants';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [databaseConfig, transactionKafkaConfig],
    }),
    ClientsModule.registerAsync({
      isGlobal: true,
      clients: [
        {
          imports: [ConfigModule.forFeature(transactionKafkaConfig)],
          inject: [transactionKafkaConfig.KEY],
          useFactory: (c: ConfigType<typeof transactionKafkaConfig>) => {
            return c.kafkaOptions;
          },
          name: TRANSACTION_SERVICE,
        },
      ],
    }),
    CqrsModule.forRootAsync({
      imports: [TransactionProxyModule],
      useFactory: (
        commandPublisher: CommandPublisherAdapter,
        eventPublisher: EventPublisherAdapter,
        queryPublisher: QueryPublisherAdapter,
      ) => ({
        commandPublisher: commandPublisher,
        eventPublisher: eventPublisher,
        queryPublisher: queryPublisher,
        unhandledExceptionPublisher: undefined,
        rethrowUnhandled: false,
      }),
      inject: [
        CommandPublisherAdapter,
        EventPublisherAdapter,
        QueryPublisherAdapter,
      ],
      extraProviders: [],
    }),
    db.DatabaseModule.forRootAsync(databaseConfig.asProvider()),
    TransactionModule,
  ],
  controllers: [TransactionController],
})
export class GatewayModule {}
