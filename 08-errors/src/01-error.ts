import fs from "node:fs";

fs.readFile("file.txt", "utf-8", (err) => {
  console.log(err);
});

// Higher Order Fucntion
function applyToInteger(func: Function, integer: number, callback: Function) {
  if (typeof func !== "function") {
    callback(new TypeError("The first parameter must be a function."));
    return;
  }
  callback(null, func(integer));
}

const double = (x: number) => x * 2;

applyToInteger(double, 10, (err, result) => {
  if (err) {
    console.log(err);
    return;
  }
  console.log(result);
});
