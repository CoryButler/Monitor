function User () {
    this.Name = "";
    this.Password = "";
    const _commands = new Commands(this);

    this.Commands = function () {return _commands; }
}