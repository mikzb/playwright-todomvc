async function navigateToTodoMVC(page) {
    await page.goto('https://todomvc.com/examples/react/dist/#/');
  }
  
  async function addTask(page, taskName) {
    await page.fill('input.new-todo', taskName);
    await page.press('input.new-todo', 'Enter');
  }
  
  async function toggleTask(page, taskName, index = 1) {
    const taskSelector = `(//label[text()='${taskName}']/preceding-sibling::input[@type='checkbox'])[${index}]`;
    await page.click(taskSelector);
    await page.waitForTimeout(500); // Esperar a que la acción se complete
  }
  
  async function checkTaskCompletion(page, taskName, index = 1) {
    const taskSelector = `(//label[text()='${taskName}'])[${index}]`;
    const isCompleted = await page.evaluate(selector => {
      const taskElement = document.evaluate(selector, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
      return taskElement.classList.contains('completed');
    }, taskSelector);
    return isCompleted;
  }
  
  async function toggleAllTasks(page) {
    await page.click('//input[@type="checkbox" and @class="toggle-all"]');
    await page.waitForTimeout(500); // Esperar a que la acción se complete
  }
  
  module.exports = { navigateToTodoMVC, addTask, toggleTask, checkTaskCompletion, toggleAllTasks };
  
  