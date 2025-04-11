import { test, expect } from '@playwright/test';

test('Filtrar tareas completadas', async ({ page }) => {
  await page.goto('https://todomvc.com/examples/react/dist/#/');

  await page.locator('.new-todo').fill('Completada');
  await page.keyboard.press('Enter');
  await page.locator('.toggle').click();

  await page.locator('text=Completed').click();
  await expect(page.locator('.todo-list li')).toHaveCount(1);
});
