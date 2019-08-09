import { bindable,  bindingMode } from 'aurelia-framework';
import { HttpClient, json } from 'aurelia-fetch-client';
import { inject } from 'aurelia-framework';
import { ValidationControllerFactory, ValidationRules } from 'aurelia-validation';
import { BootstrapFormRenderer } from '../../bootstrap-form-renderer';


@inject(HttpClient, ValidationControllerFactory)
export class Task {
  @bindable({ defaultBindingMode: bindingMode.twoWay }) task;
  @bindable({ defaultBindingMode: bindingMode.twoWay }) refreshtodoboard;
  onEditMode = false;
  editTaskDesc;

  constructor(httpClient, controllerFactory) {
    this.httpClient = httpClient;
    this.controller = controllerFactory.createForCurrentScope();
    this.controller.addRenderer(new BootstrapFormRenderer());
  }

  updateTaskDone(value) {
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

  updateTaskDesc() {
    this.controller.validate()
      .then(result => {
        if (result.valid) {
          this.httpClient.fetch(`tasks/${this.task.id}`, {
            method: 'PUT',
            body: json({
              description: this.editTaskDesc
            })
          })
            .then(response => response.json())
            .then(data => {
              console.log(data);
              this.onEditMode = false;
              this.refreshtodoboard();
            });
        } else {
          console.log(result);
        }
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

  toggleEditMode(mode) {
    if (mode === 'enter') {
      this.editTaskDesc = this.task.description;
      this.onEditMode = true;
    }
  }


  logchange(value) {
    console.log('here is the value' + value);
  }
}

ValidationRules
  .ensure('editTaskDesc')
  .displayName('Task description')
  .required()
  .withMessage('\${$displayName} can\'t be blank.')
  .on(Task);
