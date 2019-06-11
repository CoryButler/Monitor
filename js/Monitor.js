function Monitor (canvas) {
    const _canvas = document.getElementById(canvas);
    const _context = _canvas.getContext('2d');
    const _numColumns = 80;

    let lines = [];
    for (let i = 0; i < 32; i++)
    lines.push( "01234567890123456789012345678901234567890123456789012345678901234567890123456789" );

    _context.font = "1.5em DisposableDroidBB";
    _context.textBaseline = 'top';

    _context.fillStyle = "#00FF00";
    for (let i = 0; i < lines.length; i++) {
    _context.fillText(lines[i], 20, i * 20 + 20);
    }
    _context.filter = 'blur(3px)';
    _context.fillStyle = "#00CC00";
    
    for (let i = 0; i < lines.length; i++) {
        _context.fillText(lines[i], 20, i * 20 + 20);
    }
    _context.filter = 'blur(6px)';
    _context.fillStyle = "#77FF77";
    
    for (let i = 0; i < lines.length; i++) {
        _context.fillText(lines[i], 20, i * 20 + 20);
    }
}