import {bindable, bindingMode} from 'aurelia-framework';
import {Task} from '../../../models/todos/task-model';
import { inject } from 'aurelia-framework';


import { ValidationControllerFactory, ValidationRules } from 'aurelia-validation';
import { BootstrapFormRenderer } from '../../bootstrap-form-renderer';
import {
  HttpClient , json
} from 'aurelia-fetch-client';

@inject(ValidationControllerFactory, HttpClient)
export class TaskAddBtn {
    @bindable({ defaultBindingMode: bindingMode.twoWay }) tasks;
    @bindable({ defaultBindingMode: bindingMode.twoWay }) todoid;
    @bindable({ defaultBindingMode: bindingMode.twoWay }) refreshtodo;
    newTaskDesc = '';

    constructor(controllerFactory, httpClient) {
      this.httpClient = httpClient;
      console.log(controllerFactory);
      this.controller = controllerFactory.createForCurrentScope();
      console.log(this.controller);
      this.controller.addRenderer(new BootstrapFormRenderer());
    }

    // attached(){}


    addTask() {
      console.log('todoid is' + this.todoid);
      
      this.controller.validate()
        .then(result => {
          if (result.valid) {
            this.httpClient.fetch(`tasks/${this.todoid}`, {
              method: 'POST',
              body: json({
                description: this.newTaskDesc,
                done: false
              })
            })
              .then(response => response.json())
              .then(data => {
                console.log(data);
                this.refreshtodo();
              });

            console.log(result);

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
