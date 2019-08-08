function Monitor () {
    const _canvasOutput = document.getElementById('output');
    const _contextOutput = _canvasOutput.getContext('2d');
    const _canvasInput = document.getElementById('input');
    const _contextInput = _canvasInput.getContext('2d');
    const _lineLimit = 28;
    const _numColumns = 80;

    let _log = "";
    let _input = "> ";

    this.Log = function (l = null) { if (l !== null) { _log = l; UpdateOutput(); _input = "> "; UpdateInput();} else return _log; }
    this.Input = function (i = null) { if (i !== null) { _input = i; UpdateInput(); } else return _input; }
    this.DirDisplay = function () { return dirDisplay; }

    _contextOutput.font = "16px Consolas";
    _contextOutput.textBaseline = 'top';

    _contextInput.font = "16px Consolas";
    _contextInput.textBaseline = 'top';
    
    const DrawOutput = function () {
        console.log("O");
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

    const DrawInput = function () {
        console.log("I");
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

    const UpdateOutput = function () {
        Clear(_contextOutput);
        DrawOutput();
    }

    const UpdateInput = function () {
        Clear(_contextInput);
        DrawInput();
    }

    const Clear = function (context) {
        context.clearRect(0, 0, _canvasOutput.width, _canvasOutput.height);
    }

    setInterval(() => {
        if (_input[_input.length - 1] !== '_')
            _input += '_';
        else
            _input = _input.substr(0, _input.length - 1);
        UpdateInput();
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

    //setTimeout(() => DrawOutput(), 1000);
}