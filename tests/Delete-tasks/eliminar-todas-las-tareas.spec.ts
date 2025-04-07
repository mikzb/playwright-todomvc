import { test, expect } from '@playwright/test';

test('Eliminar todas las tareas', async ({ page }) => {
  await page.goto('https://todomvc.com/examples/react/dist/#/');

  await page.locator('.new-todo').fill('Tarea 1');
  await page.keyboard.press('Enter');
  await page.locator('.new-todo').fill('Tarea 2');
  await page.keyboard.press('Enter');

  const tareas = page.locator('.todo-list li');
  const count = await tareas.count();

  for (let i = 0; i < count; i++) {
    const tarea = tareas.nth(0);
    await tarea.hover();
    await tarea.locator('.destroy').click();
  }

  await expect(tareas).toHaveCount(0);
});
