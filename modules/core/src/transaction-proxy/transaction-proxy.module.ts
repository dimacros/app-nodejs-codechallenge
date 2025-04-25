import { Inject, Module, OnApplicationBootstrap } from "@nestjs/common";
import { ConfigModule, ConfigType } from "@nestjs/config";
import { ClientProxy, ClientsModule } from "@nestjs/microservices";
import { TRANSACTION_SERVICE } from "./transaction-proxy.constants";
import { EventPublisherAdapter } from "./adapters/event-publisher.adapter";
import transactionMicroserviceConfig from "../config/transaction-kafka.config";
import { CommandPublisherAdapter } from "./adapters/command-publisher.adapter";
import { QueryPublisherAdapter } from "./adapters/query-publisher.adapter";

@Module({
  imports: [
    ConfigModule,
    ClientsModule.registerAsync({
      clients: [
        {
          imports: [ConfigModule.forFeature(transactionMicroserviceConfig)],
          useFactory: (c: ConfigType<typeof transactionMicroserviceConfig>) => c,
          inject: [transactionMicroserviceConfig.KEY],
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
export class TransactionProxyModule implements OnApplicationBootstrap {
  constructor(
    @Inject(TRANSACTION_SERVICE)
    private readonly transactionClientProxy: ClientProxy,
  ) { }

  async onApplicationBootstrap() {
    await this.transactionClientProxy.connect();
  }
}