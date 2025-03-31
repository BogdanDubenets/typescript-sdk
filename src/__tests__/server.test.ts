import { expect, test, jest, describe, beforeEach } from '@jest/globals';
import { Server } from '../server/server.js';
import { Implementation } from '../types.js';

describe('Server class tests', () => {
  let server: Server;
  const mockServerInfo: Implementation = {
    name: 'TestServer',
    version: '1.0.0',
  };

  beforeEach(() => {
    server = new Server(mockServerInfo);
  });

  test('Server має бути успішно створений', () => {
    expect(server).toBeDefined();
    expect(server).toBeInstanceOf(Server);
  });

  test('Server має правильні методи', () => {
    expect(typeof server.ping).toBe('function');
    expect(typeof server.createMessage).toBe('function');
    expect(typeof server.listRoots).toBe('function');
    expect(typeof server.sendLoggingMessage).toBe('function');
    expect(typeof server.sendResourceUpdated).toBe('function');
    expect(typeof server.sendResourceListChanged).toBe('function');
    expect(typeof server.sendToolListChanged).toBe('function');
    expect(typeof server.sendPromptListChanged).toBe('function');
  });

  test('Server може реєструвати можливості', () => {
    // Перевіряємо, що не викидається помилка при реєстрації можливостей
    expect(() => {
      server.registerCapabilities({
        logging: true,
        tools: true,
      });
    }).not.toThrow();
  });

  test('getClientCapabilities має повертати undefined до ініціалізації', () => {
    expect(server.getClientCapabilities()).toBeUndefined();
  });

  test('getClientVersion має повертати undefined до ініціалізації', () => {
    expect(server.getClientVersion()).toBeUndefined();
  });
});
