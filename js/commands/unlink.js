;(loadedFunction = function (liveLink, additional) {
    if (!liveLink.User().Id.includes(".")) {
        liveLink.Monitor().Log(liveLink.Monitor().Log() + "no LiveLink detected\n");
        return;
    }    

    let location = liveLink.User().Location;
    if (location === "44") {
        liveLink.Monitor().Log(liveLink.Monitor().Log() + "LiveLink terminated\n");
        liveLink.User().Id = "terminal33";
    }
    else
        liveLink.Monitor().Log(liveLink.Monitor().Log() + "return manomech_" + id +" to unlink hub\n");
}) ();