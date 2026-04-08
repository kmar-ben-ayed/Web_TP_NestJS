import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,       // strip unknown properties
      forbidNonWhitelisted: true, // reject requests with unexpected fields
      transform: true,       // auto-transform payloads to DTO class instances
    }),
  );
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
