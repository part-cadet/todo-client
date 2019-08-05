import { TodoBoard } from '../../../models/todos/todo-board-model';
import { bindable } from 'aurelia-framework';
import { HttpClient } from 'aurelia-fetch-client';
import { inject } from 'aurelia-framework';

@inject(HttpClient)
export class InfoBoard {
  @bindable infoboard;
  constructor(httpClient) {
    this.httpClient = httpClient;
  }

  attached() {
    // Fetching todos of the board
    this.httpClient.fetch(`boards/todosof/${this.infoboard.id}`)
      .then(response => response.json())
      .then(data => {
        this.infoboard.todoBoards = data.result.map(element => Object.assign(new TodoBoard(), element));
      });

    // Fetching name of the board's owner
    this.httpClient.fetch(`boards/ownerof/${this.infoboard.id}`)
      .then(response => response.json())
      .then(data => {
        this.infoboard.owner = data.result[0].name;
      });

    // Fetching all the tasks in the board and calculting finished and not finished ones
    this.httpClient.fetch(`boards/tasksof/${this.infoboard.id}`)
      .then(response => response.json())
      .then(data => {
        data.result.forEach(element => {
          this.infoboard.taskcount++;
          if (element.done === false) {
            this.infoboard.unfinishedtasks++;
          }
        });
        if (this.infoboard.unfinishedtasks === 0) {
          this.infoboard.status = 'DONE';
        }
      });

    // Fetching all the members of this board
    this.httpClient.fetch(`boards/membersof/${this.infoboard.id}`)
      .then(response => response.json())
      .then(data => {
        this.infoboard.memberPictures = data.result.map(element => require(`../../../assets/pictures/${element.profile_pic}.png`));
      });
  }
}
