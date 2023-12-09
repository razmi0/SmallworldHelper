import { describe, it, expect, afterEach } from "vitest";
import { cleanup } from "@testing-library/react";

const START_TEST_ARRAY = [false, false, false];
const NEW_LENGTH_5 = 5;
const NEW_LENGTH_2 = 2;
const NEW_LENGTH_3 = 3;
const EXPECTED_ARRAY = [false, false, false, false, false];

/* .test in useStorageState hook to resize numbers of players  */
export const resizeArray = <T>(originalArray: T[], newSize: number, fillValue: T): T[] => {
  return [
    ...originalArray.slice(0, newSize),
    ...new Array(Math.max(newSize - originalArray.length, 0)).fill(fillValue),
  ];
};

afterEach(() => {
  cleanup();
});

describe("resizeArray", () => {
  it("should return an array with no change", () => {
    const arr = resizeArray(START_TEST_ARRAY, NEW_LENGTH_3, false);
    expect(arr.length).toEqual(3);
    expect(arr).toEqual([false, false, false]);
  });

  it("should return an array with 2 elements", () => {
    const arr = resizeArray(START_TEST_ARRAY, NEW_LENGTH_2, false);
    expect(arr.length).toEqual(2);
    expect(arr).toEqual([false, false]);
  });

  it("should return an array with 5 elements", () => {
    const arr = resizeArray(START_TEST_ARRAY, NEW_LENGTH_5, false);
    expect(arr.length).toEqual(5);
    expect(arr).toEqual(EXPECTED_ARRAY);
  });
});
