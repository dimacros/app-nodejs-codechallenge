import { registerAs } from '@nestjs/config';
import { db } from '@yape-modules/core';

export default registerAs(
  'database',
  () =>
    ({
      prismaClientOptions: {
        datasourceUrl:
          'postgresql://postgres:postgres@localhost:5432/yapedb?schema=public',
        log: ['query', 'info', 'warn', 'error'],
      },
    }) satisfies {
      prismaClientOptions: db.prisma.Prisma.PrismaClientOptions;
    },
);
