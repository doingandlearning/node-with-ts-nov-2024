export default function add(a: number, b: number) {
  if (typeof a != "number" || typeof b != "number") {
    throw new TypeError("You need to pass in numbers.");
  }
  return a + b;
}
