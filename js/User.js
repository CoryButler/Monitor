function User () {
    this.Name = "";
    this.Password = "";
    this.Id = "terminal33";
    const _commands = new Commands(this);

    this.Commands = function () {return _commands; }
}