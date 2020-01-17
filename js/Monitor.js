export function Monitor () {
    const _canvasOutput = document.getElementById('output');
    const _contextOutput = _canvasOutput.getContext('2d');
    const _canvasInput = document.getElementById('input');
    const _contextInput = _canvasInput.getContext('2d');
    const _lineLimit = 28;
    const _numColumns = 80;
    this.inputEnabled = false;
    let _log = "";
    let _input = "> ";

    this.log = (value = null, enableInputOnComplete = true) => {
        if (value !== null) {
            this.inputEnabled = false;
            const lines = value.split("\n");
            let toLog = "";
            lines.forEach(line => {
                const words = line.split(" ");
                toLog += words[0];
                let currLine = words[0];
                for (let i = 1; i < words.length; i++) {
                    if (currLine.length + words[i].length + 1 > _numColumns + 2) {
                        toLog += "\n" + words[i];
                        currLine = words[i];
                    }
                    else {
                        currLine += " " + words[i];
                        toLog += " " + words[i];
                    }
                }
                toLog += "\n";
            });
            _log += "\n";
            _input = "";
            updateInput();
            recurrPrint(toLog, enableInputOnComplete);
        } 
        else
            return _log;
    }

    this.input = function (i = null) { if (i !== null) { _input = i; updateInput(); } else return _input; }
    this.dirDisplay = function () { return dirDisplay; }
    this.clear = () => { _log = ""; updateOutput(); this.inputEnabled = true; _input = "> "; updateInput(); }

    _contextOutput.font = "16px Consolas";
    _contextOutput.textBaseline = 'top';

    _contextInput.font = "16px Consolas";
    _contextInput.textBaseline = 'top';

    const recurrPrint = (toLog, enableInputOnComplete = true) => {
        let logs = toLog.split("\n");
        let log = "";
        while (log === "" && logs.length > 0) log = logs.shift();
        if (log !== "") _log += `${log}\n`;
        updateOutput();
        if (logs.length > 0)
            setTimeout(() => recurrPrint(logs.join("\n"), enableInputOnComplete), 50);
        else if (enableInputOnComplete) {
            this.inputEnabled = true;
            _input = "> ";
            updateInput();
        }

    }
    
    const drawOutput = function () {
        let lines = _log.split("\n");

        while (lines.length >= _lineLimit) { lines.splice(0, 1); }

        _contextOutput.fillStyle = "#00CC00";
        _contextOutput.filter = 'blur(4px)';
        for (let i = 0; i < lines.length; i++) {
            _contextOutput.fillText(lines[i], 20, i * 20 + 20);
        }

        _contextOutput.filter = 'blur(2px)';
        for (let i = 0; i < lines.length; i++) {
            _contextOutput.fillText(lines[i], 20, i * 20 + 20);
        } 
        
        _contextOutput.fillStyle = "#55FF55";
        _contextOutput.filter = 'none';
        for (let i = 0; i < lines.length; i++) {
            _contextOutput.fillText(lines[i], 20, i * 20 + 20);
        }

    }

    const drawInput = function () {
        let lines = _log.split("\n");

        while (lines.length >= _lineLimit) { lines.splice(0, 1); }

        lines.push(_input);
        _contextInput.fillStyle = "#00CC00";
        _contextInput.filter = 'blur(4px)';

        let i = lines.length - 1;
        _contextInput.fillText(lines[i], 20, i * 20 + 20);

        _contextInput.filter = 'blur(2px)';
        _contextInput.fillText(lines[i], 20, i * 20 + 20);
        
        _contextInput.fillStyle = "#55FF55";
        _contextInput.filter = 'none';
        _contextInput.fillText(lines[i], 20, i * 20 + 20);
    }

    const updateOutput = function () {
        clear(_contextOutput);
        drawOutput();
    }

    const updateInput = function () {
        clear(_contextInput);
        drawInput();
    }

    const clear = function (context) {
        context.clearRect(0, 0, _canvasOutput.width, _canvasOutput.height);
    }

    setInterval(() => {
        if (_input[_input.length - 1] !== '_')
            _input += '_';
        else
            _input = _input.substr(0, _input.length - 1);
        if (this.inputEnabled) updateInput();
    }, 500);

    // Constructor
    const _gradient = _contextOutput.createRadialGradient(
        _canvasOutput.width / 2, _canvasOutput.height / 2, _canvasOutput.height / 10,
        _canvasOutput.width / 2, _canvasOutput.height / 2, _canvasOutput.height / 2);
    _gradient.addColorStop(0, "#114411");
    _gradient.addColorStop(1, "#002200");
    document.getElementById('monitor').getContext('2d').fillStyle = _gradient;
    document.getElementById('monitor').getContext('2d').fillRect(0, 0, _canvasOutput.width, _canvasOutput.height);

    const _glare = _contextOutput.createLinearGradient(
        _canvasOutput.width, 0, 0, _canvasOutput.height);
    _glare.addColorStop(0, "#ccffcc50");
    _glare.addColorStop(0.25, "#ccffcc15");
    _glare.addColorStop(0.5, "#ccffcc00");
    _glare.addColorStop(0.75, "#ccffcc10");
    _glare.addColorStop(1, "#ccffcc20");
    document.getElementById('glare').getContext('2d').fillStyle = _glare;
    document.getElementById('glare').getContext('2d').fillRect(0, 0, _canvasOutput.width, _canvasOutput.height);
}