function Commands() {
    this.Execute = function (liveLink, input) {
        if (input[0] === "?") input[0] = "help";
        let command = "./js/commands/" + input[0].toLowerCase() + ".js";
        
        loadScript(command, function() {
            loadedFunction(liveLink, command, input[1] || "");
        }, function() {
            liveLink.Monitor().Log(liveLink.Monitor().Log() + "command not found: " + input[0] + "\n");
        });
    }

    const loadScript = function (url, callback, error) {
        $.ajax({
            url: url,
            dataType: "script",
            success: callback,
            error: error,
            async: false
        });
    }
}