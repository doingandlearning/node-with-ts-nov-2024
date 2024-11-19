export function add(a: number, b: number) {
  if (typeof a !== "number" || typeof b !== "number") {
    throw new TypeError("Add function must only be called with numbers");
  }
  return a + b;
}
