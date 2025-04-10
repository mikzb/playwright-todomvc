import { test, expect } from '@playwright/test';

test.describe('Special Editing Cases', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://todomvc.com/examples/react/dist/');
    await page.locator('.new-todo').fill('Original task');
    await page.locator('.new-todo').press('Enter');
  });

  test('should trim whitespace when editing', async ({ page }) => {
    await page.locator('.todo-list li').dblclick();
    await page.locator('.todo-list li .edit').fill('   Edited task with spaces   ');
    await page.locator('.todo-list li .edit').press('Enter');
    
    await expect(page.locator('.todo-list li label')).toHaveText('Edited task with spaces');
  });

  test('should handle special characters when editing', async ({ page }) => {
    const specialText = '!@#$%^&*()_+{}:"<>?[];\',./`~';
    await page.locator('.todo-list li').dblclick();
    await page.locator('.todo-list li .edit').fill(specialText);
    await page.locator('.todo-list li .edit').press('Enter');
    
    await expect(page.locator('.todo-list li label')).toHaveText(specialText);
  });
});