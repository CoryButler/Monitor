import { Keyboard } from "./Keyboard.js";
import { Monitor } from "./Monitor.js";
import { User } from "./User.js";
import { Commands } from "./Commands.js";
import { Party } from "./Party.js";
import { Character } from "./Character.js";
import { Message } from "./Message.js";
import { loadJSON } from "./json.js";

export function Game () {
    const _keyboard = new Keyboard();
    const _monitor = new Monitor();
    const _user = new User();
    const _commands = new Commands(this);
    const _party = new Party();
    this.messages = [];
    this.characters = [];
    let _recentCommands = ["> "];
    let _currentCommand = 0;
    let _commandsLimit = 10;

    this.party = () => { return _party; }
    this.monitor = function () { return _monitor; }
    this.user = function () { return _user; }
    this.vars = { author: "Cory" };

    const keyUp = (evt) => {
        if (!_monitor.inputEnabled) return;
        let key = evt.key;

        let input = _monitor.input();
        let hasInsertion = false;
        if (input[input.length - 1] === '_') {
            input = input.substr(0, input.length - 1);
            hasInsertion = true;
        }

        if (key === "Backspace" && input.length > 2) {
            input = input.substr(0, input.length - 1) + (hasInsertion ? '_' : '');
            _monitor.input(input);
        }
        else if (key === "Enter" && input.trim() !== ">") {
            if (input !== _recentCommands[_recentCommands.length - 1]) _recentCommands.push(input);
            if (_recentCommands.length > _commandsLimit) _recentCommands.splice(0, 1);
            _currentCommand = _recentCommands.length;
            _monitor.log("\n" + input, false);
            execute(input.substr(2).trim().split(' '));
        }
        else if (key === "ArrowUp") {
            _currentCommand = _currentCommand - 1 >= 0 ? _currentCommand - 1 : 0;
            input = _recentCommands[_currentCommand] + (hasInsertion ? '_' : '');
            _monitor.input(input);
        }
        else if (key === "ArrowDown") {
            _currentCommand = _currentCommand + 1 < _recentCommands.length ? _currentCommand + 1 : _recentCommands.length - 1;
            input = _recentCommands[_currentCommand] + (hasInsertion ? '_' : '');
            _monitor.input(input);
        }
        else if (_keyboard.isValidKey(key) && input.length < 80) {
            input += key + (hasInsertion ? '_' : '');
            _monitor.input(input);
        }
    }

    const execute = function (input) {
        if (input[0] === "?") input[0] = "help";
        for (let i = 2; i < input.length; i++) input[1] += " " + input[i];
        _commands.execute(input[0], input[1]);
    }
    
    // Constructor
    document.addEventListener("keyup", keyUp);
    loadJSON("messages", (data) => { data.messages.forEach(message => { this.messages.push(new Message(message)); }); });
    loadJSON("characters", (data) => { data.characters.forEach(character => { this.characters.push(new Character(character)); }); _party.addMember(this.characters[0]); execute(["_start"]); });
}