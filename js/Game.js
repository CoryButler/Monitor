import { Keyboard } from "./Keyboard.js";
import { Monitor } from "./Monitor.js";
import { User } from "./User.js";
import { Commands } from "./Commands.js";
import { Party } from "./Party.js";
import { Character } from "./Character.js";
import { Message } from "./Message.js";

export function Game () {
    const _keyboard = new Keyboard();
    const _monitor = new Monitor();
    const _user = new User();
    const _commands = new Commands(this);
    const _party = new Party();
    this.messages = [
        new Message({ sender: "jreinhart@automasoft.ll", subject: "Restore Link Command", to: "qa@automasoft.ll", time: "112183:0622", body: "Some terminals on floor 020 are still experiencing the unlink issue. As of this morning, I have been told that two different terminals dropped the link and/or unlink command when not linked to a mech on start-up. If the link command is not activited at your terminal, enter \"add link terminal##\" using your terminal's id. The terminal id can be found by entering \"help\" or \"status\". Any other questions, see me.\n  Jeffery R. - LiveLink Technical Supervisor" }),
        new Message({ sender: "tamos@automasoft.ll", subject: "Manullay Linking to a Manomech", to: "qa@automasoft.ll", time: "111883:1343", body: "QA Staff,\n  Reminder for Monday, as ALL enters phase 6 development, please be sure that manomech system diagnostics are to be run daily. Please turn in logs to me. Any logs marked \"urgent\" should be brought to Erin's attention (ll-message-service: eross@automasoft.ll, room: 007.B) emmediately.\n  Also, Jeff is aware of the ongoing unlink issue on floor 020. You do not need to notify him if no manomech is linked to your terminal when LiveLink starts up. Just go ahead and link to a mech yourself. To link to a manomech use the link command and pass the desired manomech's id (\"link manomech01\"). To get a list of available manomechs, just enter \"link\".\n  Thomas A. - QA Director" }),
        new Message({ sender: "tamos@automasoft.ll", subject: "ALL Phase 5 Wrap-Up", to: "qa@automasoft.ll", time: "111483:1508", body: "QA Staff,\n  As you know, ALL phase 5 wraps on Wednesday. Edwards has decided to push up the phase 6 launch data to next Monday. Please begin compiling your test notes and system logs now so they can be turned in by EOB on Wednesday. Please drop off completed reports to me (010.A).\n  Thomas A. - QA Director" }),
        new Message({ sender: "dsmith@automasoft.ll", subject: "re.re.906.11 Interface", to: "cwittman@automasoft.ll", time: "122082:0815", body: "Chelsea,\n  I know I complain about this with every update, but man does the interface stink. Now we've got to type out \"manomech\" every time we want to link? What was wrong with just passing the mech's id? What else would I possible want to link to? It's totally bogus. And right before Christmas too. Thanks a lot! By the way, are you going to the office party?\n  Domanic S. - QA Tester" }),
        new Message({ sender: "dsmith@automasoft.ll", subject: "906.11 Interface", to: "cwittman@automasoft.ll", time: "122082:0815", body: "Chelsea,\n  I know I complain about this with every update, but man does the interface stink. Now we've got to type out \"manomech\" every time we want to link? What was wrong with just passing the mech's id? What else would I possible want to link to? It's totally bogus. And right before Christmas too. Thanks a lot! By the way, are you going to the office party?\n  Domanic S. - QA Tester" })
    ];
    let _characters = [
        new Character({ name: "terminal33", location: "020.B", commands: [_commands.list._start, _commands.list.add, _commands.list.clear, _commands.list.help, _commands.list.message, _commands.list.status, _commands.list.unlink], canLearn: [_commands.list.link] }),
        new Character({ name: "manomech44", location: "013.A", commands: [_commands.list.look, _commands.list.describe] }),
        new Character({ name: "manomech53", location: "014.D", commands: [_commands.list.look, _commands.list.describe] })
    ];
    _party.addMember(_characters[0]);

    let _recentCommands = ["> "];
    let _currentCommand = 0;
    let _commandsLimit = 10;

    this.characters = () => { return _characters; }
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
    execute(["_start"]);
}