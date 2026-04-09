import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from './../src/app.module';
import { describe, it, expect, beforeAll, afterAll } from '@jest/globals';

describe('CV Auth & Authorization (e2e)', () => {
  let app: INestApplication<App>;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  const unique = (prefix: string) => `${prefix}_${Date.now()}_${Math.floor(Math.random() * 100000)}`;

  async function registerAndLogin(role: 'USER' | 'ADMIN' = 'USER') {
    const username = unique('user');
    const email = `${unique('mail')}@example.com`;
    const password = 'password123';

    await request(app.getHttpServer())
      .post('/auth/register')
      .send({ username, email, password, role })
      .expect(201);

    const loginRes = await request(app.getHttpServer())
      .post('/auth/login')
      .send({ email, password })
      .expect(200);

    return {
      token: loginRes.body.access_token as string,
      user: loginRes.body.user as { id: number; role: string },
    };
  }

  async function createCv(token: string, cinSuffix: string) {
    const res = await request(app.getHttpServer())
      .post('/cv')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Doe',
        firstname: 'John',
        age: 28,
        cin: `CIN_${cinSuffix}`,
        job: 'Developer',
        path: 'cv.pdf',
      })
      .expect(201);

    return res.body as { id: number };
  }

  it('user only sees own cvs', async () => {
    const userA = await registerAndLogin('USER');
    const userB = await registerAndLogin('USER');

    await createCv(userA.token, unique('a'));
    await createCv(userB.token, unique('b'));

    const listA = await request(app.getHttpServer())
      .get('/cv')
      .set('Authorization', `Bearer ${userA.token}`)
      .expect(200);

    expect(Array.isArray(listA.body)).toBe(true);
    expect(listA.body.length).toBeGreaterThan(0);
    expect(listA.body.every((cv: any) => cv.user?.id === userA.user.id)).toBe(true);
  });

  it('non-owner cannot update or delete another user cv', async () => {
    const owner = await registerAndLogin('USER');
    const other = await registerAndLogin('USER');
    const cv = await createCv(owner.token, unique('owner'));

    await request(app.getHttpServer())
      .patch(`/cv/${cv.id}`)
      .set('Authorization', `Bearer ${other.token}`)
      .send({ job: 'QA Engineer' })
      .expect(403);

    await request(app.getHttpServer())
      .delete(`/cv/${cv.id}`)
      .set('Authorization', `Bearer ${other.token}`)
      .expect(403);
  });

  it('admin can view all cvs and use admin-only endpoint', async () => {
    const userA = await registerAndLogin('USER');
    const userB = await registerAndLogin('USER');
    const admin = await registerAndLogin('ADMIN');

    const cvA = await createCv(userA.token, unique('admin-a'));
    const cvB = await createCv(userB.token, unique('admin-b'));

    const adminList = await request(app.getHttpServer())
      .get('/cv')
      .set('Authorization', `Bearer ${admin.token}`)
      .expect(200);

    const ids = adminList.body.map((cv: any) => cv.id);
    expect(ids).toContain(cvA.id);
    expect(ids).toContain(cvB.id);

    await request(app.getHttpServer())
      .get('/cv/admin/all')
      .set('Authorization', `Bearer ${admin.token}`)
      .expect(200);
  });

  it('non-admin cannot access admin-only endpoint', async () => {
    const user = await registerAndLogin('USER');

    await request(app.getHttpServer())
      .get('/cv/admin/all')
      .set('Authorization', `Bearer ${user.token}`)
      .expect(403);
  });

  afterAll(async () => {
    await app.close();
  });
});
