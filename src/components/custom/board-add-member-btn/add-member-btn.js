import {bindable, bindingMode} from 'aurelia-framework';
import { inject } from 'aurelia-framework';
import { HttpClient, json } from 'aurelia-fetch-client';

import { ValidationControllerFactory, ValidationRules } from 'aurelia-validation';
import { BootstrapFormRenderer } from '../../bootstrap-form-renderer';

@inject(ValidationControllerFactory, HttpClient)
export class AddMemberBtn {
  @bindable({ defaultBindingMode: bindingMode.twoWay }) members;
  @bindable({ defaultBindingMode: bindingMode.twoWay }) boardid;
  @bindable({ defaultBindingMode: bindingMode.twoWay }) refreshmembers;
  newMember = '';
  showInput = false;

  constructor(controllerFactory, httpClient) {
    this.controller = controllerFactory.createForCurrentScope();
    this.controller.addRenderer(new BootstrapFormRenderer());
    this.httpClient = httpClient;
  }

  addMember() {
    this.controller.validate()
      .then(result => {
        if (result.valid) {
          this.httpClient.fetch(`boards/addmemberto/${this.boardid}`, {
            method: 'POST',
            body: json({
              username: this.newMember
            })
          })
            .then(response => response.json())
            .then(data => {
            // console.log(data);
              this.refreshmembers();
            });
          // this.members.push(this.newMember);
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
