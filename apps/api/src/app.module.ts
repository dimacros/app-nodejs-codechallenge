import { Module } from '@nestjs/common';
import { TransactionModule } from '@yape-modules/transaction';
import { TransactionController } from './v1/transaction.controller';
import { CqrsModule } from '@nestjs/cqrs';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    CqrsModule.forRoot(),
    TransactionModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        prismaOptions: {
          datasourceUrl: configService.get('DATABASE_URL'),
        },
      }),
    })
  ],
  controllers: [
    TransactionController,
  ]
})
export class AppModule { }
