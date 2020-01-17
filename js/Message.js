export function Message (data) {
    this.sender = data.sender || "???";
    this.subject = data.subject || "???";
    this.time = data.time || "???";
    this.body = data.body || "???";
    this.to = data.to || "???";
}