;(loadedFunction = function (liveLink, additional) {
    if (!liveLink.User().Id.includes(".")) {
        liveLink.Monitor().Log(liveLink.Monitor().Log() + "no LiveLink detected\n");
        return;
    }    

    let request = new XMLHttpRequest();
    request.open("GET", "./rooms/" + liveLink.User().Room + "/describe.txt", false);
    request.onreadystatechange = function ()
    {
        if(request.readyState === 4 && (request.status === 200 || request.status == 0))
            liveLink.Monitor().Log(liveLink.Monitor().Log() + request.responseText +"\n");
    }
    try { request.send(null); }
    catch {
        liveLink.Monitor().Log(liveLink.Monitor().Log() + "error: command failed\n");
    }
}) ();