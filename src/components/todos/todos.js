
import { TodoBoard } from '../../models/todos/todo-board-model';

export class Todos {
  constructor() {
    this.todoBoards = [];
    this.todoBoards.push(new TodoBoard('hi'));
    this.todoBoards.push(new TodoBoard('hello'));
    this.todoBoards.push(new TodoBoard('hello'));
  }

  addTodo() {
    this.todoBoards.push(new TodoBoard('New Todo'));
  }
}
