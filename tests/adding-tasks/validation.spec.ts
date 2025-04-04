import { test, expect } from '@playwright/test';

test.describe('Task Input Validation', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://todomvc.com/examples/react/dist/');
  });

  test('should not allow single character tasks', async ({ page }) => {
    await page.locator('.new-todo').fill('a');
    await page.locator('.new-todo').press('Enter');
    await expect(page.locator('.todo-list li')).toHaveCount(0);
  });

  test('should allow tasks with 2+ characters', async ({ page }) => {
    await page.locator('.new-todo').fill('ab');
    await page.locator('.new-todo').press('Enter');
    await expect(page.locator('.todo-list li')).toHaveCount(1);
  });
});