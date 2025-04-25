import { KafkaOptions, Transport } from '@nestjs/microservices';
import { registerAs } from '@nestjs/config';
import { logLevel } from '@nestjs/microservices/external/kafka.interface';

export default registerAs(
  'transactionKafka',
  () =>
    ({
      kafkaOptions: {
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: 'transaction-gateway-client',
            brokers: ['localhost:9092'],
            logLevel: logLevel.INFO,
          },
          producer: {
            allowAutoTopicCreation: true,
            idempotent: true,
          },
          consumer: {
            groupId: 'transaction-gateway-group',
          },
        },
      },
    }) satisfies {
      kafkaOptions: KafkaOptions;
    },
);
