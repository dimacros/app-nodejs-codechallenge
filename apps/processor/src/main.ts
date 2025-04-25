
import { NestFactory } from '@nestjs/core';
import { ConfigType } from '@nestjs/config';
import { AsyncMicroserviceOptions } from '@nestjs/microservices';
import { FraudProcessorModule } from './fraud/fraud-processor.module';
import { TransactionProcessorModule } from './transaction/transaction-processor.module';
import fraudKafkaConfig from './config/fraud-kafka.config';
import transactionKafkaConfig from './config/transaction-kafka.config';

async function bootstrap() {
  const fraudProcessor = await NestFactory.createMicroservice<AsyncMicroserviceOptions>(
    FraudProcessorModule,
    {
      useFactory: (c: ConfigType<typeof fraudKafkaConfig>) => c.kafkaOptions,
      inject: [fraudKafkaConfig.KEY],
    },
  );

  const transactionProcessor = await NestFactory.createMicroservice<AsyncMicroserviceOptions>(
    TransactionProcessorModule,
    {
      useFactory: (c: ConfigType<typeof transactionKafkaConfig>) => c.kafkaOptions,
      inject: [transactionKafkaConfig.KEY],
    },
  );

  await Promise.all([
    // fraudProcessor.listen(),
    transactionProcessor.listen(),
  ]);
}

bootstrap();
