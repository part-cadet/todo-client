import {
  bindable,  bindingMode
} from 'aurelia-framework';

import {
  Task
} from '../../../models/todos/task-model';

import {
  inject
} from 'aurelia-framework';
import {
  HttpClient, json
} from 'aurelia-fetch-client';

import { ValidationControllerFactory, ValidationRules } from 'aurelia-validation';
import { BootstrapFormRenderer } from '../../bootstrap-form-renderer';


@inject(HttpClient, ValidationControllerFactory)
export class TodoBoard {
  @bindable todoboard;
  @bindable({ defaultBindingMode: bindingMode.twoWay }) refreshboard;

  onEditMode = false;
  editTodoBoardTitle;


  constructor(httpClient, controllerFactory) {
    this.httpClient = httpClient;
    this.controller = controllerFactory.createForCurrentScope();
    this.controller.addRenderer(new BootstrapFormRenderer());
  }

  attached() {
    this.getTasksOfTodo();
  }


  getTasksOfTodo() {
    console.log('reached ');
    this.todoboard.tasks = [];
    this.httpClient.fetch(`todo/tasksof/${this.todoboard.id}`)
      .then(response => (response.json()))
      .then(data => {
        console.log(data.result);
        this.todoboard.tasks = data.result.map(element => Object.assign(new Task(), element));
      });
  }


  removeTask() {
    this.httpClient.fetch(`todo/${this.todoboard.id}`, {
      method: 'DELETE'
    })
      .then(response => response.json())
      .then(data => {
        this.refreshboard();
        console.log(data);
      });
  }


  toggleEditMode(mode) {
    if (mode === 'enter') {
      this.editTodoBoardTitle = this.todoboard.title.toUpperCase();
      this.onEditMode = true;
    }
  }


  updateTodoBoardTitle() {
    this.controller.validate()
      .then(result => {
        if (result.valid) {
          this.httpClient.fetch(`todo/${this.todoboard.id}`, {
            method: 'PUT',
            body: json({
              title: this.editTodoBoardTitle
            })
          })
            .then(response => response.json())
            .then(data => {
              console.log(data);
              this.onEditMode = false;
              this.refreshboard();
            });
        } else {
          console.log(result);
        }
      });
  }
}

ValidationRules
  .ensure('editTaskDesc')
  .displayName('Task description')
  .required()
  .withMessage('\${$displayName} can\'t be blank.')
  .on(Task);
