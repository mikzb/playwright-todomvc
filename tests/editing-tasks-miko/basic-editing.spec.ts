import { test, expect } from '@playwright/test';

test.describe('Editing Tasks', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://todomvc.com/examples/react/dist/');
    await page.locator('header .new-todo').fill('Original task');
    await page.locator('header .new-todo').press('Enter');
  });

  test('deberia editar una tarea', async ({ page }) => {
    // Double-click to enter edit mode
    await page.locator('.todo-list li').first().dblclick();
    
    // Edit the task
    await page.locator('.todo-list li .new-todo').fill('Edited task');
    await page.locator('.todo-list li .new-todo').press('Enter');
    
    // Check the result
    await expect(page.locator('.todo-list li').first()).toContainText('Edited task');
  });

  test('deberia no guardar una tarea vacia o de un caracter al editar', async ({ page }) => {
    // Double-click to enter edit mode
    await page.locator('.todo-list li').first().dblclick();
    
    // Store the original value for later comparison
    const originalValue = await page.locator('.todo-list li .new-todo').inputValue();
    
    // Clear the input
    await page.locator('.todo-list li .new-todo').fill('');
    await page.locator('.todo-list li .new-todo').press('Enter');
    
    // Verify the task is still in edit mode (input field still exists)
    await expect(page.locator('.todo-list li .new-todo')).toBeVisible();
    
    // Verify the input is still empty
    await expect(page.locator('.todo-list li .new-todo')).toHaveValue('');
    
    // Similarly, test with a single character
    await page.locator('.todo-list li .new-todo').fill('a');
    await page.locator('.todo-list li .new-todo').press('Enter');
    
    // Verify the task is still in edit mode
    await expect(page.locator('.todo-list li .new-todo')).toBeVisible();
    
    // Verify the input has the single character
    await expect(page.locator('.todo-list li .new-todo')).toHaveValue('a');
    
    // click out of the input field to exit editing mode
    await page.getByRole('heading', { name: 'todos' }).click();

    await expect(page.locator('.todo-list li label')).toHaveText('Original task');
  });


  test('deberia cancelar la edicion al hacer clic fuera del cuadro', async ({ page }) => {
    await page.goto('https://todomvc.com/examples/react/dist/');
    await page.getByTestId('text-input').fill('Original task');
    await page.getByTestId('text-input').press('Enter');
    await page.getByTestId('todo-item-label').dblclick();
    await page.getByTestId('todo-item').getByTestId('text-input').fill('Original task this should not show');
    await page.getByRole('heading', { name: 'todos' }).click();

    await expect(page.locator('.todo-list li label')).toHaveText('Original task');
  });

  test('deberia mantener el estado de complecion tras editar', async ({ page }) => {
    // Mark task as complete
    await page.locator('.todo-list li .toggle').first().check();
    
    // Edit the task
    await page.locator('.todo-list li').first().dblclick();
    await page.locator('.todo-list li .new-todo').fill('Edited completed task');
    await page.locator('.todo-list li .new-todo').press('Enter');
    
    // Verify it's still completed
    await expect(page.locator('.todo-list li.completed')).toHaveCount(1);
    await expect(page.locator('.todo-list li').first()).toContainText('Edited completed task');
  });
});