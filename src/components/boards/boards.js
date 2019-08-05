import {Board}  from '../../models/boards/board-model';
import {inject} from 'aurelia-dependency-injection';
// import {validationMessages} from 'aurelia-validation';
import {
  ValidationControllerFactory,
  //   ValidationController,
  ValidationRules
} from 'aurelia-validation';
import {BootstrapFormRenderer} from '../bootstrap-form-renderer';

@inject(ValidationControllerFactory)
export class Boards {
  newBoardTitle;
  newBoardOwner;
  show = true;
  constructor(controllerFactory) {
    this.controller = controllerFactory.createForCurrentScope();
    this.controller.addRenderer(new BootstrapFormRenderer());
    this.newBoardTitle = '';
    this.newBoardOwner = '';
    this.boards = [];
    this.boards.push(new Board('board Nafiseh', 'Nafise', ['Negin Khatibzadeh', 'Fatemeh Ghanbari']));
    this.boards.push(new Board('board Faezeh', 'Nafise', ['Negin Khatibzadeh', 'Fatemeh Ghanbari', 'Nafiseh Nikeghbal', 'Nafiseh Nikeghbal']));
  }

  addBoard() {
    console.log('here');
    
    this.controller.validate()
      .then(result => {
        if (result.valid) {
          this.boards.push(new Board(this.newBoardTitle, this.newBoardOwner, []));
          this.newBoardTitle = '';
          this.newBoardOwner = '';
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
  .ensure('newBoardTitle').required()
  .ensure('newBoardOwner').required()
  .on(Boards);
