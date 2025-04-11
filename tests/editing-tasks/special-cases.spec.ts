import { test, expect } from '@playwright/test';

test.describe('Special Editing Cases', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://todomvc.com/examples/react/dist/');
    await page.locator('header .new-todo').fill('Original task');
    await page.locator('header .new-todo').press('Enter');
  });

  test('should trim whitespace when editing', async ({ page }) => {
    // Double-click to enter edit mode
    await page.locator('.todo-list li').first().dblclick();
    
    // Edit with whitespace
    await page.locator('.todo-list li .new-todo').fill('   Edited task with spaces   ');
    await page.locator('.todo-list li .new-todo').press('Enter');
    
    // Verify whitespace is trimmed
    await expect(page.locator('.todo-list li').first()).toContainText('Edited task with spaces');
  });

  test('should handle special characters when editing', async ({ page }) => {
    const specialText = '!@#$%^&*()_+{}:"<>?[];\',./`~';
    
    // Double-click to enter edit mode
    await page.locator('.todo-list li').first().dblclick();
    
    // Edit with special characters
    await page.locator('.todo-list li .new-todo').fill(specialText);
    await page.locator('.todo-list li .new-todo').press('Enter');
    
    // Verify special characters are preserved
    await expect(page.locator('.todo-list li').first()).toContainText(specialText);
  });
});