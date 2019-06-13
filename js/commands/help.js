;(loadedFunction = function (liveLink, filePath, additional) {
    let request = new XMLHttpRequest();
    request.open("GET", "./game/_help.txt", false);
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
    /* switch (additional) {
    case "044":
        monitor.Log(monitor.Log() + "logout - log out of current bot\nlook   - return info on surroundings\n");
        break;
    default:
        monitor.Log(monitor.Log() + "login [botId] - login to bot by id\n");
        break;
    } */
}) ();