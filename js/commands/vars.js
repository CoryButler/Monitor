;(loadedFunction = function (liveLink, additional) {
    Object.keys(liveLink.Vars).forEach(key => {
        liveLink.Monitor().Log(liveLink.Monitor().Log() + key + ": " + liveLink.Vars[key] + "\n");
    });
}) ();