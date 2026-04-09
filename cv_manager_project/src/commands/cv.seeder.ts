import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { CvService } from '../cv/cv.service';
import { randFullName, randJobTitle, randNumber } from '@ngneat/falso';

async function bootstrap() {

  const app = await NestFactory.createApplicationContext(AppModule);

  const cvService = app.get(CvService);

  await cvService.create({
    name: "Kmar",
    firstname: "Ben Ayed",
    age: 25,
    cin: "12345678",
    job: "Engineer",
    path: "cv1.pdf"
  });

  for (let i = 0; i < 10; i++) {
    await cvService.create({
      name: randFullName(),
      firstname: randFullName(),
      age: randNumber({ min: 19, max: 59 }),
      cin: `CIN${i}`,
      job: randJobTitle(),
      path: "cv.pdf"
    })
  }

  console.log("Seed done");

  await app.close();
}

bootstrap();