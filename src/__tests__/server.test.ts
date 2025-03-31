// src/__tests__/server.test.ts
import { getMockReqRes } from '@jest-mock/express';
import { expect, jest, test } from '@jest/globals';

// Мокуємо модуль express
jest.mock('express', () => {
  const mockExpress = jest.fn(() => ({
    use: jest.fn(),
    get: jest.fn(),
    post: jest.fn(),
    listen: jest.fn(() => ({ close: jest.fn() })),
  }));
  
  mockExpress.json = jest.fn();
  mockExpress.urlencoded = jest.fn();
  mockExpress.Router = jest.fn(() => ({
    use: jest.fn(),
    get: jest.fn(),
    post: jest.fn(),
  }));
  
  return mockExpress;
});

// Імпортуємо сервер після моків для коректного тестування
import { createServer } from '../server.js';

describe('MCP Server', () => {
  // Очищуємо моки перед кожним тестом
  beforeEach(() => {
    jest.clearAllMocks();
  });
  
  test('createServer повертає екземпляр сервера', () => {
    const server = createServer({
      port: 3000
    });
    
    expect(server).toBeDefined();
  });

  test('Сервер обробляє запит healthz', async () => {
    // Створюємо мок для req і res
    const { req, res } = getMockReqRes();
    
    // Налаштовуємо мок для JSON відповіді
    res.json = jest.fn();
    res.status = jest.fn().mockReturnValue(res);
    
    // Отримуємо обробник маршруту healthz
    const server = createServer({ port: 3000 });
    
    // Знаходимо правильний обробник для маршруту healthz
    const expressInstance = require('express')();
    const healthzHandler = expressInstance.get.mock.calls.find(
      call => call[0] === '/healthz'
    )?.[1];
    
    if (healthzHandler) {
      // Викликаємо обробник з моками req і res
      await healthzHandler(req, res);
      
      // Перевіряємо, що був повернутий статус 200
      expect(res.status).toHaveBeenCalledWith(200);
      // Перевіряємо, що була повернута правильна відповідь
      expect(res.json).toHaveBeenCalledWith({ status: 'ok' });
    } else {
      fail('Обробник для маршруту /healthz не знайдено');
    }
  });
});
