// src/__tests__/client.test.ts
import { expect, jest, test } from '@jest/globals';

// Мокуємо глобальний fetch
const mockFetch = jest.fn();
global.fetch = mockFetch;

// Мокуємо генерацію PKCE challenge
jest.mock('pkce-challenge', () => ({
  __esModule: true,
  default: jest.fn().mockReturnValue({
    code_challenge: 'test_challenge',
    code_verifier: 'test_verifier'
  })
}));

// Імпортуємо клієнта після моків
import { MCPClient } from '../client.js';

describe('MCP Client', () => {
  let client: MCPClient;
  
  beforeEach(() => {
    jest.clearAllMocks();
    
    // Створюємо екземпляр клієнта для кожного тесту
    client = new MCPClient({
      baseUrl: 'https://api.example.com',
      apiKey: 'test-api-key'
    });
  });
  
  test('Клієнт правильно ініціалізується', () => {
    expect(client).toBeDefined();
    expect(client.baseUrl).toBe('https://api.example.com');
  });
  
  test('createSession формує правильний запит', async () => {
    // Налаштовуємо мок для успішної відповіді
    const mockResponse = {
      ok: true,
      headers: new Headers({
        'content-type': 'application/json'
      }),
      json: jest.fn().mockResolvedValue({
        session_id: 'test-session-id',
        expires_at: new Date(Date.now() + 3600000).toISOString()
      })
    };
    
    mockFetch.mockResolvedValueOnce(mockResponse);
    
    // Викликаємо метод, який тестуємо
    const result = await client.createSession();
    
    // Перевіряємо, що fetch був викликаний з правильними параметрами
    expect(mockFetch).toHaveBeenCalledWith(
      'https://api.example.com/sessions',
      expect.objectContaining({
        method: 'POST',
        headers: expect.objectContaining({
          'Authorization': expect.stringMatching(/^Bearer test-api-key$/),
          'Content-Type': 'application/json'
        })
      })
    );
    
    // Перевіряємо результат
    expect(result).toEqual({
      sessionId: 'test-session-id',
      expiresAt: expect.any(String)
    });
  });
  
  test('Клієнт правильно обробляє помилки', async () => {
    // Налаштовуємо мок для помилкової відповіді
    const errorResponse = {
      ok: false,
      status: 401,
      statusText: 'Unauthorized',
      json: jest.fn().mockResolvedValue({
        error: 'Invalid authentication credentials'
      })
    };
    
    mockFetch.mockResolvedValueOnce(errorResponse);
    
    // Перевіряємо, що метод виклине помилку
    await expect(client.createSession()).rejects.toThrow();
  });
});
