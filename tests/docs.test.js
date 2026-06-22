import request from 'supertest';

import app from '../src/app.js';

describe('/api/docs', () => {
  describe('GET /json -> swagger spec', () => {
    test('Deberia devolver el JSON de swagger', async () => {
      const response = await request(app).get('/api/docs/json');

      expect(response.statusCode).toBe(200);
      expect(response.body).toBeDefined();
      expect(response.body.openapi).toBe('3.0.0');
    });
  });
});
