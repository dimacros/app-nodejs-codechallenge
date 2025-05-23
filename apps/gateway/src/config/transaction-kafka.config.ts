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
            brokers: [process.env.KAFKA_HOST ?? 'localhost:9092'],
            logLevel: logLevel.INFO,
            retry: {
              initialRetryTime: 500,
              retries: 3,
            }
          },
          producer: {
            allowAutoTopicCreation: true,
            idempotent: true,
          },
          consumer: {
            groupId: 'transaction-gateway-group',
            sessionTimeout: 30000,
            maxWaitTimeInMs: 5000,
            allowAutoTopicCreation: true,
            heartbeatInterval: 3000,
          },
        },
      },
    }) satisfies {
      kafkaOptions: KafkaOptions;
    },
);
