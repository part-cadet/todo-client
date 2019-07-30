//import {Task} from './task/task'
import {bindable} from 'aurelia-framework';
import {Task} from './task/task-model';


export class TodoBoard {
  @bindable todoboard123;
  constructor() {
    
 
    

    this.tasks = [];
    this.tasks.push(new Task('this is a task'));
    this.tasks.push(new Task('this is a task'));
    

  }
}
