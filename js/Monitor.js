function Monitor (canvas) {
    const _canvas = document.getElementById(canvas);
    const _context = _canvas.getContext('2d');

    _context.font = '16px Arial';
    _context.fillStyle = "#00FF00";
    _context.fillText("This is a test.", 10, 50);
    _context.fillStyle = "#00cc00";
    _context.filter = 'blur(2px)';
    _context.fillText("This is a test.", 10, 50);
}