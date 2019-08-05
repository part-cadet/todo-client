export class TodoBoard {
  title;
  newTaskDesc;
  constructor(title) {
    this.title = title;
    this.tasks = [];
  }
}
