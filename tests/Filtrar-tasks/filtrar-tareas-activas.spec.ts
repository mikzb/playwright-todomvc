import { test, expect } from '@playwright/test';

test('Filtrar tareas activas', async ({ page }) => {
  await page.goto('https://todomvc.com/examples/react/dist/#/');

  await page.locator('.new-todo').fill('Activa');
  await page.keyboard.press('Enter');

  await page.locator('text=Active').click();
  await expect(page.locator('.todo-list li')).toHaveCount(1);
});
