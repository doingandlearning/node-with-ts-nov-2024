async function run() {
  throw Error("This is the error");
}

async function main() {
  try {
    await run();
  } catch (error) {
    console.log("This will never be called!");
  }
}

// run().catch((error) => {
//   console.log("This is in the catch block", error);
// });
main();
console.log("This will called before the error prints");
