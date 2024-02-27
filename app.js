const fs = require("fs");
const path = require("path");
const os = require("os");
const http = require("http");
const Logger = require("./logger");
const logger = new Logger();
const server = http.createServer((req, res) => {
  if (req.url === "/") {
    res.write("hello user");
    res.end();
  }
  if (req.url === "/api/course") {
    // res.write("course loading");
    // res.end();
  }
});
let pathObj = path.parse(__filename);
let totalMemory = os.totalmem();
let freeMemory = os.freemem();
let files = fs.readdirSync("/Users/bibhu.bhuyan/Downloads");
// let asFiles = fs.readdir("/Users/bibhu.bhuyan/Downloads", (err, files) => {
//   if (err) console.log("error", err);
//   else console.log("result", files);
// });

logger.on("messagelogged", (arg) => {
  console.log("listner called ", arg);
});

logger.log("message");

server.listen(3000);
console.log("server listning at port 3000");
// emitter.emit('messagelogged',{id:3,url:'https://bfdnbndf'});
// console.log("hi how are you");
// console.log(pathObj);
// console.log(`total memory : ${totalMemory} and free memory: ${freeMemory}`);
// console.log(files);
