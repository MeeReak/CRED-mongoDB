import request from 'supertest';
import { app } from '../server';

describe('GET /api/student', () => {
  it('should return 200 OK', (done) => {
    request(app)
      .get('/api/student')
      .expect(300, done);
  });
});