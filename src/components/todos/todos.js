import { TodoBoard } from '../../models/todos/todo-board-model';
import { InfoBoardModel } from '../../models/InfoBoardModel';
import { Router } from 'aurelia-router';
import { inject } from 'aurelia-framework';
import { HttpClient, json } from 'aurelia-fetch-client';

import { ValidationControllerFactory, ValidationRules } from 'aurelia-validation';
import { BootstrapFormRenderer } from '../bootstrap-form-renderer';

@inject(HttpClient, ValidationControllerFactory, Router)
export class Todos {
  newTodoTitle = '';
  todoBoards = [];
  show = true;
  boards = [];
  displayBoardID;
  displayBoardTitle;
  notRedirected = false;

  constructor(httpClient, controllerFactory, router) {
    this.controller = controllerFactory.createForCurrentScope();
    this.controller.addRenderer(new BootstrapFormRenderer());
    this.httpClient = httpClient;
    this.router = router;
  }

  attached() {
    this.getBoards();
  }

  activate(params, routeConfig, navigationInstruction) {
    console.log('activate');
    console.log(params.boardID);
    if (typeof params.boardID === 'undefined') {
      console.log('not redirected');
      this.notRedirected = true;
    } else {
      this.displayBoardID = params.boardID;
      console.log(`board given is ${this.displayBoardID}`);
    }
  }

  getBoards() {
    this.httpClient.fetch('boards')
      .then(response => response.json())
      .then(data => {
        this.boards = data.map(element => Object.assign(new InfoBoardModel(), element));
        if (this.notRedirected) {
          console.log('not redirected');
          this.displayBoardID = this.boards[0].id;
        }
        const displayBoard = this.boards.find(element => element.id === parseInt(this.displayBoardID, 10) );
        this.displayBoardTitle = displayBoard.title;
        this.getTodoBoards();
      });
  }

  getTodoBoards() {
    // console.log(`board requested is ${this.displayBoardID}`);
    this.httpClient.fetch(`boards/todosof/${this.displayBoardID}`)
      .then(response => response.json())
      .then(data => {
        console.log(data.result);
        this.todoBoards = data.result.map(element => Object.assign(new TodoBoard(), element));
      });
  }

  changeDisplayBoard(boardID) {
    this.router.navigate(`/todos?boardID=${boardID}`);
    this.displayBoardID = boardID;
    const displayBoard = this.boards.find(element => element.id === parseInt(this.displayBoardID, 10) );
    this.displayBoardTitle = displayBoard.title;
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
              this.getTodoBoards();
            });

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
