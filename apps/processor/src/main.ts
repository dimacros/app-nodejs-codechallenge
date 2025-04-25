
import { NestFactory } from '@nestjs/core';
import { ConfigType } from '@nestjs/config';
import { AsyncMicroserviceOptions } from '@nestjs/microservices';
import { FraudProcessorModule } from './fraud/fraud-processor.module';
import { TransactionProcessorModule } from './transaction/transaction-processor.module';
import { config } from '@yape-modules/core';

async function bootstrap() {
  const fraudProcessor = await NestFactory.createMicroservice<AsyncMicroserviceOptions>(
    FraudProcessorModule,
    {
      inject: [config.fraudKafkaConfig.KEY],
      useFactory: (c: ConfigType<typeof config.fraudKafkaConfig>) => c,
    },
  );

  const transactionProcessor = await NestFactory.createMicroservice<AsyncMicroserviceOptions>(
    TransactionProcessorModule,
    {
      inject: [config.transactionKafkaConfig.KEY],
      useFactory: (c: ConfigType<typeof config.transactionKafkaConfig>) => c,
    },
  );

  await Promise.all([
    fraudProcessor.listen(),
    transactionProcessor.listen(),
  ]);
}

bootstrap();
