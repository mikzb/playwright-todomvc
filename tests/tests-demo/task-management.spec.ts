import { test, expect } from '@playwright/test';

test.describe('Task Management', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://todomvc.com/examples/react/dist/#/');
  });

  test('should add a new todo', async ({ page }) => {
    await page.locator('.new-todo').fill('New Task');
    await page.locator('.new-todo').press('Enter');
    await expect(page.locator('.todo-list li')).toHaveCount(1);
    await expect(page.locator('.todo-list li label')).toHaveText('New Task');
  });

  test('should mark a todo as completed', async ({ page }) => {
    await page.locator('.new-todo').fill('Task to Complete');
    await page.locator('.new-todo').press('Enter');
    await page.locator('.toggle').click();
    await expect(page.locator('.todo-list li.completed')).toHaveCount(1);
  });

  test('should delete a todo', async ({ page }) => {
    await page.locator('.new-todo').fill('Task to Delete');
    await page.locator('.new-todo').press('Enter');
    const task = page.locator('.todo-list li').first();
    await task.hover();
    await task.locator('.destroy').click();
    await expect(page.locator('.todo-list li')).toHaveCount(0);
  });

  test('should filter by active todos', async ({ page }) => {
    await page.locator('.new-todo').fill('Active Task');
    await page.locator('.new-todo').press('Enter');
    await page.locator('.new-todo').fill('Completed Task');
    await page.locator('.new-todo').press('Enter');
    await page.locator('.todo-list li .toggle').nth(1).click(); // Mark second task as completed
    await page.locator('a:has-text("Active")').click();
    await expect(page.locator('.todo-list li')).toHaveCount(1);
    await expect(page.locator('.todo-list li label')).toHaveText('Active Task');
  });

  test('should filter by completed todos', async ({ page }) => {
    await page.locator('.new-todo').fill('Active Task');
    await page.locator('.new-todo').press('Enter');
    await page.locator('.new-todo').fill('Completed Task');
    await page.locator('.new-todo').press('Enter');
    await page.locator('.todo-list li .toggle').nth(1).click(); // Mark second task as completed
    await page.locator('a:has-text("Completed")').click();
    await expect(page.locator('.todo-list li')).toHaveCount(1);
    await expect(page.locator('.todo-list li label')).toHaveText('Completed Task');
  });
});
