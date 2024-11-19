import { expect, test } from "vitest";
import getSinguralOrPlural from "./singularOrPlural";

// Exercise 4
test("Will return singular for value of 1", () => {
  expect(getSinguralOrPlural(1, "woman", "women")).toBe("woman");
});

test("Will return plural for value of 0", () => {
  expect(getSinguralOrPlural(0, "person", "people")).toBe("people");
});

test("Will return plural for value greater than 1", () => {
  expect(getSinguralOrPlural(2, "person", "people")).toBe("people");
});

test("Will throw for a negative", () => {
  expect(() => getSinguralOrPlural(-1, "person", "people")).toThrow(
    "The first parameter needs to be a number 0 or higher"
  );
});

test("Will throw for a non-numeric value", () => {
  expect(() => getSinguralOrPlural("a" as any, "person", "people")).toThrow(
    "The first parameter needs to be a number 0 or higher"
  );
});
