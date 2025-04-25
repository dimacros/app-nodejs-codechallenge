
import { NestFactory } from '@nestjs/core';
import { Transport, AsyncMicroserviceOptions } from '@nestjs/microservices';
import { ProcessorModule } from './processor.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<AsyncMicroserviceOptions>(
    ProcessorModule,
    {
      useFactory: (configService: ConfigService) => ({
        transport: Transport.TCP,
        options: {
          host: configService.get<string>('HOST', 'localhost'),
          port: configService.get<number>('PORT', 4000),
        },
      }),
      inject: [ConfigService],
    },
  );
  await app.listen();
}
bootstrap();
