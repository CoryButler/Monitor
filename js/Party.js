export function Party () {
    this.members = [];

    this.addMember = (member) => {
        if (this.members.indexOf(member) < 0)
            this.members.push(member);
    }

    this.removeMember = (member) => {
        const index = this.members.indexOf(member);
        if (index >= 0) 
            this.members.splice(index, 1);
    }
}