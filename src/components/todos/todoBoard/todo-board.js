//import {Task} from './task/task'
import {bindable} from 'aurelia-framework';
import {Task} from '../../../models/todos/task-model';


export class TodoBoard {
  @bindable todoboard;

  constructor() {
    this.newTaskDesc = '';
    this.tasks = [];
    this.tasks.push(new Task('this is a task'));
    this.tasks.push(new Task('this is a task'));
  }

  addTask() {
    if (this.newTaskDesc !== '') {
      this.tasks.push(new Task(this.newTaskDesc));
      this.newTaskDesc = '';
    }
  }
}
