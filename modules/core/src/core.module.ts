import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import databaseConfig from './config/database.config';
import fraudMicroserviceConfig from './config/fraud-kafka.config';
import transactionMicroserviceConfig from './config/transaction-kafka.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [
        databaseConfig,
        fraudMicroserviceConfig,
        transactionMicroserviceConfig,
      ],
    }),
  ],
  providers: [],
  exports: [ConfigModule],
})
export class CoreModule { }
