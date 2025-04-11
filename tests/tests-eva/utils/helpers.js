async function navigateToTodoMVC(page) {
  await page.goto('https://todomvc.com/examples/react/dist/#/');
}

/**
 * Adds a new task to the todo list
 * @param {Page} page - Playwright page object
 * @param {string} taskName - Name of the task to add
 */
async function addTask(page, taskName) {
  await page.fill('[data-testid="text-input"]', taskName);
  await page.press('[data-testid="text-input"]', 'Enter');
  // Wait for the task to appear in the list
  await page.waitForSelector(`[data-testid="todo-item-label"]:has-text("${taskName}")`);
}

/**
 * Toggles the completion state of a task
 * @param {Page} page - Playwright page object
 * @param {string} taskName - Name of the task to toggle
 * @param {number} index - Index of the task (0-based) if multiple tasks have the same name
 */
async function toggleTask(page, taskName, index = 0) {
  // Find all todo items with the matching label text
  const toggleCheckbox = await page.locator('[data-testid="todo-item"]')
    .filter({ hasText: taskName })
    .nth(index)
    .locator('[data-testid="todo-item-toggle"]');
  
  await toggleCheckbox.click();
  // Wait for the UI to update
  await page.waitForTimeout(300);
}

/**
 * Checks if a task is marked as completed
 * @param {Page} page - Playwright page object
 * @param {string} taskName - Name of the task to check
 * @param {number} index - Index of the task (0-based) if multiple tasks have the same name
 * @returns {Promise<boolean>} - True if task is completed, false otherwise
 */
async function checkTaskCompletion(page, taskName, index = 0) {
  const todoItem = await page.locator('[data-testid="todo-item"]')
    .filter({ hasText: taskName })
    .nth(index);
  
  return await todoItem.evaluate(element => element.classList.contains('completed'));
}

/**
 * Toggles all tasks in the list
 * @param {Page} page - Playwright page object
 */
async function toggleAllTasks(page) {
  await page.click('[data-testid="toggle-all"]');
  // Wait for the UI to update
  await page.waitForTimeout(300);
}

module.exports = { 
  navigateToTodoMVC, 
  addTask, 
  toggleTask, 
  checkTaskCompletion, 
  toggleAllTasks 
};