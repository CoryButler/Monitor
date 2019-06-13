;(loadedFunction = function (liveLink, filePath, additional) {
    if (liveLink.User().Id.includes(".")) {
        liveLink.Monitor().Log(liveLink.Monitor().Log() + "LiveLink in progress: terminal33.manomech_44\ntry command: unlink\n");
        return;
    }    

    let id = additional;
    if (id === "") id = "[noID]";
    if (id === "44") {
        liveLink.Monitor().Log(liveLink.Monitor().Log() + "LiveLink established: terminal33.manomech_44\n");
        liveLink.User().Id += ".manomech_44";
    }
    else
        liveLink.Monitor().Log(liveLink.Monitor().Log() + "manomech_" + id +" is not available\n");
}) ();