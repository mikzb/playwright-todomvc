import { test, expect } from '@playwright/test';

test.describe('Editing Tasks', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://todomvc.com/examples/react/dist/');
    await page.locator('header .new-todo').fill('Original task');
    await page.locator('header .new-todo').press('Enter');
  });

  test('should edit a task', async ({ page }) => {
    // Double-click to enter edit mode
    await page.locator('.todo-list li').first().dblclick();
    
    // Edit the task
    await page.locator('.todo-list li .new-todo').fill('Edited task');
    await page.locator('.todo-list li .new-todo').press('Enter');
    
    // Check the result
    await expect(page.locator('.todo-list li').first()).toContainText('Edited task');
  });

  test('should not save empty task after edit', async ({ page }) => {
    // Double-click to enter edit mode
    await page.locator('.todo-list li').first().dblclick();
    
    // Clear the input
    await page.locator('.todo-list li .new-todo').fill('');
    await page.locator('.todo-list li .new-todo').press('Enter');
    
    // Verify the task is removed
    await expect(page.locator('.todo-list li')).toHaveCount(0);
  });

  test('should cancel edit on escape', async ({ page }) => {
    // Double-click to enter edit mode
    await page.locator('.todo-list li').first().dblclick();
    
    // Try to edit but cancel
    await page.locator('.todo-list li .new-todo').fill('This should not save');
    await page.locator('.todo-list li .new-todo').press('Escape');
    
    // Verify original text is preserved
    await expect(page.locator('.todo-list li').first()).toContainText('Original task');
  });

  test('should maintain completion status after edit', async ({ page }) => {
    // Mark task as complete
    await page.locator('.todo-list li .toggle').first().check();
    
    // Edit the task
    await page.locator('.todo-list li').first().dblclick();
    await page.locator('.todo-list li .new-todo').fill('Edited completed task');
    await page.locator('.todo-list li .new-todo').press('Enter');
    
    // Verify it's still completed
    await expect(page.locator('.todo-list li.completed')).toHaveCount(1);
    await expect(page.locator('.todo-list li').first()).toContainText('Edited completed task');
  });
});