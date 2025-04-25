import type { Prisma } from "@yape/db/client";
import { ConfigurableModuleBuilder } from "@nestjs/common";

export type TransactionModuleOptions = {
  prismaOptions: Prisma.PrismaClientOptions;
};

export const {
  ConfigurableModuleClass,
  ASYNC_OPTIONS_TYPE,
  OPTIONS_TYPE,
  MODULE_OPTIONS_TOKEN: TRANSACTION_MODULE_OPTIONS,
} = new ConfigurableModuleBuilder<TransactionModuleOptions>()
  .setClassMethodName("forRoot")
  .setFactoryMethodName("resolve")
  .build();