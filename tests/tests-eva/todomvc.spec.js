const { test, expect } = require('@playwright/test');
const { navigateToTodoMVC, addTask, toggleTask, checkTaskCompletion, toggleAllTasks } = require('./utils/helpers');

test.describe('Marcar/Desmarcar Tareas', () => {
  test('Activar el tick de la tarea para marcarla como completada', async ({ page }) => {
    await navigateToTodoMVC(page);
    await addTask(page, 'Nueva tarea');
    await toggleTask(page, 'Nueva tarea');
    const isCompleted = await checkTaskCompletion(page, 'Nueva tarea');
    expect(isCompleted).toBe(true);
  });

  test('Desactivar el tick de la tarea para marcarla como activa', async ({ page }) => {
    await navigateToTodoMVC(page);
    await addTask(page, 'Nueva tarea');
    await toggleTask(page, 'Nueva tarea');
    await toggleTask(page, 'Nueva tarea');
    const isCompleted = await checkTaskCompletion(page, 'Nueva tarea');
    expect(isCompleted).toBe(false);
  });

  test('Clicar en la flecha hacia abajo para marcar todas las tareas como completadas', async ({ page }) => {
    await navigateToTodoMVC(page);
    await addTask(page, 'Tarea 1');
    await addTask(page, 'Tarea 2');
    await toggleAllTasks(page);
    const isCompleted1 = await checkTaskCompletion(page, 'Tarea 1');
    const isCompleted2 = await checkTaskCompletion(page, 'Tarea 2');
    expect(isCompleted1).toBe(true);
    expect(isCompleted2).toBe(true);
  });

  test('Intentar marcar como completada una tarea con caracteres especiales', async ({ page }) => {
    await navigateToTodoMVC(page);
    await addTask(page, 'Tarea con @#!');
    await toggleTask(page, 'Tarea con @#!');
    const isCompleted = await checkTaskCompletion(page, 'Tarea con @#!');
    expect(isCompleted).toBe(true);
  });
});

test.describe('Completar Tareas', () => {
  test('Completar una tarea es válido', async ({ page }) => {
    await navigateToTodoMVC(page);
    await addTask(page, 'Tarea 1');
    await toggleTask(page, 'Tarea 1');
    const isCompleted = await checkTaskCompletion(page, 'Tarea 1');
    expect(isCompleted).toBe(true);
  });

  test('Completar múltiples tareas es válido', async ({ page }) => {
    await navigateToTodoMVC(page);
    await addTask(page, 'Tarea 1');
    await addTask(page, 'Tarea 2');
    await toggleTask(page, 'Tarea 1');
    await toggleTask(page, 'Tarea 2');
    const isCompleted1 = await checkTaskCompletion(page, 'Tarea 1');
    const isCompleted2 = await checkTaskCompletion(page, 'Tarea 2');
    expect(isCompleted1).toBe(true);
    expect(isCompleted2).toBe(true);
  });

  test('Completar todas las tareas es válido', async ({ page }) => {
    await navigateToTodoMVC(page);
    await addTask(page, 'Tarea 1');
    await addTask(page, 'Tarea 2');
    await toggleAllTasks(page);
    const isCompleted1 = await checkTaskCompletion(page, 'Tarea 1');
    const isCompleted2 = await checkTaskCompletion(page, 'Tarea 2');
    expect(isCompleted1).toBe(true);
    expect(isCompleted2).toBe(true);
  });

  test('Completar tarea con duplicado completado no modifica el duplicado', async ({ page }) => {
    await navigateToTodoMVC(page);
    await addTask(page, 'Tarea duplicada');
    await addTask(page, 'Tarea duplicada');
    await toggleTask(page, 'Tarea duplicada', 1);
    const isCompleted1 = await checkTaskCompletion(page, 'Tarea duplicada', 1);
    const isCompleted2 = await checkTaskCompletion(page, 'Tarea duplicada', 2);
    expect(isCompleted1).toBe(true);
    expect(isCompleted2).toBe(false);
  });

  test('Completar tarea con duplicado sin completar no modifica el duplicado', async ({ page }) => {
    await navigateToTodoMVC(page);
    await addTask(page, 'Tarea duplicada');
    await addTask(page, 'Tarea duplicada');
    await toggleTask(page, 'Tarea duplicada', 1);
    const isCompleted1 = await checkTaskCompletion(page, 'Tarea duplicada', 1);
    const isCompleted2 = await checkTaskCompletion(page, 'Tarea duplicada', 2);
    expect(isCompleted1).toBe(true);
    expect(isCompleted2).toBe(false);
  });
});

