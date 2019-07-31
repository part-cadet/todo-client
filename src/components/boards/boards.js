import {Board}  from './board/board-model';
export class Boards {
  constructor() {
    this.boards = [];
    this.boards.push(new Board('board Nafiseh', 'Nafise', ['Negin Khatibzadeh', 'Fatemeh Ghanbari']));
    this.boards.push(new Board('board Faezeh', 'Nafise', ['Negin Khatibzadeh', 'Fatemeh Ghanbari', 'Nafiseh Nikeghbal', 'Nafiseh Nikeghbal']));
  }
}
