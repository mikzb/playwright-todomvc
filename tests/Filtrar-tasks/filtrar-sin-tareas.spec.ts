import { test, expect } from '@playwright/test';

test('Aplicar filtros sin tareas', async ({ page }) => {
  await page.goto('https://todomvc.com/examples/react/dist/#/');

  // Clic en filtro "Active"
  await page.locator('a:has-text("Active")').first().click();
  await expect(page.locator('.todo-list li')).toHaveCount(0);

  // Clic en filtro "Completed"
  await page.locator('a:has-text("Completed")').first().click();
  await expect(page.locator('.todo-list li')).toHaveCount(0);
});
