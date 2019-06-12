function Commands(user) {
    const _user = user; 

    this.Execute = function (monitor, input) {
        let command = input[0].toLowerCase();
        
        switch (command)
        {
            case "help":
                return Help();
            case "?":
                return Help();
            case "list":
                return List();
            case "run":
                return Run("./game/" + input[1]);
        }
    }    
    
    const FileExists = function(filePath) {
        var json;
        $.ajax({
            url: filePath + "ml",
            dateType: "xml",
            async: false,
            success: function(response)
            {
                json = $.xml2json(response);
            },
            error: function()
            {
                json = "Could not load " + filePath.substr(filePath.lastIndexOf("/") + 1);
            }
        });
        return json;
    }

    const List = function (directory) {
        return "newUser.x";
    }

    const Run = function (filePath) {
        return FileExists(filePath).mainText;
    }

    const GoTo = function (filePath) {

    }

    const Scan = function (filePath) {

    }

    const Help = function () {
        return "Available commands: help, list, run";
    }
}