test.describe('Desmarcar Tareas', () => {
  test('Desmarcar una tarea es válido', async ({ page }) => {
    await navigateToTodoMVC(page);
    await addTask(page, 'Tarea 1');
    await toggleTask(page, 'Tarea 1');
    await toggleTask(page, 'Tarea 1');
    const isCompleted = await checkTaskCompletion(page, 'Tarea 1');
    expect(isCompleted).toBe(false);
  });

  test('Desmarcar múltiples tareas es válido', async ({ page }) => {
    await navigateToTodoMVC(page);
    await addTask(page, 'Tarea 1');
    await addTask(page, 'Tarea 2');
    await toggleTask(page, 'Tarea 1');
    await toggleTask(page, 'Tarea 2');
    await toggleTask(page, 'Tarea 1');
    await toggleTask(page, 'Tarea 2');
    const isCompleted1 = await checkTaskCompletion(page, 'Tarea 1');
    const isCompleted2 = await checkTaskCompletion(page, 'Tarea 2');
    expect(isCompleted1).toBe(false);
    expect(isCompleted2).toBe(false);
  });

  test('Desmarcar todas las tareas es válido', async ({ page }) => {
    await navigateToTodoMVC(page);
    await addTask(page, 'Tarea 1');
    await addTask(page, 'Tarea 2');
    await toggleAllTasks(page);
    await toggleAllTasks(page);
    const isCompleted1 = await checkTaskCompletion(page, 'Tarea 1');
    const isCompleted2 = await checkTaskCompletion(page, 'Tarea 2');
    expect(isCompleted1).toBe(false);
    expect(isCompleted2).toBe(false);
  });

  test('Desmarcar tarea con duplicado sin completar no modifica el duplicado', async ({ page }) => {
    await navigateToTodoMVC(page);
    await addTask(page, 'Tarea duplicada');
    await addTask(page, 'Tarea duplicada');
    await toggleTask(page, 'Tarea duplicada', 1);
    await toggleTask(page, 'Tarea duplicada', 1);
    const isCompleted1 = await checkTaskCompletion(page, 'Tarea duplicada', 1);
    const isCompleted2 = await checkTaskCompletion(page, 'Tarea duplicada', 2);
    expect(isCompleted1).toBe(false);
    expect(isCompleted2).toBe(false);
  });

  test('Desmarcar tarea con duplicado completado no modifica el duplicado', async ({ page }) => {
    await navigateToTodoMVC(page);
    await addTask(page, 'Tarea duplicada');
    await addTask(page, 'Tarea duplicada');
    await toggleTask(page, 'Tarea duplicada', 1);
    await toggleTask(page, 'Tarea duplicada', 1);
    const isCompleted1 = await checkTaskCompletion(page, 'Tarea duplicada', 1);
    const isCompleted2 = await checkTaskCompletion(page, 'Tarea duplicada', 2);
    expect(isCompleted1).toBe(false);
    expect(isCompleted2).toBe(false);
  });
});

