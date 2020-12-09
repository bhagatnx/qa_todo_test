import {
  Builder,
  By,
  Capabilities,
  until,
  WebDriver,
} from "selenium-webdriver";

const chromedriver = require("chromedriver");

const driver: WebDriver = new Builder()
  .withCapabilities(Capabilities.chrome())
  .build();

class TodoPage {
todoInput: By = By.className('.new-todo');
todos: By = By.css('li.todo');
todoLabel: By = By.css('label');
todoComplete: By = By.css('checkbox');
clearCompletedButton: By = By.className('button.clear-completed');
todoStar: By = By.css('star');
starBanner: By = By.className('starred');
todoCount: By = By.className('todo-count')

driver: WebDriver;
url: string = "https://devmountain.github.io/qa_todos/";
  constructor(driver: WebDriver) {
    this.driver = driver;
  }
navigate() {
  this.driver.get(this.url);
  }
}
const em = new TodoPage(driver);
 
describe("the todo app", () => {
  beforeEach(async () => {
    await em.navigate();
  });
  afterAll(async () => {
    await driver.quit();
  });

  it("can add a todo", async () => {
    await driver.wait(until.elementLocated(em.todoInput));
    await driver.findElement(em.todoInput).sendKeys("Test To-Do\n");
  });
  it("can remove a todo", async () => {
    let myTodos = await driver.findElements(em.todos);
    await myTodos
      .filter(async (todo) => {
        (await (await todo.findElement(em.todoLabel)).getText()) ==
          "Test To-Do";
      })[0]
      .findElement(em.todoComplete)
      .click();
    await (await driver.findElement(em.clearCompletedButton)).click();
    myTodos = await driver.findElements(em.todos);
    let myTodo = await myTodos.filter(async (todo) => {
      (await (await todo.findElement(em.todoLabel)).getText()) == "Test To-Do";
    });
    expect(myTodo.length).toEqual(0);
  });
  it("can mark a todo with a star", async () => {
    await driver.wait(until.elementLocated(em.todoInput));
    let startingStars = await (await driver.findElements(em.starBanner)).length;

    await driver.findElement(em.todoInput).sendKeys("Test To-Do\n");
    await (await driver.findElements(em.todos))
      .filter(async (todo) => {
        (await (await todo.findElement(em.todoLabel)).getText()) ==
          "Test To-Do";
      })[0]
      .findElement(em.todoStar)
      .click();
    let endingStars = await (await driver.findElements(em.starBanner)).length;
    expect(endingStars).toBeGreaterThan(startingStars);
  });
  it("has the right number of todos listed", async () => {
    await driver.wait(until.elementLocated(em.todoInput));

    let startingTodoCount = await (await driver.findElements(em.todos)).length;

    await driver.findElement(em.todoInput).sendKeys("Test To-Do 1\n");
    await driver.findElement(em.todoInput).sendKeys("Test To-Do 2\n");
    await driver.findElement(em.todoInput).sendKeys("Test To-Do 3\n");
    await driver.findElement(em.todoInput).sendKeys("Test To-Do 4\n");
    await driver.findElement(em.todoInput).sendKeys("Test To-Do 5\n");

    let endingTodoCount = await (await driver.findElements(em.todos)).length;

    let message = await (await driver.findElement(em.todoCount)).getText();

    expect(endingTodoCount - startingTodoCount).toBe(5);
    expect(message).toBe(`${endingTodoCount} items left`);
  });
  });

