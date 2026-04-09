import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { UserService } from '../user/user.service';
import { SkillService } from '../skill/skill.service';
import { CvService } from '../cv/cv.service';
import {
  randFullName,
  randJobTitle,
  randNumber,
  randPassword,
  randUserName,
  randEmail,
} from '@ngneat/falso';

const SKILLS = [
  'JavaScript',
  'TypeScript',
  'NestJS',
  'React',
  'SQL',
  'Docker',
  'Git',
  'Python',
];

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);

  const userService = app.get(UserService);
  const skillService = app.get(SkillService);
  const cvService = app.get(CvService);

  // --- Seed Skills ---
  console.log('Seeding skills...');
  const skills = await Promise.all(
    SKILLS.map((designation) => skillService.create({ designation })),
  );
  console.log(`  Created ${skills.length} skills.`);

  // --- Seed Users ---
  console.log('Seeding users...');
  const users = await Promise.all(
    Array.from({ length: 5 }, () =>
      userService.create({
        username: randUserName(),
        email: randEmail(),
        password: randPassword({ size: 10 }),
      }),
    ),
  );
  console.log(`  Created ${users.length} users.`);

  // --- Seed CVs with user + skills ---
  console.log('Seeding CVs...');
  let cinCounter = 10000000;
  for (const user of users) {
    const numCvs = randNumber({ min: 1, max: 3 });
    for (let i = 0; i < numCvs; i++) {
      const randomSkills = skills
        .sort(() => Math.random() - 0.5)
        .slice(0, randNumber({ min: 2, max: 5 }));

      await cvService.createWithRelations({
        name: randFullName(),
        firstname: randFullName(),
        age: randNumber({ min: 18, max: 60 }),
        cin: String(cinCounter++),
        job: randJobTitle(),
        path: `cv_${cinCounter}.pdf`,
        user,
        skills: randomSkills,
      });
    }
  }
  console.log('  CVs seeded.');

  console.log('\nSeed complete!');
  await app.close();
}

bootstrap().catch(err => {
  console.error(err);
  process.exit(1);
});
