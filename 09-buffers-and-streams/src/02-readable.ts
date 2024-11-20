import fs, { read } from "node:fs";
import { EventEmitter } from "node:stream";

const readStream = fs.createReadStream("longtext.txt");

import http from "node:http";

const server = http.createServer();
console.log(server instanceof EventEmitter);

console.log(readStream instanceof EventEmitter);

let counter = 0;
readStream.on("data", (chunk) => {
  counter += 1;
  console.log(`${counter} chunk: `, chunk);
});

readStream.on("end", () => {
  console.log("all done");
});

readStream.on("close", () => {
  console.log("Closing the file");
});

readStream.on("error", (error) => {
  console.log(error);
});
