import { TodoBoard } from '../../models/todos/todo-board-model';
import { InfoBoardModel } from '../../models/InfoBoardModel';
import { inject } from 'aurelia-framework';
import { HttpClient, json } from 'aurelia-fetch-client';

import { ValidationControllerFactory, ValidationRules } from 'aurelia-validation';
import { BootstrapFormRenderer } from '../bootstrap-form-renderer';

@inject(HttpClient, ValidationControllerFactory)
export class Todos {
  newTodoTitle = '';
  todoBoards = [];
  show = true;
  boards = [];
  displayBoardID;

  constructor(httpClient, controllerFactory) {
    this.controller = controllerFactory.createForCurrentScope();
    this.controller.addRenderer(new BootstrapFormRenderer());
    this.httpClient = httpClient;
  }

  attached() {
    this.getBoards();
  }

  getBoards() {
    this.httpClient.fetch('boards')
      .then(response => response.json())
      .then(data => {
        this.boards = data.map(element => Object.assign(new InfoBoardModel(), element));
        this.displayBoardID = this.boards[0].id;
        this.getTodoBoards();
      });
  }

  getTodoBoards() {
    this.httpClient.fetch(`boards/todosof/${this.displayBoardID}`)
      .then(response => response.json())
      .then(data => {
        console.log(data.result);
        this.todoBoards = data.result.map(element => Object.assign(new TodoBoard(), element));
      });
  }

  changeDisplayBoard(boardID) {
    this.displayBoardID = boardID;
    this.getTodoBoards();
  }

  submit() {
    this.controller.validate()
      .then(result => {
        if (result.valid) {
          this.httpClient.fetch(`todo/${this.displayBoardID}`, {
            method: 'POST',
            body: json({
              title: this.newTodoTitle
            })
          })
            .then(response => response.json())
            .then(data => {
              console.log(data);
            });

          this.getTodoBoards();
          this.newTodoTitle = '';
          this.toggle();
        } else {
          console.log(result);
        }
      });
  }

  toggle() {
    this.show = !this.show;
  }
}

ValidationRules
  .ensure('newTodoTitle')
  .displayName('Todo title')
  .required()
  .withMessage('\${$displayName} cannot be blank.')
  .on(Todos);
