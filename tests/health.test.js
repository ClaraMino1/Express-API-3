import request from 'supertest';

import app from '../src/app.js';

describe('/api/health', () => {
  describe('GET / -> estado de la aplicacion', () => {
    test('Deberia devolver status ok y entorno', async () => {
      const response = await request(app).get('/api/health');

      expect(response.statusCode).toBe(200);
      expect(response.body.status).toBe('ok');
      expect(response.body.environment).toBeDefined();
      expect(response.body.store).toBeDefined();
    });
  });
});
