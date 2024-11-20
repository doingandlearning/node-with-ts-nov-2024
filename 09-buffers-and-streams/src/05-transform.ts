import zlib from "node:zlib";
import fs from "node:fs";

const readableStream = fs.createReadStream("longtext.txt");
const transformStream = zlib.createGzip();
const writeableStream = fs.createWriteStream("longtext.txt.gz");

readableStream.on("error", (error) => console.log(error));
transformStream.on("error", (error) => console.log(error));
writeableStream.on("error", (error) => console.log(error));

readableStream.pipe(transformStream).pipe(writeableStream);
