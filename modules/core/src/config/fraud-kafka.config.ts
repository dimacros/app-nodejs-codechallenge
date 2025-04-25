import { KafkaOptions, Transport } from "@nestjs/microservices";
import { registerAs } from "@nestjs/config";

export default registerAs('fraud', () => ({
  transport: Transport.KAFKA,
  options: {
    client: {
      clientId: 'fraud-client',
      brokers: ['localhost:9092'],
    },
    consumer: {
      groupId: 'fraud-consumer',
    },
  },
}) satisfies KafkaOptions)