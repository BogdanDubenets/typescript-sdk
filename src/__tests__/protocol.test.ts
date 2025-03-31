import { validateSchema, MCPMessage } from '../protocol.js'; // Адаптуйте шлях відповідно до структури проекту

describe('MCP Protocol', () => {
  test('validateSchema перевіряє повідомлення правильно', () => {
    // Валідне повідомлення
    const validMessage: MCPMessage = {
      role: 'user',
      content: 'Hello, world!',
      name: 'tester'
    };
    
    expect(() => validateSchema(validMessage)).not.toThrow();
    
    // Невалідне повідомлення (відсутнє обов'язкове поле)
    const invalidMessage = {
      role: 'user',
      // Відсутнє поле content
      name: 'tester'
    };
    
    expect(() => validateSchema(invalidMessage as any)).toThrow();
  });
  
  test('Обробка спеціальних типів повідомлень', () => {
    // Тест для функціональних викликів або інших спеціальних типів
    const functionCallMessage: MCPMessage = {
      role: 'assistant',
      content: '',
      function_calls: [{
        name: 'test_function',
        parameters: { param1: 'value1' }
      }]
    };
    
    expect(() => validateSchema(functionCallMessage)).not.toThrow();
  });
});
