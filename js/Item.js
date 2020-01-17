export function Item (data) {
    this.name = data.name;
    this.descriptions = {
        short: data.descriptions.short,
        long: data.descriptions.long
    };
    this.canTake = data.canTake || true;
    this.consumable = data.consumable || true;
}