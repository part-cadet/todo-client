import {
  TodoBoard
} from '../../models/todos/todo-board-model';

export class Todos {


  show = true;
  constructor() {
    this.todoBoards = [];
    this.todoBoards.push(new TodoBoard('hi'));
    this.todoBoards.push(new TodoBoard('hello'));
    this.todoBoards.push(new TodoBoard('hello'));
  }

  addTodo() {
    this.todoBoards.push(new TodoBoard('New Todo'));
  }
  toggle() {
    this.show = !this.show;
    console.log("show");
    
  }
}
