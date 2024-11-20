function run() {
  // throw "Anything I want";
  try {
    throw new Error("I'm in my run function!");
  } catch (error) {
    if (error instanceof Error) {
      if (error instanceof TypeError) {
        console.log(`Your variables were of the wrong type: ${error.message}`);
      } else {
        console.log(`Something unknown happened: ${error.message}`);
        throw error;
        // next(error)
      }
    }
  }
}

try {
  run();
} catch (error) {
  console.log(error);
}

// Here!
