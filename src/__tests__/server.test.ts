import { createMockServer } from '../server.js'; // Адаптуйте шлях відповідно до структури проекту
import request from 'supertest';

describe('MCP Server', () => {
  let server: any;
  
  beforeEach(() => {
    server = createMockServer({
      // Налаштування сервера для тестування
      port: 0, // Використовуйте випадковий порт для тестів
      authEnabled: false
    });
  });
  
  afterEach(() => {
    // Закриття сервера після кожного тесту
    if (server && server.close) {
      server.close();
    }
  });
  
  test('GET /healthz повертає 200 OK', async () => {
    const response = await request(server)
      .get('/healthz')
      .expect('Content-Type', /json/)
      .expect(200);
      
    expect(response.body).toHaveProperty('status', 'ok');
  });
  
  test('POST /sessions створює нову сесію', async () => {
    const response = await request(server)
      .post('/sessions')
      .send({})
      .expect('Content-Type', /json/)
      .expect(201);
      
    expect(response.body).toHaveProperty('sessionId');
    expect(response.body).toHaveProperty('expiresAt');
  });
  
  test('POST /messages додає нове повідомлення до сесії', async () => {
    // Спочатку створюємо сесію
    const sessionResponse = await request(server)
      .post('/sessions')
      .send({});
      
    const { sessionId } = sessionResponse.body;
    
    // Тепер додаємо повідомлення
    const response = await request(server)
      .post(`/sessions/${sessionId}/messages`)
      .send({
        role: 'user',
        content: 'Test message'
      })
      .expect(201);
      
    expect(response.body).toHaveProperty('id');
  });
});
