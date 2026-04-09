import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { logger } from './middlewares/logger.middleware';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable CORS for frontend integration
  app.enableCors();
  
  // Optional: Add a global prefix to clean up routes
  app.setGlobalPrefix('api');

  // Middleware global (s'exécute en premier sur toutes les routes)
  app.use(logger);

  // Exemple : restreindre le middleware global à certains paths
  // app.use(['/skill', '/user'], logger);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();

