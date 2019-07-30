export class Task {
  description;
  done;
  assignee;
  constructor(description, assignee) {
    this.description = description;
    this.done = false;
    this.assignee = assignee;
  }
}
