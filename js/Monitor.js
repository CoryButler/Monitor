function Monitor () {
    const _canvas = document.getElementById('screen');
    const _context = _canvas.getContext('2d');
    const _lineLimit = 28;
    const _numColumns = 80;
    
    const _gradient = _context.createRadialGradient(
        _canvas.width / 2, _canvas.height / 2, _canvas.height / 10,
        _canvas.width / 2, _canvas.height / 2, _canvas.height / 2);
    _gradient.addColorStop(0, "#114411");
    _gradient.addColorStop(1, "#002200");
    let _log = "";
    let _input = "> ";

    this.Log = function (l = null) { if (l !== null) { _log = l; UpdateScreen(); } else return _log; }
    this.Input = function (i = null) { if (i !== null) { _input = i; UpdateScreen(); } else return _input; }
    this.DirDisplay = function () { return dirDisplay; }

    _context.font = "16px Consolas";//"22px 'VT323', monospace";
    _context.textBaseline = 'top';
    
    const DrawToScreen = function (scroll) {
        let lines = _log.split("\n");

        while (lines.length >= _lineLimit) { lines.splice(0, 1); }

        _log = lines.join("\n");

        lines.push(_input);
        _context.fillStyle = "#00CC00";
        _context.filter = 'blur(4px)';
        for (let i = 0; i < lines.length; i++) {
            _context.fillText(lines[i], 20, i * 20 + scroll);
        }

        _context.filter = 'blur(2px)';
        for (let i = 0; i < lines.length; i++) {
            _context.fillText(lines[i], 20, i * 20 + scroll);
        } 
        
        _context.fillStyle = "#55FF55";
        _context.filter = 'none';
        for (let i = 0; i < lines.length; i++) {
            _context.fillText(lines[i], 20, i * 20 + scroll);
        }
    }

    const UpdateScreen = function () {
        ClearScreen();
        DrawToScreen(20);
    }

    const ClearScreen = function() {
        _context.fillStyle = _gradient;
        _context.fillRect(0, 0, _canvas.width, _canvas.height);
    }

    ClearScreen();

    setInterval(() => {
        ClearScreen();
        if (_input[_input.length - 1] !== '_')
            _input += '_';
        else
            _input = _input.substr(0, _input.length - 1);
        DrawToScreen(20);
    }, 500);
}