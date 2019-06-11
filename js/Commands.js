function Commands() {
    this.Execute = function (input) {
        let command = input[0].toLowerCase();
        
        switch (command)
        {
            case "run":
                return Run(input[1]);
        }
    }

    const Run = function (file) {
        return "running " + file + "...";
    }
}