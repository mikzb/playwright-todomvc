import { test, expect } from '@playwright/test';

test('Eliminar una tarea', async ({ page }) => {
  await page.goto('https://todomvc.com/examples/react/dist/#/');
  await page.locator('.new-todo').fill('Tarea a eliminar');
  await page.keyboard.press('Enter');

  const tarea = page.locator('.todo-list li').first();
  await tarea.hover();
  await tarea.locator('.destroy').click();
  await expect(tarea).toHaveCount(0);
});
