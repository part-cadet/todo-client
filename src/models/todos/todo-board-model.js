//import {Task} from './task/task';
import {Task} from './task-model';
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
  // ValidationAurelia,
  ValidationController,
  ValidationRules
} from 'aurelia-validation';
import {
  BootstrapFormRenderer
} from '../../components/bootstrap-form-renderer';

@inject(NewInstance.of(ValidationController))
export class TodoBoard {
  title;
  newTaskDesc;
  controller;
  constructor(controller) {
    console.log(controller);

    this.controller = controller;
    this.controller.addRenderer(new BootstrapFormRenderer());
    // this.title = title;
    // this.newTaskDesc = '';
    this.tasks = [];
    this.tasks.push(new Task('this is a task'));
    this.tasks.push(new Task('this is a task'));

    ValidationRules
      .ensure('newTaskDesc').required()
      .on(this);
  }

  addTask() {
    if (this.newTaskDesc === '') {
      console.log('here');
      this.controller.validate();
    } else {
      this.tasks.push(new Task(this.newTaskDesc));
      this.newTaskDesc = '';
    }
  }
}
