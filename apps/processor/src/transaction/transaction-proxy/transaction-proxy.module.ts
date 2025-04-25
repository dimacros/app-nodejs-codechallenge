import { Module } from "@nestjs/common";
import { EventPublisherAdapter } from "./adapters/event-publisher.adapter";
import { CommandPublisherAdapter } from "./adapters/command-publisher.adapter";
import { QueryPublisherAdapter } from "./adapters/query-publisher.adapter";
import { ClientsModule } from "@nestjs/microservices";
import { ConfigModule, ConfigType } from "@nestjs/config";
import transactionKafkaConfig from "../../config/transaction-kafka.config";
import { TRANSACTION_SERVICE } from "./transaction-proxy.constants";

@Module({
  imports: [
    ClientsModule.registerAsync({
      clients: [
        {
          imports: [
            ConfigModule.forFeature(transactionKafkaConfig)
          ],
          inject: [transactionKafkaConfig.KEY],
          useFactory: (c: ConfigType<typeof transactionKafkaConfig>) => {
            return c.kafkaOptions
          },
          name: TRANSACTION_SERVICE,
        }
      ]
    }),
  ],
  providers: [
    CommandPublisherAdapter,
    EventPublisherAdapter,
    QueryPublisherAdapter,
  ],
  exports: [
    CommandPublisherAdapter,
    EventPublisherAdapter,
    QueryPublisherAdapter,
  ],
})
export class TransactionProxyModule { }
