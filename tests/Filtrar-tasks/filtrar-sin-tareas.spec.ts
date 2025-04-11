import { test, expect } from '@playwright/test';

test('Aplicar filtros sin tareas', async ({ page }) => {
  await page.goto('https://todomvc.com/examples/react/dist/#/');

  await page.locator('text=Active').click();
  await expect(page.locator('.todo-list li')).toHaveCount(0);
});
