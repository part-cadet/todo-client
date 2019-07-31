import {Board}  from '../../models/boards/board-model';
export class Boards {
  constructor() {
    this.boards = [];
    this.boards.push(new Board('board Nafiseh', 'Nafise', ['Negin Khatibzadeh', 'Fatemeh Ghanbari']));
    this.boards.push(new Board('board Faezeh', 'Nafise', ['Negin Khatibzadeh', 'Fatemeh Ghanbari', 'Nafiseh Nikeghbal', 'Nafiseh Nikeghbal']));
  }

  addBoard() {
    this.boards.push(new Board('New Board', 'Owner', []));
  }
}
