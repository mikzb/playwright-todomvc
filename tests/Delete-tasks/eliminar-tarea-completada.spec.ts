import { test, expect } from '@playwright/test';

test('Eliminar tarea completada con la cruz', async ({ page }) => {
  await page.goto('https://todomvc.com/examples/react/dist/#/');

  await page.locator('.new-todo').fill('Completada');
  await page.keyboard.press('Enter');
  await page.locator('.toggle').click();

  const tarea = page.locator('.todo-list li').first();
  await tarea.hover();
  await tarea.locator('.destroy').click();

  await expect(tarea).toHaveCount(0);
});
