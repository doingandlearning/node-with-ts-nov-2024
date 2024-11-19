import { expect, test } from "vitest";
import filterBiggestNumbers from "./filterBiggest";

// Exercise 5
test("Will throw if the first parameter is not an array", () => {
  expect(() => filterBiggestNumbers("not an array" as any, 0)).toThrow(
    "The first argument must be an array"
  );
});

test("Will return correct output for reasonable input", () => {
  const testArray = [1, -3, 8, 7];
  const result = filterBiggestNumbers(testArray, 0);
  const expectedValues = [1, 8, 7];
  const rejectValues = [-3];

  expectedValues.forEach((value) => {
    expect(result).toContain(value);
  });

  rejectValues.forEach((value) => {
    expect(result).not.toContain(value);
  });
});

test("Will throw if the second argument is not a number", () => {
  expect(() => filterBiggestNumbers([1, 2, 3], "not a number" as any)).toThrow(
    "The second argument must be a number"
  );
});

test("Will work if the second number is not an integer", () => {
  const testArray = [1.5, 2.5, 3.5, 4.5];
  const result = filterBiggestNumbers(testArray, 2.5);
  const expectedValues = [3.5, 4.5];
  const rejectValues = [1.5, 2.5];

  expectedValues.forEach((value) => {
    expect(result).toContain(value);
  });

  rejectValues.forEach((value) => {
    expect(result).not.toContain(value);
  });
});

test("Will work if the min is a negative number", () => {
  const testArray = [-10, -5, 0, 5, 10];
  const result = filterBiggestNumbers(testArray, -5);
  const expectedValues = [0, 5, 10];
  const rejectValues = [-10, -5];

  expectedValues.forEach((value) => {
    expect(result).toContain(value);
  });

  rejectValues.forEach((value) => {
    expect(result).not.toContain(value);
  });
});
