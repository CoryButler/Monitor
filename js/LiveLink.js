function LiveLink () {
    const _this = this;    
    const _keyboard = new Keyboard();
    const _monitor = new Monitor();
    const _user = new User();

    this.Manomechs = [
        new Manomech("44", "_room"),
        new Manomech("52", "_room")
    ];

    this.Monitor = function () { return _monitor; }
    this.User = function () { return _user; }

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
        else if (key === "Enter" && input.trim() !== ">") {
            _monitor.Log(_monitor.Log() + "\n" + input + "\n");
            _monitor.Input("> ");
            Execute(input.substr(2).trim().split(' '));
        }
        else if (_keyboard.IsValidKey(key) && input.length < 80) {
            input += key + (hasInsertion ? '_' : '');
            _monitor.Input(input);
        }
    });

    const loadScript = function (url, callback, error) {
        $.ajax({
            url: url,
            dataType: "script",
            success: callback,
            error: error,
            async: false
        });
    }

    const Execute = function (input) {
        if (input[0] === "?") input[0] = "help";
        let command = "./js/commands/" + input[0].toLowerCase() + ".js";
        
        loadScript(command, function() {
            loadedFunction(_this, input[1] || "");
        }, function() {
            _monitor.Log(_monitor.Log() + "command not found: " + input[0] + "\n");
        });
    }
    
    Execute(["_start"]);
}