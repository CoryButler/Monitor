;(loadedFunction = function (liveLink, filePath, additional) {
    let request = new XMLHttpRequest();
    request.open("GET", "./game/" + additional + "xt", false);
    request.onreadystatechange = function ()
    {
        if(request.readyState === 4)
        {
            if(request.status === 200 || request.status == 0)
                liveLink.Monitor().Log(liveLink.Monitor().Log() + request.responseText +"\n");
            else
                liveLink.Monitor().Log(liveLink.Monitor().Log() + "Could not load " + filePath.substr(filePath.lastIndexOf("/") + 1) + "\n");
        }
    }
    request.send(null);
}) ();