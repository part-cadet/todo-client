import {bindable} from 'aurelia-framework';
//import { TodoBoard } from '../../../models/todos/todo-board-model';
import { HttpClient } from 'aurelia-fetch-client';
import { inject } from 'aurelia-framework';

@inject(HttpClient)
export class Board {
  @bindable board;
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
}

