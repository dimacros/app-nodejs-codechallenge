import { KafkaOptions, Transport } from "@nestjs/microservices";
import { registerAs } from "@nestjs/config";

export default registerAs('transaction', () => ({
  transport: Transport.KAFKA,
  options: {
    client: {
      clientId: 'transaction-client',
      brokers: ['localhost:9092'],
    },
    consumer: {
      groupId: 'transaction-consumer',
    },
  },
}) satisfies KafkaOptions)