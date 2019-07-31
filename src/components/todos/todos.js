// import { bindable } from 'aurelia-framework';
import { TodoBoard } from './../../models/todos/todo-board-model';


export class Todos {
  // @bindable todos;
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
