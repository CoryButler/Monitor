;(loadedFunction = function (liveLink, additional) {
    let request = new XMLHttpRequest();
    request.open("GET", "./game/_start.txt", false);
    request.onreadystatechange = function ()
    {
        if(request.readyState === 4 && (request.status === 200 || request.status == 0)) {
            let lines = request.responseText.split("\r\n");
            let i = 0;
            lines.forEach(line => {
                setTimeout(() => liveLink.Monitor().Log(liveLink.Monitor().Log() + line +"\n"), i);
                i+=50;
            });
        }
        else {
            liveLink.Monitor().Log(liveLink.Monitor().Log() + "error: could not access startup.x\nstatus: terminal33 operational\nFor help, enter \"help\".\n");
        }
    }
    try { request.send(null); }
    catch {
        liveLink.Monitor().Log(liveLink.Monitor().Log() + "error: could not access startup.x\nstatus: terminal33 operational\n");
    }
}) ();