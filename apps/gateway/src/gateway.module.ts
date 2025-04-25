import { Module } from '@nestjs/common';
import { CqrsModule, CqrsModuleOptions } from "@nestjs/cqrs";
import { TransactionModule } from '@yape-modules/transaction';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ApiModule } from './api/api.module';
import { ProxyModule } from './proxy/proxy.module';
import { EventPublisherAdapter } from './proxy/adapaters/event-publiser.adapter';

@Module({
  imports: [
    ConfigModule.forRoot(),
    CqrsModule.forRootAsync({
      imports: [ProxyModule],
      useFactory: (eventPublisher: EventPublisherAdapter) => ({
        commandPublisher: undefined,
        eventPublisher: eventPublisher,
        queryPublisher: undefined,
        unhandledExceptionPublisher: undefined,
        rethrowUnhandled: false,
      }),
      inject: [EventPublisherAdapter],
      extraProviders: [],
    }),
    TransactionModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        prismaOptions: {
          datasourceUrl: configService.get('DATABASE_URL'),
        },
      }),
    }),
    ApiModule,
  ],
  controllers: []
})
export class GatewayModule { }
