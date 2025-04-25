import { Module } from '@nestjs/common';
import { FraudService } from './fraud.service';
import { CheckTransactionHandler } from './app/commands/check-transaction.handler';
import { CqrsModule } from '@nestjs/cqrs';
import { fraudProxy } from "@yape-modules/core";

@Module({
  imports: [
    CqrsModule.forRootAsync({
      imports: [fraudProxy.FraudProxyModule],
      useFactory: (
        commandPublisher: fraudProxy.CommandPublisherAdapter,
        eventPublisher: fraudProxy.EventPublisherAdapter,
        queryPublisher: fraudProxy.QueryPublisherAdapter,
      ) => ({
        commandPublisher: commandPublisher,
        eventPublisher: eventPublisher,
        queryPublisher: queryPublisher,
        unhandledExceptionPublisher: undefined,
        rethrowUnhandled: false,
      }),
      inject: [
        fraudProxy.CommandPublisherAdapter,
        fraudProxy.EventPublisherAdapter,
        fraudProxy.QueryPublisherAdapter,
      ],
      extraProviders: [],
    }),
  ],
  providers: [
    CheckTransactionHandler,
    FraudService,
  ],
  exports: [
    FraudService,
  ],
})
export class FraudModule { }