import request from 'supertest';
import client from 'prom-client';

import app from '../src/app.js';

describe('/api/metrics', () => {
  describe('GET / -> metrics output', () => {
    test('Deberia devolver metrics y header content-type correcto', async () => {
      const response = await request(app).get('/api/metrics');

      expect(response.statusCode).toBe(200);
      expect(response.header['content-type']).toBe(client.register.contentType);
      expect(typeof response.text).toBe('string');
    });
  });
});
