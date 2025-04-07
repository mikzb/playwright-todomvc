import { test, expect } from '@playwright/test';

test('Eliminar una tarea duplicada', async ({ page }) => {
  await page.goto('https://todomvc.com/examples/react/dist/#/');

  // Crear dos tareas con el mismo nombre
  for (let i = 0; i < 2; i++) {
    await page.locator('.new-todo').fill('Duplicada');
    await page.keyboard.press('Enter');
  }

  // Eliminar solo una
  const tarea = page.locator('.todo-list li').first();
  await tarea.hover();
  await tarea.locator('.destroy').click();

  // Aún debería quedar una
  await expect(page.locator('.todo-list li')).toHaveCount(1);
});
