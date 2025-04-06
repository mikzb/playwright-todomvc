import { test, expect } from '@playwright/test';

test('Eliminar tareas completadas', async ({ page }) => {
  await page.goto('https://todomvc.com/examples/react/dist/#/');

  await page.locator('.new-todo').fill('Tarea completada');
  await page.keyboard.press('Enter');
  await page.locator('.toggle').click(); // marcar como completada

  await page.locator('.clear-completed').click(); // eliminar completadas

  await expect(page.locator('.todo-list li')).toHaveCount(0);
});
