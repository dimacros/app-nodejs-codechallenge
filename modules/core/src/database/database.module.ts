import { Inject, Module, OnModuleDestroy, OnModuleInit } from "@nestjs/common";
import { Prisma, PrismaClient } from "@prisma/client";
import { PRISMA_CLIENT, PRISMA_CLIENT_OPTIONS } from "./database.constants";

@Module({
  imports: [],
  providers: [
    {
      provide: PRISMA_CLIENT_OPTIONS,
      useFactory: () => ({
        datasourceUrl: process.env.DATABASE_URL ?? "postgresql://postgres:postgres@localhost:5432/yapedb?schema=public",
      }) satisfies Prisma.PrismaClientOptions,
    },
    {
      inject: [PRISMA_CLIENT_OPTIONS],
      provide: PRISMA_CLIENT,
      useFactory: (options: Prisma.PrismaClientOptions) => {
        return new PrismaClient(options)
      },
    }
  ],
  exports: [PRISMA_CLIENT],
})
export class DatabaseModule implements OnModuleInit, OnModuleDestroy {
  constructor(
    @Inject(PRISMA_CLIENT)
    private readonly prismaClient: PrismaClient,
  ) { }

  onModuleInit() {
    this.prismaClient.$connect();
  }

  onModuleDestroy() {
    this.prismaClient.$disconnect();
  }
}