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

  addMember() {
    if (this.newMember !== '') {
      this.members.push(this.newMember);
      this.newMember = '';
    }
    // this.members.push('New Member');
    this.showInput = !this.showInput;
    // this.showInput = !showInput;
  }

  showing() {
    // if (this.newMember !== '') {
    //   this.members.push(newMember);
    // }

    this.showInput = !this.showInput;
    // this.showInput = !showInput;
  }
}
