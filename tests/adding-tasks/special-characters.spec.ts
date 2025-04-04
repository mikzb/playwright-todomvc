import { test, expect } from '@playwright/test';

test.describe('Special Character Handling', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://todomvc.com/examples/react/dist/');
  });

  const testCases = [
    { name: 'emojis', input: '🙂😀🚀' },
    { name: 'special characters', input: '!@#$%^&*()_+{}:"<>?[];\',./`~' },
    { name: 'currency symbols', input: '$, €, £, ¥, ₹' },
    { name: 'punctuation', input: '.,;:¿?¡!' },
    { name: 'accented characters', input: 'á, é, í, ó, ú, ñ, ü' },
    { name: 'code snippets', input: '<script>alert("test")</script>' },
    { name: 'long text', input: 'This is a very long task description that should test the limits of the input field' }
  ];

  for (const testCase of testCases) {
    test(`should handle ${testCase.name} correctly`, async ({ page }) => {
      await page.locator('.new-todo').fill(testCase.input);
      await page.locator('.new-todo').press('Enter');
      
      await expect(page.locator('.todo-list li label')).toHaveText(testCase.input);
    });
  }
});