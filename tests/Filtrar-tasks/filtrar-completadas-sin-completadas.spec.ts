import { test, expect } from '@playwright/test';

test('Filtrar completadas sin tareas completadas', async ({ page }) => {
  await page.goto('https://todomvc.com/examples/react/dist/#/');

  // Crear una tarea activa
  await page.locator('.new-todo').fill('Activa');
  await page.keyboard.press('Enter');

  // Hacer clic en el filtro 'Completed'
  await page.locator('footer >> a:has-text("Completed")').click();

  // No debería haber tareas completadas visibles
  await expect(page.locator('.todo-list li')).toHaveCount(0);
});
