export function Commands (game) {
    this.list = {
        _start: new Start(game),
        add: new AddCommand(game, this),
        clear: new Clear(game),
        describe: new Describe(game),
        echo: new Echo(game),
        help: new Help(game, this),
        link: new Link(game),
        look: new Look(game),
        message: new Message(game),
        status: new Status(game),
        unlink: new Unlink(game),
        vars: new Vars(game)
    } 

    this.execute = (name, option = null) => {
        const tempList = [];
        game.party().members.forEach(m => m.commands.forEach(c => tempList.push(c.name)));
        
        if (tempList.some(tl => tl.split(" ")[0] === name))
            this.list[name].run(option);
        else
            game.monitor().log(`ERROR: Command "${name}" not found.\nEnter "help" for a list of available commands.`)
    }

    this.getCommands = () => { return this.list; }
}

function AddCommand (game, commands) {
    this.name = "add [command] [entity]";
    this.description = "adds a command to an entity";
    this.help = "Adds a specified command to a specified entity. Takes 2 parameters.\nParameter 1: name of command to be added\nParameter 2: name of entity to receive the command";
    this.run = (option) => {
        if (option === null) {
            game.monitor().log("ERROR: Command or entity not defined");
            return;
        }

        let vars = option.split(" ");
        if (vars.length < 2)
            game.monitor().log("ERROR: Command or entity not defined");
        else if (commands.list[vars[0]] === undefined)
            game.monitor().log(`ERROR: Command "${vars[0]}" not found`);
        else if (!game.party().members.some(m => m.name === vars[1]))
            game.monitor().log(`ERROR: Entity "${vars[1]}" not found`);
        else if (game.party().members.find(m => m.name === vars[1]).canLearn.find(c => c.name.split(" ")[0] === vars[0]) === undefined)
            game.monitor().log(`ERROR: Cannot add command "${vars[0]}" to entity "${vars[1]}"`)
        else {
            const command = commands.list[vars[0]];
            const character = game.party().members.find(m => m.name === vars[1]);
            character.addCommand(command);
            game.monitor().log(`Command "${vars[0]}" added to ${vars[1]}`);
        }
    }
}

function Clear (game) {
    this.name = "clear";
    this.description = "clears all text from terminal";
    this.help = "Clears all text from the terminal. Takes 0 parameters.";
    this.run = () => { game.monitor().clear(); }
}

function Describe (game) {
    this.name = "describe";
    this.description = "describes surroundings";
    this.help = "Describes the active manomech's immediate surroundings. Takes 0 parameters.";
    this.run = () => { 
        let request = new XMLHttpRequest();
        request.open("GET", "./rooms/" + game.user().room + "/describe.txt", false);
        request.onreadystatechange = function () {
            if(request.readyState === 4 && (request.status === 200 || request.status == 0))
                game.monitor().log(request.responseText);
        }
        try { request.send(null); }
        catch {
            game.monitor().log("error: command failed");
        }
    }
}

function Echo (game) {
    this.name = "echo [message]";
    this.description = "prints the text of the first parameter";
    this.help = "Prints the text of the first parameter. Takes 1 parameter.";
    this.run = (option) => {
        game.monitor().log(option);
    }
}

function Help (game, commands) {
    this.name = "help [command]";
    this.description = "provides details on commands";
    this.help = "Provides additional details on commands. Takes 1 parameter.\nIf 0 parameters are passed, provides list of available commands.\nParameter 1: name of command.";
    this.run = (option) => { 
        if (option === null) {
            let str = "";
            game.party().members.forEach(m => {
                str += m.name;
                m.commands.forEach(c => {
                    if (c.name[0] !== "_") str += `\n  ${c.name} - ${c.description}`;
                });
            });
            game.monitor().log(str);
        }
        else if (commands.getCommands()[option] !== undefined)
            game.monitor().log(commands.getCommands()[option].help);
        else
            game.monitor().log(option + " is not a command. No help available.");
    }
}

