import { KafkaOptions, Transport } from '@nestjs/microservices';
import { registerAs } from '@nestjs/config';
import { logLevel } from 'kafkajs';

export default registerAs(
  'transactionKafka',
  () =>
    ({
      kafkaOptions: {
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: 'transaction-processor-client',
            brokers: ['localhost:9092'],
            logLevel: logLevel.INFO,
          },
          consumer: {
            groupId: 'transaction-processor-group',
          },
        },
      },
    }) satisfies {
      kafkaOptions: KafkaOptions;
    },
);
