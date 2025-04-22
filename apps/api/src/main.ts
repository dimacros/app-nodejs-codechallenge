import { NestFactory } from '@nestjs/core';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { AppModule } from './app.module';

async function bootstrap() {
  const adapter = new FastifyAdapter();
  const app = await NestFactory.create<NestFastifyApplication>(AppModule, adapter);

  await app.listen(process.env.PORT ?? 3000, '0.0.0.0');
}

bootstrap();
