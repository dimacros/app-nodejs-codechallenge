import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CqrsModule } from '@nestjs/cqrs';
import { db } from '@yape-modules/core';
import { FraudProcessorController } from './fraud-processor.controller';
import { FraudModule } from '@yape-modules/fraud';
import databaseConfig from '../config/database.config';
import fraudKafkaConfig from '../config/fraud-kafka.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [databaseConfig, fraudKafkaConfig],
    }),
    CqrsModule.forRoot(),
    db.DatabaseModule.forRootAsync(databaseConfig.asProvider()),
    FraudModule,
  ],
  controllers: [FraudProcessorController],
  providers: [],
})
export class FraudProcessorModule {}
