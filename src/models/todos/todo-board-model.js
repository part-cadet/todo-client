//import {Task} from './task/task';
import {Task} from './task-model';

export class TodoBoard {
  title;
  newTaskDesc;
  constructor(title) {
    this.title = title;
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
