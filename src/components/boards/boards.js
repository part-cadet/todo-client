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
    //validationMessages.customMessage1 = '\${$displayName} should be more than 3 characteres';
    this.controller = controllerFactory.createForCurrentScope();
    this.controller.addRenderer(new BootstrapFormRenderer());
    this.newBoardTitle = '';
    this.newBoardOwner = '';
    this.boards = [];
    this.boards.push(new Board('board Nafiseh', 'Nafise', ['Negin Khatibzadeh', 'Fatemeh Ghanbari']));
    this.boards.push(new Board('board Faezeh', 'Nafise', ['Negin Khatibzadeh', 'Fatemeh Ghanbari', 'Nafiseh Nikeghbal', 'Nafiseh Nikeghbal']));
  }

  submit() {
    if (this.newBoardTitle === '' || this.newBoardOwner === '') { this.controller.validate();} else {
      this.boards.push(new Board(this.newBoardTitle, this.newBoardOwner, []));
      this.newBoardTitle = '';
      this.newBoardOwner = '';
      this.show = !this.show;
    }
  }

  // this.boards.push(new Board('New Board', 'Owner', []));
  toggle() {
    this.show = !this.show;
    // console.log("show");
  }
}

ValidationRules
  .ensure(a => a.newBoardTitle).required()
  .ensure(a => a.newBoardOwner).required()


  .on(Boards);
