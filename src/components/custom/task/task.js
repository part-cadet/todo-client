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
  showInput=false;
  users=[];
  assignee = '';

  constructor(httpClient, controllerFactory) {
    this.httpClient = httpClient;
    this.controller = controllerFactory.createForCurrentScope();
    this.controller.addRenderer(new BootstrapFormRenderer());
  }

  attached() {
    if (this.task.assignee !== null) {
      this.httpClient.fetch(`tasks/assignee/${this.task.assignee}`)
        .then(response => (response.json()))
        .then(data => {
          this.task.assigneePic = require(`../../../assets/pictures/${data.result[0].profile_pic}.png`);
        });
    }


    this.httpClient.fetch(`boards/allmembersof/${this.task.id}`)
      .then(response => response.json())
      .then(data => {
        console.log('here');
        console.log(data);


        this.users = data.result;
        console.log(this.users);
      });
  }

  toggleInput() {
    this.showInput = !this.showInput;
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

  updateTaskAssignee() {
    this.httpClient.fetch(`tasks/${this.task.id}`, {
      method: 'PUT',
      body: json({
        assignee: this.assignee
      })
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        if (data.status === 'Ok') {
          this.refreshtodoboard();
        } else if (data.detail.includes('not present in table')) {
          toastr.error('Member does not exist in the database');
        }
        this.showInput = false;
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
