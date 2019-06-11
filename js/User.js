function User () {
    this.Name = "";
    this.Password = "";
    const _commands = new Commands();

    this.Commands = function () {return _commands; }
}