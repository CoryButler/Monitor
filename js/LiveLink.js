function LiveLink () {
    const _this = this;    
    const _keyboard = new Keyboard();
    const _monitor = new Monitor();
    const _user = new User();

    this.Monitor = function () { return _monitor; }
    this.User = function () { return _user; }

    const ParseInput = function (input) {
        _user.Commands().Execute(_this, input);
    }

    $(window).keyup( function(evt) {
        let key = evt.key;

        let input = _monitor.Input();
        let hasInsertion = false;
        if (input[input.length - 1] === '_') {
            input = input.substr(0, input.length - 1);
            hasInsertion = true;
        }

        if (key === "Backspace" && input.length > 2) {
            input = input.substr(0, input.length - 1) + (hasInsertion ? '_' : '');
            _monitor.Input(input);
        }
        else if (key === "Enter") {
            _monitor.Log(_monitor.Log() + "\n" + input + "\n");
            _monitor.Input("> ");
            ParseInput(input.substr(2).split(' '));
        }
        else if (_keyboard.IsValidKey(key) && input.length < 80) {
            input += key + (hasInsertion ? '_' : '');
            _monitor.Input(input);
        }
    });

    ParseInput(["_start"]);
}