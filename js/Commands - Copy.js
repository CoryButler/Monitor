function Commands(user) {
    const _user = user;
    let _monitor = null;

    this.Execute = function (monitor, input) {
        _monitor = monitor;
        let command = input[0].toLowerCase();
        
        switch (command)
        {
            case "help":
                return Help();
            case "?":
                return Help();
            case "list":
                return List();
            case "read":
                return Read("./game/" + input[1]);
            case "command":
                return Run("./game/command/" + input[1], input[2] || "");
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

    const Run = function (filePath, additional) {
                    $.loadScript(filePath + ".js", function() {
                        loadedFunction(_monitor, filePath, additional);
                    });
    }

    const GoTo = function (filePath) {

    }

    const Scan = function (filePath) {

    }

    const Help = function () {
        Read("./game/help.t");
    }

    const Read = function (filePath) {
        let request = new XMLHttpRequest();
        request.open("GET", filePath + "xt", false);
        request.onreadystatechange = function ()
        {
            if(request.readyState === 4)
            {
                if(request.status === 200 || request.status == 0)
                    _monitor.Log(_monitor.Log() + request.responseText +"\n");
                else
                    _monitor.Log(_monitor.Log() + "Could not load " + filePath.substr(filePath.lastIndexOf("/") + 1) + "\n");
            }
        }
        request.send(null);
    }
}

jQuery.loadScript = function (url, callback) {
    jQuery.ajax({
        url: url,
        dataType: "script",
        success: callback,
        async: false
    });
}