import { test, expect } from '@playwright/test';

test('Filtrar tareas completadas', async ({ page }) => {
  await page.goto('https://todomvc.com/examples/react/dist/#/');

  // Crear una tarea
  await page.locator('.new-todo').fill('Completada');
  await page.keyboard.press('Enter');

  // Marcarla como completada
  await page.locator('.toggle').click();

  // Clic en filtro "Completed"
  await page.locator('footer >> a:has-text("Completed")').click();

  // Debería mostrarse la tarea completada
  await expect(page.locator('.todo-list li')).toHaveCount(1);
});

