import { describe, expect, test, beforeEach } from "vitest";
import { Cache } from "./pokecache.js";

describe("Cache", () => {
  let cache: Cache;

  beforeEach(() => {
    cache = new Cache(100);
  });

  test.concurrent.each([
    { key: "a", value: 1 },
    { key: "b", value: "test" },
    { key: "c", value: { foo: "bar" } },
  ])("should store and retrieve value for key: $key", async ({ key, value }) => {
    cache.add(key, value);
    expect(cache.get<typeof value>(key)).toEqual(value);
  });

  test("should return undefined for missing key", () => {
    expect(cache.get("missing")).toBeUndefined();
  });

  test("should remove expired entries after interval", async () => {
    cache.add("expire", 42);
    expect(cache.get<number>("expire")).toBe(42);
    let expired = false;
    for (let i = 0; i < 10; i++) {
      await new Promise((r) => setTimeout(r, 50));
      if (cache.get("expire") === undefined) {
        expired = true;
        break;
      }
    }
    expect(expired).toBe(true);
  });

  test("should not remove unexpired entries", async () => {
    cache.add("keep", "alive");
    await new Promise((r) => setTimeout(r, 50));
    expect(cache.get("keep")).toBe("alive");
  });

  test("should stop the reap loop without error", () => {
    cache.stopReapLoop();
  });
});