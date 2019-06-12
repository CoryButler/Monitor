function LiveLink () {
    let dir = "B:\\util\\login.txt";
    let dirDisplay = dir.substr(0, dir.lastIndexOf('\\')) + '...';

    let log = [];
    log.push("Automasoft LiveLink [v0.1.906.11]");
    log.push("(c) 1982 Automasoft Corporation. All rights reserved.");
    log.push("");
    log.push("     Automasoft: Dream Faster");
    log.push("");
    log.push("ALL Notice: No user profile detected at terminal.");
    log.push("              For help, enter \"help\".");
    log.push("");
    log.push("");
    
    const _keyboard = new Keyboard();
    const _monitor = new Monitor(log);
    let _user = new User();


    const ParseInput = function (input)
    {
        if (input.length > 1 || input[0].toLowerCase() === "list" || input[0].toLowerCase() === "help" || input[0] === "?") {
            log.push(_user.Commands().Execute(_monitor, input));
        }
        
        log.push("");
        log.push("");
        _monitor.UpdateLog(log);
    }

    $(window).keyup(function(evt)
	{
        let key = evt.key;

        let lastLine = log[log.length - 1];
        let hasInsertion = false;
        if (lastLine[lastLine.length - 1] === '_') {
            lastLine = lastLine.substr(0, lastLine.length - 1);
            hasInsertion = true;
        }

        if (key === "Backspace" && lastLine.length > 0) {
            lastLine = lastLine.substr(0, lastLine.length - 1);
            log[log.length - 1] = lastLine + (hasInsertion ? '_' : '');
            _monitor.UpdateLog(log, true);
        }
        else if (key === "Enter") {
            log[log.length - 1] = lastLine;
            _monitor.UpdateLog(log, true);
            ParseInput(lastLine.split(' '));
        }
        else if (_keyboard.IsValidKey(key)) {
            lastLine += key;
            log[log.length - 1] = lastLine + (hasInsertion ? '_' : '');
            _monitor.UpdateLog(log, true);
        }
    });
}