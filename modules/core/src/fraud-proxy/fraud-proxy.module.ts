import { Inject, Module, OnApplicationBootstrap } from "@nestjs/common";
import { ConfigModule, ConfigType } from "@nestjs/config";
import { ClientProxy, ClientsModule } from "@nestjs/microservices";
import { FRAUD_SERVICE } from "./fraud-proxy.constants";
import { EventPublisherAdapter } from "./adapters/event-publisher.adapter";
import { CommandPublisherAdapter } from "./adapters/command-publisher.adapter";
import { QueryPublisherAdapter } from "./adapters/query-publisher.adapter";
import fraudKafkaConfig from "../config/fraud-kafka.config";

@Module({
  imports: [
    ConfigModule,
    ClientsModule.registerAsync({
      clients: [
        {
          imports: [ConfigModule.forFeature(fraudKafkaConfig)],
          useFactory: (c: ConfigType<typeof fraudKafkaConfig>) => c,
          inject: [fraudKafkaConfig.KEY],
          name: FRAUD_SERVICE,
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
export class FraudProxyModule implements OnApplicationBootstrap {
  constructor(
    @Inject(FRAUD_SERVICE)
    private readonly fraudClientProxy: ClientProxy,
  ) { }

  async onApplicationBootstrap() {
    await this.fraudClientProxy.connect();
  }
}