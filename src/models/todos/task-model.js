export class Task {
  id;
  description;
  todo_id;
  done;
  assignee;
  assigneePic;
  constructor() {
    this.done = false;
    this.assigneePic = '';
  }
}
