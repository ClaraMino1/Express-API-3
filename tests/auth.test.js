import request from 'supertest';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

import app from '../src/app.js';
import { UserModel } from '../src/models/user.model.js';
import { env } from '../src/config/env.js';

beforeAll(async () => {
  await mongoose.connect(env.mongoUriTest);
});

beforeEach(async () => {
  await UserModel.deleteMany({});

  const hashed = await bcrypt.hash('password123', 10);

  await UserModel.create({
    username: 'testuser',
    email: 'user@test.com',
    password: hashed,
    role: 'user'
  });
});

afterAll(async () => {
  await UserModel.deleteMany({});
  await mongoose.connection.close();
});

describe('/api/auth', () => {
  describe('POST /login -> autenticar usuario', () => {
    test('Deberia autenticar con credenciales validas', async () => {
      const response = await request(app)
        .post('/api/auth/login')
        .send({ email: 'user@test.com', password: 'password123' });

      expect(response.statusCode).toBe(200);
      expect(response.body.status).toBe('success');
      expect(response.body.payload).toBeDefined();
      expect(response.body.payload.token).toBeDefined();
      expect(response.body.payload.user.email).toBe('user@test.com');
    });

    test('Sin password deberia devolver 400', async () => {
      const response = await request(app)
        .post('/api/auth/login')
        .send({ email: 'user@test.com' });

      expect(response.statusCode).toBe(400);
      expect(response.body.status).toBe('error');
    });

    test('Con credenciales invalidas deberia devolver 401', async () => {
      const response = await request(app)
        .post('/api/auth/login')
        .send({ email: 'user@test.com', password: 'wrongpass' });

      expect(response.statusCode).toBe(401);
      expect(response.body.status).toBe('error');
    });
  });
});
