export class Task {
  id;
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
