// import {Member}  from './member/member-model';
export class Board {
  owner;
  title;
  members = [];
  showInput;
  newMember='';
  constructor(title, owner, members) {
    this.title = title;
    this.owner = owner;
    this.members = members;
    this.newMember = '';
  }
}
