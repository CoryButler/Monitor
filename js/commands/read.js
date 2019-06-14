;(loadedFunction = function (liveLink, additional) {
    if (additional === "" || additional === null || additional === undefined) {
        liveLink.Monitor().Log(liveLink.Monitor().Log() + "error: must include message id\n");
        return
    }

    let request = new XMLHttpRequest();
    request.open("GET", "./messages/" + additional + ".txt", false);
    request.onreadystatechange = function ()
    {
        if(request.readyState === 4 && (request.status === 200 || request.status == 0))
            liveLink.Monitor().Log(liveLink.Monitor().Log() + request.responseText +"\n");
    }
    try { request.send(null); }
    catch {
        liveLink.Monitor().Log(liveLink.Monitor().Log() + "message not found: " + additional + "\n");
    }
}) ();