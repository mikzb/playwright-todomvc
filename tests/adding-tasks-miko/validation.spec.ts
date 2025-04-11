import { test, expect } from '@playwright/test';

test.describe('Task Input Validation', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://todomvc.com/examples/react/dist/');
  });

  test('no debería guardar tareas con 1 caracter', async ({ page }) => {
    await page.locator('.new-todo').fill('a');
    await page.locator('.new-todo').press('Enter');
    await expect(page.locator('.todo-list li')).toHaveCount(0);
  });

  test('deberia guardar tareas de 2 caracteres o mas', async ({ page }) => {
    await page.locator('.new-todo').fill('ab');
    await page.locator('.new-todo').press('Enter');
    await expect(page.locator('.todo-list li')).toHaveCount(1);
  });
});