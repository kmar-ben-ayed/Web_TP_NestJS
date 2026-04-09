import { NestFactory } from '@nestjs/core';
<<<<<<< HEAD
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
=======
import { AppModule } from './app.module';
import { logger } from './middlewares/logger.middleware';
>>>>>>> d35f344b327b8549112fa70e4dac4f97363022e5

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

<<<<<<< HEAD
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  app.useGlobalFilters(new HttpExceptionFilter());

  const config = new DocumentBuilder()
    .setTitle('CV Manager API')
    .setDescription('REST API for managing CVs, users, and skills')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
=======
  // Enable CORS for frontend integration
  app.enableCors();
  
  // Optional: Add a global prefix to clean up routes
  app.setGlobalPrefix('api');

  // Middleware global (s'exécute en premier sur toutes les routes)
  app.use(logger);

  // Exemple : restreindre le middleware global à certains paths
  // app.use(['/skill', '/user'], logger);
>>>>>>> d35f344b327b8549112fa70e4dac4f97363022e5

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
<<<<<<< HEAD
=======

>>>>>>> d35f344b327b8549112fa70e4dac4f97363022e5
