import { Module } from '@nestjs/common';
import { AntifraudController } from './antifraud/antifraud.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TransactionModule } from '@yape-modules/transaction';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TransactionModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        prismaOptions: {
          datasourceUrl: configService.get<string>('DATABASE_URL'),
        }
      }),
      inject: [ConfigService],
    })
  ],
  controllers: [AntifraudController],
  providers: [],
})
export class ProcessorModule { }
