import {TodoBoard} from '../../models/todos/todo-board-model';
import {inject} from 'aurelia-framework';
import {HttpClient, json } from 'aurelia-fetch-client';

import {ValidationControllerFactory, ValidationRules} from 'aurelia-validation';
import {BootstrapFormRenderer} from '../bootstrap-form-renderer';

@inject(HttpClient, ValidationControllerFactory)
export class Todos {
  newTodoTitle = '';
  todoBoards = [];
  show = true;

  constructor(httpClient, controllerFactory) {
    this.controller = controllerFactory.createForCurrentScope();
    this.controller.addRenderer(new BootstrapFormRenderer());
    this.httpClient = httpClient;
  }

  attached() {
    this.getTodoBoards();
  }

  getTodoBoards() {
    this.httpClient.fetch('todo')
      .then(response => response.json())
      .then(data => {
        this.todoBoards = data.map(element => Object.assign(new TodoBoard(), element));
      });
  }

  submit() {
    this.controller.validate()
      .then(result => {
        if (result.valid) {
          this.httpClient.fetch('todo/10', {
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
