import { DynamicModule } from "@nestjs/common";
import { ClientsModule } from "@nestjs/microservices";
import { FRAUD_SERVICE } from "./fraud-proxy.constants";
import { EventPublisherAdapter } from "./adapters/event-publisher.adapter";
import { CommandPublisherAdapter } from "./adapters/command-publisher.adapter";
import { QueryPublisherAdapter } from "./adapters/query-publisher.adapter";
import { ConfigurableModuleClass, FRAUD_PROXY_MODULE_OPTIONS, ASYNC_OPTIONS_TYPE, OPTIONS_TYPE } from "./fraud-proxy.module-definition";

export class FraudProxyModule extends ConfigurableModuleClass {
  static forRoot(options: typeof OPTIONS_TYPE) {
    return {
      ...super.forRoot(options),
    }
  }

  static forRootAsync(options: typeof ASYNC_OPTIONS_TYPE) {
    return {
      ...super.forRootAsync(options),
    }
  }

  static forFeature(): DynamicModule {
    return {
      module: FraudProxyModule,
      imports: [
        ClientsModule.registerAsync({
          clients: [
            {
              imports: [FraudProxyModule],
              inject: [FRAUD_PROXY_MODULE_OPTIONS],
              useFactory: (c: typeof OPTIONS_TYPE) => c.kafkaOptions,
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
    }
  }
}