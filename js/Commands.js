;function Commands () {
    let commands = {
        clear: (option) => new Clear(option),
        describe: (option) => new Describe(option),
        echo: (option) => new Echo(option),
        help: (option) => new Help(option),
        link: (option) => new Link(option),
        look: (option) => new Look(option),
        message: (option) => new Message(option),
        read: (option) => new Read(option),
        status: (option) => new Status(option),
        unlink: (option) => new Unlink(option),
        vars: (option) => new Vars(option),
    } 

    this.Execute = (name, option = null) => {
        commands[name](option);
    }
}

export {Commands};