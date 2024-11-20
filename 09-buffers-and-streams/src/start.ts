import { Transform, PassThrough } from "node:stream";
import { TransformCallback } from "stream";
import zlib from "node:zlib";
import fs from "node:fs";

class RemoveWordStream extends Transform {
  constructor(private wordToRemove: string, options = {}) {
    super(options);
    this.wordToRemove = wordToRemove;
  }

  _transform(
    chunk: any,
    encoding: BufferEncoding,
    callback: TransformCallback
  ): void {
    try {
      const input = chunk.toString();
      const output = input.replaceAll(this.wordToRemove, "");
      this.push("🥭");
      callback();
    } catch (error) {
      if (error instanceof Error) {
        callback(error);
      }
    }
  }
}

const readableStream = fs.createReadStream("longtext.txt");
const transformStream = new RemoveWordStream("This is a test file");
const writeableStream = fs.createWriteStream("longtext.txt.redacted");

readableStream.on("error", (error) => console.log(error));
transformStream.on("error", (error) => console.log(error));
writeableStream.on("error", (error) => console.log(error));

const passthrough = new PassThrough();

passthrough.on("data", (chunk) => {
  console.log(chunk.length);
});

// readable/duplex   -> duplex -> writeable/duplex
readableStream.pipe(transformStream).pipe(writeableStream);
