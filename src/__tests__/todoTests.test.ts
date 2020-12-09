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

let todo
}


describe("the todo app", () => {
  it("can add a todo", () => {});
  it("can remove a todo", () => {});
  it("can mark a todo with a star", () => {});
  it("has the right number of todos listed", () => {});
});
