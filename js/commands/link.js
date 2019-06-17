;(loadedFunction = function (liveLink, additional) {
    if (liveLink.User().Id.includes(".")) {
        liveLink.Monitor().Log(liveLink.Monitor().Log() + "LiveLink in progress: terminal33.manomech_44\n");
        return;
    }    

    let id = additional;
    if (id === "") id = "[noID]";
    if (liveLink.Manomechs.some(m => m.Id === id)) {
        liveLink.Monitor().Log(liveLink.Monitor().Log() + "LiveLink established: terminal33.manomech_" + id + "\n");
        liveLink.User().Id += ".manomech_" + id;
    }
    else {
        let mIds = "";
        liveLink.Manomechs.forEach(m => {
            mIds += "    " + m.Id + "\n";
        });
        liveLink.Monitor().Log(liveLink.Monitor().Log() + "manomech_" + id +" is not available\nmanomech id list:\n" + mIds);
    }
}) ();