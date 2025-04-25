import { ConfigurableModuleBuilder } from '@nestjs/common';
import { Prisma, PrismaClient } from '@prisma/client';
import { PRISMA_CLIENT } from './database.constants';

export const {
  ConfigurableModuleClass,
  MODULE_OPTIONS_TOKEN: DATABASE_MODULE_OPTIONS,
  ASYNC_OPTIONS_TYPE,
  OPTIONS_TYPE,
} = new ConfigurableModuleBuilder<{
  prismaClientOptions: Prisma.PrismaClientOptions;
}>()
  .setClassMethodName('forRoot')
  .setExtras<{ isGlobal?: boolean }>(
    { isGlobal: true },
    (definition, extras) => ({
      ...definition,
      providers: [
        ...(definition.providers ?? []),
        {
          provide: PRISMA_CLIENT,
          useFactory: (o: typeof OPTIONS_TYPE) => {
            return new PrismaClient(o.prismaClientOptions);
          },
          inject: [DATABASE_MODULE_OPTIONS],
        },
      ],
      exports: [PRISMA_CLIENT],
      global: extras.isGlobal,
    }),
  )
  .build();
