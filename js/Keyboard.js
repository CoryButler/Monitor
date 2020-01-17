export function Keyboard () {
    const _validKeys = ("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz.?\\1234567890 ").split("");

    this.isValidKey = function (key) {
        return _validKeys.some(k => k === key);
    }
}