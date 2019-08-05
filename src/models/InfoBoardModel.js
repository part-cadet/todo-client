export class InfoBoardModel {
  id;
  title = 'New Board';
  owner = 'New Owner'
  todocount = 0;
  taskcount = 0;
  unfinishedtasks = 0;
  todoBoards = [];
  memberPictures = [];
  status = '';
  constructor() {}
}
