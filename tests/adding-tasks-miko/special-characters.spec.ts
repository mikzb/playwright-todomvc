import { test, expect } from '@playwright/test';

test.describe('Special Character Handling', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://todomvc.com/examples/react/dist/');
  });

  const testCases = [
    { name: 'emojis', input: '🙂😀🚀' },
    { name: 'caracteres especiales comunes', input: '!@#$%^&*()_+{}:"<>?[];\',./`~' },
    { name: 'símbolos de divisas', input: '$, €, £, ¥, ₹' },
    { name: 'signos de puntuación', input: '.,;:¿?¡!' },
    { name: 'caracteres con tíldes', input: 'á, é, í, ó, ú, ñ, ü' },
    { name: 'trozos de código', input: '<script>alert("test")</script>' },
    { name: 'texto largo', input: 'This is a very long task description that should test the limits of the input field' }
  ];

  for (const testCase of testCases) {
    test(`deberia manejar ${testCase.name} correctamente`, async ({ page }) => {
      await page.locator('.new-todo').fill(testCase.input);
      await page.locator('.new-todo').press('Enter');
      
      await expect(page.locator('.todo-list li label')).toHaveText(testCase.input);
    });
  }
});