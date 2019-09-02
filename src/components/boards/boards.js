import {Board}  from '../../models/boards/board-model';
import {inject} from 'aurelia-dependency-injection';
import { HttpClient, json } from 'aurelia-fetch-client';
import {
  ValidationControllerFactory,
  //   ValidationController,
  ValidationRules
} from 'aurelia-validation';
import {BootstrapFormRenderer} from '../bootstrap-form-renderer';

@inject(ValidationControllerFactory, HttpClient)
export class Boards {
  newBoardTitle = '';
  newBoardOwner = '';
  boards = [];
  show = true;
  constructor(controllerFactory, httpClient) {
    this.httpClient = httpClient;
    this.controller = controllerFactory.createForCurrentScope();
    this.controller.addRenderer(new BootstrapFormRenderer());
  }
  attached() {
    this.getBoards();
  }

  getBoards() {
    this.httpClient.fetch('boards')
      .then(response => response.json())
      .then(data => {
        this.boards = data.map(element => Object.assign(new Board(), element));
      });
  }

  addBoard() {
    this.controller.validate()
      .then(result => {
        if (result.valid) {
          this.httpClient.fetch('boards', {
            method: 'POST',
            body: json({
              title: this.newBoardTitle
            })
          })
            .then(response => response.json())
            .then(data => {
              console.log(data); this.getBoards();
            });
          this.newBoardTitle = '';
          this.toggle();
        } else {
          console.log(result);
        }
      });
  }

  toggle() {
    this.show = !this.show;
  }
}

ValidationRules
  .ensure('newBoardTitle')
  .displayName('Board title')
  .required()
  .withMessage('\${$displayName} can\'t be blank.')
  .on(Boards);
