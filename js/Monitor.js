function Monitor (defaultLog) {
    const _canvas = document.getElementById('screen');
    const _context = _canvas.getContext('2d');
    const _numColumns = 80;
    let log = defaultLog;

    this.DirDisplay = function () { return dirDisplay; }

    _context.font = "20px DisposableDroidBB";
    _context.textBaseline = 'top';
    
    const DrawText = function (lines, scroll) {
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

    const DrawShape = function (shape) {
        _context.lineWidth = 2;
        _context.strokeStyle = "#00CC00";
        _context.filter = 'blur(4px)';
        _context.beginPath();
        _context.arc(100, 75, 50, 0, 2 * Math.PI);
        _context.stroke();

        _context.filter = 'blur(2px)';
        _context.beginPath();
        _context.arc(100, 75, 50, 0, 2 * Math.PI);
        _context.stroke();
        
        _context.strokeStyle = "#55FF55";
        _context.filter = 'none';
        _context.beginPath();
        _context.arc(100, 75, 50, 0, 2 * Math.PI);
        _context.stroke();
    }

    setInterval(() => {
        _context.clearRect(0, 0, _canvas.width, _canvas.height);
        let lastLine = log[log.length - 1]
        if (lastLine[lastLine.length - 1] !== '_')
            log[log.length - 1] += '_';
        else 
            log[log.length - 1] = log[log.length - 1].substr(0, log[log.length - 1].length - 1);
        
        DrawText(log, 20);
    }, 500);

    

    this.UpdateLog = function (newLog, immediate) {
        log = newLog;
        if (immediate) {
            _context.clearRect(0, 0, _canvas.width, _canvas.height);
            DrawText(log, 20);
        }
    }
}