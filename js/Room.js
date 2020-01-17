import { Item } from "./Item";
import { Exit } from "./Exit";

export function Room (data) {
    this.descriptions = {
        short = data.descriptions.short,
        long = data.descriptions.long
    };

    this.items = [];    
    data.items.forEach(item => this.items.push(new Item(item)));
    
    this.exits = [];
    data.exits.forEach(exit => this.exits.push(new Exit(exit)));
}