function Link (game) {
    this.name = "link [id]";
    this.description = "establish LiveLink to manomech based on id";
    this.help = "Establish LiveLink to a manomech based on the passed id. Takes 1 parameter.\nIf 0 parameters are passed, provides list of ids of the available manomechs.\nParameter 1: id of desired manomech.";
    this.run = (option) => {
        if (game.party().members.length > 1) {
            game.monitor().log(`LiveLink in progress: ${game.party().members[0].name}.${game.party().members[1].name}`);
        }
        else {
            if (option === "") option = "[noID]";
            if (game.characters().some(c => c.name === option)) {
                let character;
                game.characters().forEach(c => { if (c.name === option) character = c; });
                game.party().addMember(character);
                game.monitor().log(`LiveLink established: ${game.party().members[0].name}.${game.party().members[1].name}`);
            }
            else {
                let mIds = "";
                game.manomechs.forEach(m => {
                    mIds += `  ${m.id}\n`;
                });
                game.monitor().log("manomech_" + option +" is not available\nmanomech id list:\n" + mIds);
            }
        }
    }
}

function Look (game) {
    this.name = "look";
    this.description = "look at the room";
    this.help = "Look at the room the manomech is in. Takes 0 parameters.";
    this.run = () => {
        if (!game.user().id.includes(".")) {
            game.monitor().log("no LiveLink detected");
            return;
        }    
    
        let request = new XMLHttpRequest();
        request.open("GET", "./rooms/" + game.party().members[game.party().members.length - 1].room + "/look.txt", false);
        request.onreadystatechange = function () {
            if(request.readyState === 4 && (request.status === 200 || request.status == 0))
                game.monitor().log(request.responseText);
        }
        try { request.send(null); }
        catch {
            game.monitor().log("error: command failed");
        }
    }
}

function Message (game) {
    this.name = "message [id]";
    this.description = "displays messages based on id";
    this.help = "Displays a message based on the passed id. Takes 1 parameter.\nIf 0 parameters are passed, displays a list of message ids.\nParameter 1: id of desired message.";
    this.run = (option) => {
        if (option === null) {
            let str = `${game.messages.length} Messages:`;
            game.messages.forEach((m, i) => {
                str += `\n \n  id: ${i}   subject: ${m.subject}\n          from: ${m.sender}  at: ${m.time}\n          to: ${m.to}`
            });
            game.monitor().log(str);
        }
        else if (isNaN(parseInt(option)) || parseInt(option) < 0 || parseInt(option) >= game.messages.length) {
            game.monitor().log(`ERROR: Message ${option} not found\nEnter \"message\" for a list of message ids`);
        }
        else {
            game.monitor().log(`from: ${game.messages[option].sender}  at: ${game.messages[option].time}\nto: ${game.messages[option].to}\nsubject: ${game.messages[option].subject}\n \n${game.messages[option].body}`);
        }
    }
}

function Start (game) {
    this.name = "_start";
    this.description = "";
    this.help = "";
    this.run = () => {
        let request = new XMLHttpRequest();
        request.open("GET", "./game/_start.txt", false);
        request.onreadystatechange = function () {
            if(request.readyState === 4 && (request.status === 200 || request.status == 0)) {
                game.monitor().log(request.responseText);
            }
            else {
                game.monitor().log("error: could not access startup.x\nstatus: terminal33 operational\nFor help, enter \"help\".");
            }
        }
        request.send(null);
    }
}

function Status (game) {
    this.name = "status";
    this.description = "displays session details";
    this.help = "Displays session details. Takes 0 parameters.";
    this.run = () => {
        let str = "";
        game.party().members.forEach(member => {
            str += member.status() + "\n";
        });
        game.monitor().log(str);
    }
}

function Unlink (game) {
    this.name = "unlink";
    this.description = "terminate LiveLink to manomech";
    this.help = "Terminate LiveLink to the active manomech. Takes 0 parameters.";
    this.run = () => {
        if (game.party().members.length <= 1) {
            game.monitor().log("no LiveLink detected\n");
        }
        else {
            let member = game.party().members[game.party().members.length - 1];
            if (game.party().members.length > 1) {
                game.monitor().log("LiveLink terminated");
                game.party().removeMember(member);
            }
        }
    }
}

function Vars (game) {
    this.name = "vars";
    this.description = "displays a list of system variables";
    this.help = "Displays a list of system variables. Takes 0 parameters.";
    this.run = () => {
        Object.keys(game.vars).forEach(key => {
            game.monitor().log(key + ": " + game.vars[key]);
        });
    }
}