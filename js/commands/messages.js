;(loadedFunction = function (liveLink, additional) {
    let request = new XMLHttpRequest();
    request.open("GET", "./messages/_messageIds.txt", false);
    request.onreadystatechange = function ()
    {
        if(request.readyState === 4 && (request.status === 200 || request.status == 0))
            liveLink.Monitor().Log(liveLink.Monitor().Log() + request.responseText +"\n");
    }
    try { request.send(null); }
    catch {
        liveLink.Monitor().Log(liveLink.Monitor().Log() + "error: could not list message ids\n");
    }
}) ();