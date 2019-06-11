function Keyboard () {
    const _validKeys = ("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz.?\\1234567890 ").split("");

    this.IsValidKey = function (key) {
        return _validKeys.some(k => k === key);
    }
}