import { bindable,  bindingMode } from 'aurelia-framework';
import {
  HttpClient, json
} from 'aurelia-fetch-client';

import {
  inject
} from 'aurelia-framework';


@inject(HttpClient)
export class Task {
  @bindable({ defaultBindingMode: bindingMode.twoWay }) task;
  @bindable({ defaultBindingMode: bindingMode.twoWay }) refreshtodoboard;

  constructor(httpClient) {
    this.httpClient = httpClient;
  }


  updateTask(value) {
    console.log('task id ' + this.task.id);
    this.httpClient.fetch(`tasks/${this.task.id}`, {
      method: 'PUT',
      body: json({
        // description: 'updated',
        done: value
      })
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
      });
  }

  removeTask() {
    this.httpClient.fetch(`tasks/${this.task.id}`, {
      method: 'DELETE'
    })
      .then(response => response.json())
      .then(data => {
        this.refreshtodoboard();
        console.log(data);
      });
  }


  logchange(value) {
    console.log('here is the value' + value);
  }
}