test.describe('Seleccionar Todas las Tareas', () => {
  test('Seleccionar todas las tareas cuando no hay ninguna tarea completada', async ({ page }) => {
    await navigateToTodoMVC(page);
    await addTask(page, 'Tarea 1');
    await addTask(page, 'Tarea 2');
    await toggleAllTasks(page);
    const isCompleted1 = await checkTaskCompletion(page, 'Tarea 1');
    const isCompleted2 = await checkTaskCompletion(page, 'Tarea 2');
    expect(isCompleted1).toBe(true);
    expect(isCompleted2).toBe(true);
  });

  test('Seleccionar todas las tareas cuando todas las tareas están seleccionadas', async ({ page }) => {
    await navigateToTodoMVC(page);
    await addTask(page, 'Tarea 1');
    await addTask(page, 'Tarea 2');
    await toggleAllTasks(page);
    await toggleAllTasks(page);
    const isCompleted1 = await checkTaskCompletion(page, 'Tarea 1');
    const isCompleted2 = await checkTaskCompletion(page, 'Tarea 2');
    expect(isCompleted1).toBe(false);
    expect(isCompleted2).toBe(false);
  });

  test('Seleccionar todas las tareas cuando una sola tarea está completada', async ({ page }) => {
    await navigateToTodoMVC(page);
    await addTask(page, 'Tarea 1');
    await addTask(page, 'Tarea 2');
    await toggleTask(page, 'Tarea 1');
    await toggleAllTasks(page);
    const isCompleted1 = await checkTaskCompletion(page, 'Tarea 1');
    const isCompleted2 = await checkTaskCompletion(page, 'Tarea 2');
    expect(isCompleted1).toBe(true);
    expect(isCompleted2).toBe(true);
  });

  test('Seleccionar todas las tareas cuando hay algunas tareas completadas', async ({ page }) => {
    await navigateToTodoMVC(page);
    await addTask(page, 'Tarea 1');
    await addTask(page, 'Tarea 2');
    await toggleTask(page, 'Tarea 1');
    await toggleAllTasks(page);
    const isCompleted1 = await checkTaskCompletion(page, 'Tarea 1');
    const isCompleted2 = await checkTaskCompletion(page, 'Tarea 2');
    expect(isCompleted1).toBe(true);
    expect(isCompleted2).toBe(true);
  });

  test('Seleccionar todas las tareas cuando todas menos una tarea están completadas', async ({ page }) => {
    await navigateToTodoMVC(page);
    await addTask(page, 'Tarea 1');
    await addTask(page, 'Tarea 2');
    await toggleTask(page, 'Tarea 1');
    await toggleAllTasks(page);
    const isCompleted1 = await checkTaskCompletion(page, 'Tarea 1');
    const isCompleted2 = await checkTaskCompletion(page, 'Tarea 2');
    expect(isCompleted1).toBe(true);
    expect(isCompleted2).toBe(true);
  });
});

test.describe('Verificación de Enlaces y Recursos', () => {
  test('Probar que el enlace "Quick Start" funcione', async ({ page }) => {
    await navigateToTodoMVC(page);
    await page.click('text=Quick Start');
    await expect(page).toHaveURL('https://react.dev/learn');
  });

  test('Probar que el enlace "API Reference" funcione', async ({ page }) => {
    await navigateToTodoMVC(page);
    await page.click('text=API Reference');
    await expect(page).toHaveURL('https://react.dev/reference/react');
  });

  test('Probar que el enlace "Philosophy" funcione', async ({ page }) => {
    await navigateToTodoMVC(page);
    await page.click('text=Philosophy');
    await expect(page).toHaveURL('https://petehuntsposts.quora.com/React-Under-the-Hood');
  });

  test('Probar que el enlace "React Community" funcione', async ({ page }) => {
    await navigateToTodoMVC(page);
    await page.click('text=React Community');
    await expect(page).toHaveURL('https://react.dev/community');
  });

  test('Comprobar que el primer enlace a Source funciona correctamente', async ({ page }) => {
    await navigateToTodoMVC(page);
    await page.click('text=Source');
    await expect(page).toHaveURL('https://github.com/tastejs/todomvc/tree/gh-pages/examples/react');
  });

  test('Comprobar que el segundo enlace a Source funciona correctamente', async ({ page }) => {
    await navigateToTodoMVC(page);
    const [secondSourceLink] = await page.locator('text=Source').elementHandles();
    await secondSourceLink.click();
    await expect(page).toHaveURL('https://github.com/tastejs/todomvc/tree/gh-pages/examples/react');
  });

  test('Comprobar que el enlace a Demo funciona correctamente', async ({ page }) => {
    await navigateToTodoMVC(page);
    await page.click('text=Demo');
    await expect(page).toHaveURL('https://todomvc.com/examples/typescript-react/#/');
  });

  test('Comprobar que el enlace a React funciona correctamente', async ({ page }) => {
    await navigateToTodoMVC(page);
    await page.click('text=React');
    await expect(page).toHaveURL('https://react.dev/');
  });

  test('Comprobar que el enlace a "let us know" funciona correctamente', async ({ page }) => {
    await navigateToTodoMVC(page);
    await page.click('text=let us know');
    await expect(page).toHaveURL('https://github.com/tastejs/todomvc/issues');
  });
});

