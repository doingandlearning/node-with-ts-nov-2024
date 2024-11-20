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
      const output = input.replaceAll("\n\n", "\n"); // do our formatting and tidying

      this.push(output);
      callback();
    } catch (error) {
      if (error instanceof Error) {
        callback(error);
      }
    }
  }
}

// Get the word to remove from CLI arguments or use a default
const wordToRemove = process.argv[2] || "default";

// Create streams
const readableStream = fs.createReadStream("longtext.txt");
const transformStream = new RemoveWordStream(wordToRemove);
const passthrough = new PassThrough();
const gzipStream = zlib.createGzip();
const compressedStream = fs.createWriteStream("longtext.txt.redacted.gz");

// Add error listeners for better debugging
readableStream.on("error", (error) =>
  console.error("Read Stream Error:", error)
);
transformStream.on("error", (error) =>
  console.error("Transform Stream Error:", error)
);
passthrough.on("error", (error) =>
  console.error("PassThrough Stream Error:", error)
);
compressedStream.on("error", (error) =>
  console.error("Write Stream Error:", error)
);

// Use the PassThrough stream to log chunk sizes
passthrough.on("data", (chunk) => {
  console.log(`Chunk length: ${chunk.length} bytes`);
});

// Pipeline to process the file
readableStream
  .pipe(transformStream) // Remove specified word
  .pipe(passthrough) // Log chunk sizes
  .pipe(gzipStream) // Compress the data
  .pipe(compressedStream); // Write to a compressed file

console.log("Pipeline set up. Processing file...");

// openaiStream.pipe(transformStream).pipe(frontEnd);
