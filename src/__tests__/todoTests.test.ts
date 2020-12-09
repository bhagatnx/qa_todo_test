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
    await (await driver.findElement(em.clearCompletedButton)).click();
  });
  it("can mark a todo with a star", async () => {

  });
  it("has the right number of todos listed", async () => {
  
  });
});
