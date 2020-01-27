function loadJSON(fileName, callback) {   
    var xobj = new XMLHttpRequest();
    if (xobj.overrideMimeType) {
        xobj.overrideMimeType("application/json");
    }
    xobj.open('GET', './data/'+fileName+'.json', true);
    xobj.onreadystatechange = function () {
        if (xobj.readyState == 4 && xobj.status == "200") {
            callback(JSON.parse(xobj.responseText));
        }
    };
    xobj.send(null);  
}

export { loadJSON };