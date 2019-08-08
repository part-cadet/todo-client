import {
  bindable
} from 'aurelia-framework';

import {
  Task
} from '../../../models/todos/task-model';

import {
  inject
} from 'aurelia-framework';
import {
  HttpClient
} from 'aurelia-fetch-client';


@inject(HttpClient)
export class TodoBoard {
  @bindable todoboard;

  constructor(httpClient) {
    this.httpClient = httpClient;
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
}
