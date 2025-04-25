import { Inject, Module, OnApplicationBootstrap } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { ClientProxy, ClientsModule, Transport } from "@nestjs/microservices";
import { ANTIFRAUD_SERVICE } from "./proxy.constants";
import { EventPublisherAdapter } from "./adapaters/event-publiser.adapter";

@Module({
  imports: [
    ClientsModule.registerAsync({
      clients: [
        {
          imports: [ConfigModule],
          name: ANTIFRAUD_SERVICE,
          useFactory: (configService: ConfigService) => ({
            transport: Transport.TCP,
            options: {
              host: configService.get('ANTIFRAUD_SERVICE_HOST', 'localhost'),
              port: configService.get('ANTIFRAUD_SERVICE_PORT', 4000),
            }
          }),
          inject: [ConfigService],
        }
      ]
    }),
  ],
  controllers: [],
  providers: [
    EventPublisherAdapter,
  ],
  exports: [
    EventPublisherAdapter,
  ],
})
export class ProxyModule implements OnApplicationBootstrap {
  constructor(
    @Inject(ANTIFRAUD_SERVICE)
    private readonly clientProxy: ClientProxy
  ) { }

  async onApplicationBootstrap() {
    await this.clientProxy.connect();
  }
}