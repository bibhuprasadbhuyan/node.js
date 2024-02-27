const EventEmitter = require("events");
let url = "http://myloger.com";

class Logger extends EventEmitter {
  log(msg) {
    console.log(msg);
    this.emit("messagelogged", { id: 3, url: "https://bfdnbndf" });
  }
}

module.exports = Logger;
