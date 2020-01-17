export function Character (data) {
    this.commands = data.commands || [];
    this.items = data.items || [];
    this.location = data.location || "???"
    this.name = data.name || "???";
    this.canLearn = data.canLearn || [];

    this.addCommand = (command) => {
        if (this.commands.indexOf(command) < 0)
            this.commands.push(command);
    }

    this.removeCommand = (command) => {
        const index = this.commands.indexOf(command);
        if (index >= 0)
            this.commands.splice(index, 1);
    }

    this.addItem = (item) => {
        this.items.push(item);
    }

    this.removeItem = (item) => {
        const index = this.items.indexOf(item);
        if (index >= 0)
            this.items.splice(index, 1);
    }

    this.status = () => {
        let str = `Name: ${this.name}\n`;
        str += `Location: ${this.location}`;
        if (this.items.length > 0) {
            str += "\nItems:"
            this.items.forEach(item => str += `\n  ${item}`);
        }
        return str;
    }
}