import { test, expect } from '@playwright/test';

test.describe('Adding Tasks', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://todomvc.com/examples/react/dist/');
  });

  test('should add a single task', async ({ page }) => {
    await page.locator('.new-todo').fill('Buy milk');
    await page.locator('.new-todo').press('Enter');
    
    await expect(page.locator('.todo-list li')).toHaveCount(1);
    await expect(page.locator('.todo-list li label')).toHaveText('Buy milk');
  });

  test('should add multiple tasks', async ({ page }) => {
    await page.locator('.new-todo').fill('Task 1');
    await page.locator('.new-todo').press('Enter');
    await page.locator('.new-todo').fill('Task 2');
    await page.locator('.new-todo').press('Enter');
    
    await expect(page.locator('.todo-list li')).toHaveCount(2);
  });

  test('should not add empty task', async ({ page }) => {
    await page.locator('.new-todo').press('Enter');
    await expect(page.locator('.todo-list li')).toHaveCount(0);
  });

  test('should trim whitespace from task', async ({ page }) => {
    await page.locator('.new-todo').fill('   Buy eggs   ');
    await page.locator('.new-todo').press('Enter');
    
    await expect(page.locator('.todo-list li label')).toHaveText('Buy eggs');
  });

  test('should allow duplicate tasks', async ({ page }) => {
    await page.locator('.new-todo').fill('Duplicate');
    await page.locator('.new-todo').press('Enter');
    await page.locator('.new-todo').fill('Duplicate');
    await page.locator('.new-todo').press('Enter');
    
    await expect(page.locator('.todo-list li')).toHaveCount(2);
    await expect(page.locator('.todo-list li:nth-child(1) label')).toHaveText('Duplicate');
    await expect(page.locator('.todo-list li:nth-child(2) label')).toHaveText('Duplicate');
  });
});