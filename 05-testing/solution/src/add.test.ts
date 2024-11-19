import { expect, test } from "vitest";
import add from "./add";

// Exercise 1
test("Test that add returns the correct result from two numbers", () => {
  expect(add(2, 3)).toBe(5);
  expect(add(10, 20)).toBe(30);
});

// Exercise 2
test("Test that the add works with negative numbers", () => {
  expect(add(-2, 3)).toBe(1);
  expect(add(10, -20)).toBe(-10);
  expect(add(-5, -5)).toBe(-10);
});

// Exercise 3
test("Test that there will be an error if you pass in non-numbers", () => {
  expect(() => add("2" as any, 3)).toThrow(TypeError);
  expect(() => add(2, "3" as any)).toThrow(TypeError);
  expect(() => add("2" as any, "3" as any)).toThrow(TypeError);
});

// Additional tests
test("Test that add works with zero", () => {
  expect(add(0, 0)).toBe(0);
  expect(add(0, 5)).toBe(5);
  expect(add(5, 0)).toBe(5);
});

test("Test that add works with large numbers", () => {
  expect(add(1000000, 2000000)).toBe(3000000);
  expect(add(-1000000, -2000000)).toBe(-3000000);
  expect(add(1000000, -2000000)).toBe(-1000000);
});
