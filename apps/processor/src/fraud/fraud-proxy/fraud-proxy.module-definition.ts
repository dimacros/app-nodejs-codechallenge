import { ConfigurableModuleBuilder } from '@nestjs/common';
import { KafkaOptions } from '@nestjs/microservices';

export const {
  ConfigurableModuleClass,
  MODULE_OPTIONS_TOKEN: FRAUD_PROXY_MODULE_OPTIONS,
  ASYNC_OPTIONS_TYPE,
  OPTIONS_TYPE,
} = new ConfigurableModuleBuilder<{
  kafkaOptions: KafkaOptions;
}>()
  .setClassMethodName('forRoot')
  .build();