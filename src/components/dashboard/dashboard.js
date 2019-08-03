import { InfoBoardModel } from '../../models/InfoBoardModel';
import { HttpClient } from 'aurelia-fetch-client';
import { inject } from 'aurelia-framework';

@inject(HttpClient)
export class Dashboard {
  infoBoards = [];
  constructor(httpClient) {
    this.httpClient = httpClient;
  }

  attached() {
    this.httpClient.fetch('boards')
      .then(response => response.json())
      .then(data => {
        this.infoBoards = data.map(element => Object.assign(new InfoBoardModel(), element));
        console.log(this.infoBoards);
      });
  }
}
