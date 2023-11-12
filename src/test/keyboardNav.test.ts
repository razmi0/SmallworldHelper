import { describe, it, expect } from "vitest";

const returnNbrFromId = (id: string) => {
  const idArray = id
    .split(".")
    .filter((el) => !isNaN(Number(el)))
    .map((el) => Number(el));

  return idArray;
};

describe("returnNbrFromId", () => {
  it("should return an array of number", () => {
    const id = "1.1";
    const result = returnNbrFromId(id);
    expect(result).toContain(1);
  });
});

describe("goLastOrFirstIndex", () => {
  it("should return the next index", () => {
    const arr = [1, 2, 3, 4, 5];
    const currentIndex = 4;
    const direction = "right";
    const result = goLastOrFirstIndex(currentIndex, arr.length, direction);
    expect(result).toBe(0);
  });

  it("should return the previous index", () => {
    const arr = [1, 2, 3, 4, 5];
    const currentIndex = 0;
    const direction = "left";
    const result = goLastOrFirstIndex(currentIndex, arr.length, direction);
    expect(result).toBe(4);
  });
});

const goLastOrFirstIndex = (currentIndex: number, size: number, direction: "left" | "right") => {
  if (direction === "right") {
    return currentIndex + 1 < size ? currentIndex + 1 : 0;
  }
  return currentIndex - 1 >= 0 ? currentIndex - 1 : size - 1;
};
