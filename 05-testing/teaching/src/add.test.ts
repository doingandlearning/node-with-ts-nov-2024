import { test, expect, describe } from "vitest";
import { add } from "./add";

test("the add function correctly adds two numbers", () => {
  // Arrange Act Assert
  // Given When Then
  const testCases = [
    [2, 3, 5],
    [-1, 0, -1],
    [9, 10, 19],
    [0.1, 0.3, 0.4],
  ]; // [a, b, result]

  // parameterizing our test  (@pytest.mark.parameterize())
  for (let testCase of testCases) {
    const result = add(testCase[0], testCase[1]);
    expect(result).toEqual(testCase[2]);
  }
});

// def test_throws_an_error_if_called_with
describe("unhappy path for the add function", () => {
  test("throws an error if called with non-number arguments", () => {
    expect(() => add(true as any, [] as any)).toThrow();
    expect(() =>
      add(true as any, [] as any)
    ).toThrowErrorMatchingInlineSnapshot(
      `[TypeError: Add function must only be called with numbers]`
    );
    expect(() => add(true as any, [] as any)).toThrowErrorMatchingSnapshot();
  });
});
