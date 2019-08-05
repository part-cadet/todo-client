import {bindable, bindingMode} from 'aurelia-framework';
import {Task} from '../../../models/todos/task-model';
import { inject } from 'aurelia-framework';

import { ValidationControllerFactory, ValidationRules } from 'aurelia-validation';
import { BootstrapFormRenderer } from '../../bootstrap-form-renderer';

@inject(ValidationControllerFactory)
export class TaskAddBtn {
    @bindable({ defaultBindingMode: bindingMode.twoWay }) tasks;
    newTaskDesc = '';

    constructor(controllerFactory) {
      console.log(controllerFactory);
      this.controller = controllerFactory.createForCurrentScope();
      console.log(this.controller);
      this.controller.addRenderer(new BootstrapFormRenderer());
    }

    addTask() {
      this.controller.validate()
        .then(result => {
          if (result.valid) {
            console.log(result);
            this.tasks.push(new Task(this.newTaskDesc));
            this.newTaskDesc = '';
          } else {
            console.log(result);
          }
        });
    }
}

ValidationRules
  .ensure('newTaskDesc')
  .displayName('Task description')
  .required()
  .withMessage('\${$displayName} can\'t be blank.')
  .on(TaskAddBtn);
