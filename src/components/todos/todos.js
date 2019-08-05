import {
  TodoBoard
} from '../../models/todos/todo-board-model';
import {
  inject, NewInstance
} from 'aurelia-framework';
import {
  HttpClient
} from 'aurelia-fetch-client';

import {
  validationMessages
} from 'aurelia-validation';
import {
  ValidationController,
  //   ValidationController,
  ValidationRules
} from 'aurelia-validation';
import {
  BootstrapFormRenderer
} from '../bootstrap-form-renderer';

@inject(HttpClient, NewInstance.of(ValidationController))
export class Todos {
  newTodoTitle = '';
  todoBoards = [];
  show = true;
  constructor(httpClient, controller) {
    //validationMessages.customMessage1 = '\${$displayName} should be more than 3 characteres';
    console.log('Controller');
    console.log(controller);
    
    
    this.controller = controller;
    this.controller.addRenderer(new BootstrapFormRenderer());
    this.httpClient = httpClient;

    ValidationRules
      .ensure('newTodoTitle').required()
      .on(this);
  }

  attached() {
    this.httpClient.fetch('todo')
      .then(response => response.json())
      .then(data => {
        this.todoBoards = data.result.map(element => Object.assign(new TodoBoard(), element));
      });
  }

  submit() {
    if (this.newTodoTitle === '') {
      this.controller.validate();
    } else {
      console.log(this.newTodoTitle);
      
      this.todoBoards.push(new TodoBoard(NewInstance.of(ValidationController)));
      this.newTodoTitle = '';
      this.toggle();
    }
  }
  toggle() {
    this.show = !this.show;
  }
}
