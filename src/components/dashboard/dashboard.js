import { InfoBoardModel } from '../../models/InfoBoardModel';

export class Dashboard {
  infoBoards = [];
  constructor() {
    this.infoBoards.push(new InfoBoardModel('Board I'));
    this.infoBoards.push(new InfoBoardModel('Board II'));
    this.infoBoards.push(new InfoBoardModel('Board III'));
    this.infoBoards.push(new InfoBoardModel('Board IV'));
    this.infoBoards.push(new InfoBoardModel('Board V'));
  }
}
