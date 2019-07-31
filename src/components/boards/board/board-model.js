// import {Member}  from './member/member-model';
export class Board {
  owner;
  title;
  members=[];
  constructor(title, owner, members) {
    this.title = title;
    this.owner = owner;
    this.members = members;
  }
}
