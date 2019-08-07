export class Task {
  id;
  description;
  todo_id;
  done;
  assignee;
  constructor(description, assignee) {
    this.description = description;
    this.assignee = assignee;
    this.done = false;
  }
}
