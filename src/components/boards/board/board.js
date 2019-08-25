import {bindable, bindingMode} from 'aurelia-framework';
//import { TodoBoard } from '../../../models/todos/todo-board-model';
import {HttpClient, json} from 'aurelia-fetch-client';
import { inject } from 'aurelia-framework';

@inject(HttpClient)
export class Board {
  @bindable({ defaultBindingMode: bindingMode.twoWay }) board;
  @bindable({ defaultBindingMode: bindingMode.twoWay }) refreshboards;
  onEditMode=false;
  editOwner;
  editTitle;

  constructor(httpClient) {
    this.httpClient = httpClient;
  }

  attached() {
    // Fetching name of the board's owner
    this.httpClient.fetch(`boards/ownerof/${this.board.id}`)
      .then(response => response.json())
      .then(data => {
        this.board.owner = data.result[0].owner_name;
      });

    this.getMembers();
  }

  // Fetching all the members of this board
  getMembers() {
    this.httpClient.fetch(`boards/membersof/${this.board.id}`)
      .then(response => response.json())
      .then(data => {
        this.board.members = data.result.map(element => element.name);
      });
  }
  removeBoard() {
    console.log('deleting');
    this.httpClient.fetch(`boards/${this.board.id}`, {
      method: 'DELETE'
    })
      .then(response => response.json())
      .then(data => {
        this.refreshboards();
      });
  }
  updateBoard() {
    // this.controller.validate()
    //   .then(result => {
    //     if (result.valid) {
    this.httpClient.fetch(`boards/${this.board.id}`, {
      method: 'PUT',
      body: json({
        title: this.editTitle,
        owner: this.editOwner
      })
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        this.onEditMode = false;
        this.refreshboards();
      });
    // } else {
    //   console.log(result);
    // }
    // });
  }
  toggleEditMode(mode) {
    if (mode === 'enter') {
      this.editTitle = this.board.title;
      this.editOwner = this.board.owner;
      this.onEditMode = true;
    }
  }
}

