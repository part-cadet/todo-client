import { TodoBoard } from './todo-board-model';

export class Todos {
  todoBoards;
  constructor() {
    this.todoBoards = [];
    this.todoBoards.push(new TodoBoard('hi'));
    this.todoBoards.push(new TodoBoard('hello'));
    this.todoBoards.push(new TodoBoard('hello'));
  }

  addTodo() {
    console.log("test");
    this.todoBoards.push(new TodoBoard('New Todo'));
  }
}
