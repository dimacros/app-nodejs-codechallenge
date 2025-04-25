import type { Prisma } from "@yape/db/client";
import { ConfigurableModuleBuilder } from "@nestjs/common";
import { PrismaService } from "./app/services/prisma.service";

export const {
  ConfigurableModuleClass,
  ASYNC_OPTIONS_TYPE,
  OPTIONS_TYPE,
  MODULE_OPTIONS_TOKEN: TRANSACTION_MODULE_OPTIONS,
} = new ConfigurableModuleBuilder<{
  prismaOptions: Prisma.PrismaClientOptions;
}>()
  .setClassMethodName("forRoot")
  .setExtras(
    {},
    (definition, _) => ({
      ...definition,
      providers: [
        ...(definition.providers ?? []),
        {
          provide: PrismaService,
          useFactory: async (opts: typeof OPTIONS_TYPE) => {
            return new PrismaService(opts.prismaOptions);
          },
          inject: [TRANSACTION_MODULE_OPTIONS],
        },
      ],
    }),
  )
  .build();