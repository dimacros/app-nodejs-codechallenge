import { KafkaOptions, Transport } from '@nestjs/microservices';
import { registerAs } from '@nestjs/config';
import { logLevel } from '@nestjs/microservices/external/kafka.interface';

export default registerAs(
  'fraudKafka',
  () =>
    ({
      kafkaOptions: {
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: 'fraud-gateway-client',
            brokers: [process.env.KAFKA_HOST ?? 'localhost:9092'],
            logLevel: logLevel.INFO,
          },
          consumer: {
            groupId: 'transaction-gateway-group',
            allowAutoTopicCreation: false,
          },
        },
      },
    }) satisfies { kafkaOptions: KafkaOptions },
);
