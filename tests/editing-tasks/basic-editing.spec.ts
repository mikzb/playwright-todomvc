import { test, expect } from '@playwright/test';

test.describe('Editing Tasks', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://todomvc.com/examples/react/dist/');
    await page.locator('.new-todo').fill('Original task');
    await page.locator('.new-todo').press('Enter');
  });

  test('should edit a task', async ({ page }) => {
    // Create a new task
    await page.locator('header .new-todo').fill('Original task');
    await page.locator('header .new-todo').press('Enter');
    
    // Double-click to enter edit mode - use first() to target only the first item
    await page.locator('.todo-list li').first().dblclick();
    // Alternatively: await page.getByTestId('todo-item').first().dblclick();
    
    // Edit the task
    await page.locator('.todo-list li .new-todo').fill('Edited task');
    await page.locator('.todo-list li .new-todo').press('Enter');
    
    // Check the result - verify the text content is updated
    await expect(page.locator('.todo-list li').first()).toContainText('Edited task');
  });

  test('should cancel edit on escape', async ({ page }) => {
    await page.locator('.todo-list li').dblclick();
    await page.locator('.todo-list li .edit').fill('This should not save');
    await page.locator('.todo-list li .edit').press('Escape');
    
    await expect(page.locator('.todo-list li label')).toHaveText('Original task');
  });

  test('should maintain completion status after edit', async ({ page }) => {
    // Mark task as complete
    await page.locator('.todo-list li .toggle').check();
    
    // Edit the task
    await page.locator('.todo-list li').dblclick();
    await page.locator('.todo-list li .edit').fill('Edited completed task');
    await page.locator('.todo-list li .edit').press('Enter');
    
    // Verify it's still completed
    await expect(page.locator('.todo-list li.completed')).toHaveCount(1);
  });
});