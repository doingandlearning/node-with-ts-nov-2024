import fs, { write } from "node:fs";

const writeStream = fs.createWriteStream("output.txt", { flags: "a" }); // to append to the file!

writeStream.write("This is some data.\n", (error) => {
  console.log(error);
});

writeStream.write("This is some more data.\n");

writeStream.end("Some text.\n");

// writeStream.write("Some more?");
