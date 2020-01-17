export function Exit (data) {
    this.name = data.name;
    this.descriptions = {
        short: data.descriptions.short,
        long: data.descriptions.long
    };
    this.lockedDescriptions = {
        short: data.descriptions.lockedShort,
        long: data.descriptions.lockedLong
    };
    this.requirement = data.requirement;
    this.requirementFulfilled = data.requirementFulfilled || true;
}