import {
  TodoBoard
} from '../../models/todos/todo-board-model';

export class Todos {
  newTodoTitle


  show = true;
  constructor() {
    this.newTodoTitle = '';
    this.todoBoards = [];
    this.todoBoards.push(new TodoBoard('hi'));
    this.todoBoards.push(new TodoBoard('hello'));
    this.todoBoards.push(new TodoBoard('hello'));
  }

  addTodo() {


    if (this.newTodoTitle !== '') {
      this.todoBoards.push(new TodoBoard(this.newTodoTitle));
      this.newTodoTitle = '';
    }
    this.show = !this.show;
  }
  toggle() {
    this.show = !this.show;
    // console.log("show");
  }
}
