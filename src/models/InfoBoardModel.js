// import { TodoBoard } from '../models/todos/todo-board-model';
import { HttpClient } from 'aurelia-fetch-client';
import { inject } from 'aurelia-framework';

@inject(HttpClient)
export class InfoBoardModel {
  title = 'New Board';
  todocount = 0;
  taskcount = 0;
  unfinishedtasks = 0;
  todoBoards = [];
  constructor(httpClient) {
    this.httpClient = httpClient;
  }

  // TODO: Should fix the query to get todos for each board
  // attached() {
  //   this.httpClient.fetch('todos')
  //     .then(response => response.json())
  //     .then(data => {
  //       this.todoBoards = data.map(element => Object.assign(new TodoBoard(), element));
  //     });

  //   this.httpClient.fetch(`boards/owner/${id}`)
  //     .then(response => response.json())
  //     .then(data => {
  //       this.todoBoards = data;
  //     });
  // }
}
