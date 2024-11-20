## **Lab: Enhancing the Stream Pipeline**

### **Objective**

- Extend the current stream pipeline to include:
  1. Logging data length using `PassThrough`.
  2. Compressing the redacted file using `zlib`.
  3. Error handling for robust processing.

---

### **Part 1: Add Logging Using `PassThrough`**

1. Modify the `passthrough` stream to log the number of bytes processed.
2. Pipe the data through the `passthrough` stream to observe changes in data length.

```javascript
const passthrough = new PassThrough();

passthrough.on("data", (chunk) => {
  console.log(`Chunk length: ${chunk.length} bytes`);
});

// Integrate passthrough into the pipeline
readableStream.pipe(transformStream).pipe(passthrough).pipe(writeableStream);
```

**Task**: Observe the byte size of the processed chunks. Does the size reduce after the transformation?

---

### **Part 2: Add Compression Using `zlib`**

1. Use the `zlib.createGzip()` stream to compress the redacted output.
2. Update the pipeline to write the compressed data to a `.gz` file.

```javascript
const gzipStream = zlib.createGzip();

// Update the writeable stream to include gzip compression
const compressedStream = fs.createWriteStream("longtext.txt.redacted.gz");

// Modify the pipeline
readableStream
  .pipe(transformStream)
  .pipe(passthrough)
  .pipe(gzipStream)
  .pipe(compressedStream);
```

**Task**: Compare the size of the original file, the redacted file, and the compressed file. How much space is saved?

---

### **Part 3: Test Error Handling**

1. Introduce an intentional error (e.g., use a non-existent file).
2. Observe how the pipeline handles the error.

Modify the `readableStream` to read from a non-existent file:

```javascript
const readableStream = fs.createReadStream("nonexistent.txt");
```

Add `error` listeners to all streams for better error reporting:

```javascript
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
```

**Task**: Observe the error logs. Are all errors caught and displayed correctly?

---

### **Part 4: Add CLI Argument for the Word to Remove**

1. Update the `RemoveWordStream` to take the word to remove from a command-line argument.

```javascript
const wordToRemove = process.argv[2] || "default";

const transformStream = new RemoveWordStream(wordToRemove);
```

Run the script with:

```bash
node lab.js "wordToRemove"
```

**Task**: Test with different words and verify that only the specified word is removed.

---

### **Final Pipeline**

```javascript
readableStream
  .pipe(transformStream)
  .pipe(passthrough)
  .pipe(gzipStream)
  .pipe(compressedStream);
```

---
