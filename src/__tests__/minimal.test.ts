// src/__tests__/minimal.test.ts
import { expect, test } from '@jest/globals';

/**
 * Найпростіший тест, який завжди проходить успішно.
 * Використовуйте його для перевірки, чи працює тестове середовище правильно.
 */
test('Базовий тест проходить успішно', () => {
  expect(true).toBe(true);
});

/**
 * Асинхронний тест з обробкою помилок
 */
test('Асинхронний тест працює правильно', async () => {
  // Функція, яка асинхронно повертає значення
  const asyncFunction = async () => {
    return 'result';
  };
  
  try {
    const result = await asyncFunction();
    expect(result).toBe('result');
  } catch (error) {
    console.error('Помилка в асинхронному тесті:', error);
    throw error;
  }
});

/**
 * Простий тест для демонстрації моків
 */
test('Моки працюють правильно', () => {
  // Створюємо мок-функцію
  const mockFn = jest.fn().mockReturnValue(42);
  
  // Викликаємо мок-функцію
  const result = mockFn();
  
  // Перевіряємо, що функція була викликана і повернула правильне значення
  expect(mockFn).toHaveBeenCalled();
  expect(result).toBe(42);
});

/**
 * Тест для перевірки роботи з Promise
 */
test('Promise обробляються правильно', async () => {
  // Створюємо Promise, який вирішується успішно
  const successPromise = Promise.resolve('success');
  
  // Створюємо Promise, який відхиляється
  const failurePromise = Promise.reject(new Error('failure'));
  
  // Перевіряємо успішний Promise
  await expect(successPromise).resolves.toBe('success');
  
  // Перевіряємо Promise, який відхиляється
  await expect(failurePromise).rejects.toThrow('failure');
});
