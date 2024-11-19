import { fakeReq } from "./req";
import { test, expect } from "vitest";

test("calling with a url gets back a buffer", async () => {
  const result = await fakeReq("https://google.com");

  expect(Buffer.isBuffer(result)).toBe(true);
  expect(result.toString()).toMatchInlineSnapshot(
    `"{"name":"Kathrin","location":"Glasgow"}"`
  );
  expect(JSON.parse(result.toString())).to.have.property("location");
  expect(JSON.parse(result.toString())).toHaveProperty("name");
});

test("calling with error.com will throw an error", async () => {
  try {
    await fakeReq("http://error.com");
  } catch (error) {
    expect(error).toMatchInlineSnapshot(`[Error: Network error]`);
  }
});
