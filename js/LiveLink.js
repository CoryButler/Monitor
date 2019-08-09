function LiveLink () {
    const _this = this;    
    const _keyboard = new Keyboard();
    const _monitor = new Monitor();
    const _user = new User();

    let _commands = ["> "];
    let _currentCommand = 0;
    let _commandsLimit = 10;

    this.Manomechs = [
        new Manomech("44", "_room"),
        new Manomech("52", "_room")
    ];

    this.Monitor = function () { return _monitor; }
    this.User = function () { return _user; }
    this.Vars = { author: "Cory" };

    const KeyUp = (evt) => {
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
        else if (key === "Enter" && input.trim() !== ">") {
            if (input !== _commands[_commands.length - 1]) _commands.push(input);
            if (_commands.length > _commandsLimit) _commands.splice(0, 1);
            _currentCommand = _commands.length;
            _monitor.Log(_monitor.Log() + "\n" + input + "\n");
            Execute(input.substr(2).trim().split(' '));
        }
        else if (key === "ArrowUp") {
            _currentCommand = _currentCommand - 1 >= 0 ? _currentCommand - 1 : 0;
            input = _commands[_currentCommand] + (hasInsertion ? '_' : '');
            _monitor.Input(input);
        }
        else if (key === "ArrowDown") {
            _currentCommand = _currentCommand + 1 < _commands.length ? _currentCommand + 1 : _commands.length - 1;
            input = _commands[_currentCommand] + (hasInsertion ? '_' : '');
            _monitor.Input(input);
        }
        else if (_keyboard.IsValidKey(key) && input.length < 80) {
            input += key + (hasInsertion ? '_' : '');
            _monitor.Input(input);
        }
    }

    const LoadScript = function (url, callback, error) {
        var script = document.createElement('script');
        script.onload = () => { callback(); document.body.removeChild(script); };
        script.onerror = error;
        script.src = url;
        document.body.appendChild(script);
    }

    const Execute = function (input) {
        if (input[0] === "?") input[0] = "help";
        let command = "./js/commands/" + input[0].toLowerCase() + ".js";
        
        LoadScript(command, function() {
            loadedFunction(_this, input[1] || "");
        }, function() {
            _monitor.Log(_monitor.Log() + "command not found: " + input[0] + "\n");
        });
    }
    
    // Constructor
    document.addEventListener("keyup", KeyUp);
    Execute(["_start"]);
}