import { MCPClient } from '../client.js'; // Адаптуйте шлях відповідно до структури проекту

// Мокуємо fetch для тестів
global.fetch = jest.fn() as jest.Mock;

describe('MCP Client', () => {
  let client: MCPClient;
  
  beforeEach(() => {
    jest.clearAllMocks();
    // Адаптуйте параметри конструктора відповідно до вашого клієнта
    client = new MCPClient({
      baseUrl: 'https://api.example.com',
      token: 'test-token'
    });
  });

  test('Клієнт правильно ініціалізується', () => {
    expect(client).toBeDefined();
    // Перевірка доступності основних методів
    expect(typeof client.createSession).toBe('function');
  });

  test('createSession формує правильний запит', async () => {
    // Мок успішної відповіді
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      headers: new Headers({ 'content-type': 'application/json' }),
      json: async () => ({ 
        sessionId: 'test-session-id',
        expiresAt: new Date(Date.now() + 3600000).toISOString()
      })
    });

    // Виклик методу API
    const session = await client.createSession();
    
    // Перевірка результату
    expect(session).toHaveProperty('sessionId', 'test-session-id');
    
    // Перевірка, чи правильно був викликаний fetch
    expect(fetch).toHaveBeenCalledWith(
      expect.stringContaining('/sessions'),
      expect.objectContaining({
        method: 'POST',
        headers: expect.objectContaining({
          'Authorization': expect.stringContaining('test-token')
        })
      })
    );
  });

  test('Клієнт обробляє помилки API', async () => {
    // Мок помилки
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      status: 401,
      statusText: 'Unauthorized',
      json: async () => ({ error: 'Invalid authentication credentials' })
    });

    // Перевірка, що клієнт правильно обробляє помилки
    await expect(client.createSession()).rejects.toThrow();
  });
});
