import { TodoBoard } from '../../models/todos/todo-board-model';
import { inject } from 'aurelia-framework';
import { HttpClient } from 'aurelia-fetch-client';

@inject(HttpClient)
export class Todos {
  newTodoTitle = '';
  todoBoards = [];
  show = true;
  constructor(httpClient) {
    this.httpClient = httpClient;
  }

  attached() {
    this.httpClient.fetch('todo')
      .then(response => response.json())
      .then(data => {
        data.result.forEach(element => {
          this.todoBoards.push(Object.assign(new TodoBoard('temp'), element));
        });
      });
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
