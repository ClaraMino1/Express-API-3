import request from 'supertest';

import app from '../src/app.js';

describe('/api/debug', () => {

  describe('GET /process -> información del proceso', () => {
    test('Deberia devolver info del proceso', async () => {
      const response = await request(app).get('/api/debug/process');

      expect(response.statusCode).toBe(200);
      expect(response.body.status).toBe('success');
      expect(response.body.payload.pid).toBeDefined();
      expect(typeof response.body.payload.nodeVersion).toBe('string');
      expect(typeof response.body.payload.platform).toBe('string');
    });
  });

  describe('GET /cpu -> tarea bloqueante', () => {
    test('Deberia completar la tarea y devolver duration', async () => {
      const response = await request(app).get('/api/debug/cpu?duration=10');

      expect(response.statusCode).toBe(200);
      expect(response.body.status).toBe('success');
      expect(response.body.payload.durationMs).toBeGreaterThanOrEqual(0);
    });
  });

});
