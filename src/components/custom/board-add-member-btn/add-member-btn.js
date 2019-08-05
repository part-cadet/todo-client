import {bindable, bindingMode} from 'aurelia-framework';
import {Task} from '../../../models/todos/task-model';
import { inject } from 'aurelia-framework';

import { ValidationControllerFactory, ValidationRules } from 'aurelia-validation';
import { BootstrapFormRenderer } from '../../bootstrap-form-renderer';

@inject(ValidationControllerFactory)
export class AddMemberBtn {
  @bindable({ defaultBindingMode: bindingMode.twoWay }) members;
  newMember = '';
  showInput = false;

  constructor(controllerFactory) {
    this.controller = controllerFactory.createForCurrentScope();
    this.controller.addRenderer(new BootstrapFormRenderer());
  }

  addMember() {
    this.controller.validate()
      .then(result => {
        if (result.valid) {
          this.members.push(this.newMember);
          this.newMember = '';
          this.showInput = !this.showInput;
        } else {
          console.log(result);
        }
      });
  }

  showing() {
    this.showInput = !this.showInput;
  }
}

ValidationRules
  .ensure('newMember')
  .displayName('Member name')
  .required()
  .withMessage('\${$displayName} can\'t be blank.')
  .on(AddMemberBtn);
