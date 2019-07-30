import {
  TodoBoard
} from './todoBoard/todo-board-model';


export class Todos {
  constructor() {
    console.log('hi');
    this.todoBoards = [];
    this.todoBoards.push(new TodoBoard('hi'));
    this.todoBoards.push(new TodoBoard('hello'));
    this.todoBoards.push(new TodoBoard('hello'));


    
  }
}
