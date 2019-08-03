import {Board}  from '../../models/boards/board-model';
export class Boards {
  newBoardTitle;
  newBoardOwner;
  show = true;
  constructor() {
    this.newBoardTitle = '';
    this.newBoardOwner = '';
    this.boards = [];
    this.boards.push(new Board('board Nafiseh', 'Nafise', ['Negin Khatibzadeh', 'Fatemeh Ghanbari']));
    this.boards.push(new Board('board Faezeh', 'Nafise', ['Negin Khatibzadeh', 'Fatemeh Ghanbari', 'Nafiseh Nikeghbal', 'Nafiseh Nikeghbal']));
  }

  addBoard() {
    if (this.newBoardTitle !== '' && this.newBoardOwner !== '') {
      this.boards.push(new Board(this.newBoardTitle, this.newBoardOwner, []));
      this.newBoardTitle = '';
      this.newBoardOwner = '';
    }
    this.show = !this.show;
    // this.boards.push(new Board('New Board', 'Owner', []));
  }
  toggle() {
    this.show = !this.show;
    // console.log("show");
  }
}
