import { NestFactory } from '@nestjs/core';
import { GatewayModule } from './gateway.module';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(GatewayModule);

  await app.listen(process.env.PORT ?? 3000);
}

bootstrap();
