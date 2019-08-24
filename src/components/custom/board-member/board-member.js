import { bindable,  bindingMode } from 'aurelia-framework';
import { HttpClient, json } from 'aurelia-fetch-client';
import { inject } from 'aurelia-framework';


@inject(HttpClient)
export class BoardMember {
  @bindable({ defaultBindingMode: bindingMode.twoWay }) board;
  @bindable({ defaultBindingMode: bindingMode.twoWay }) member;
  @bindable({ defaultBindingMode: bindingMode.twoWay }) refreshmembers;

  constructor(httpClient) {
    this.httpClient = httpClient;
  }

  removeMember() {
    this.httpClient.fetch(`boards/removeMember/${this.board.id}-${this.member}`, {
      method: 'DELETE'
    })
      .then(response => response.json())
      .then(data => {
        this.refreshmembers();
      });
  }
}
