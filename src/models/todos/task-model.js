export class Task {
  description;
  todo_id;
  done;
  assignee;
  constructor(description, assignee) {
    this.description = description;
    this.done = false;
    this.assignee = assignee;
  }
}
