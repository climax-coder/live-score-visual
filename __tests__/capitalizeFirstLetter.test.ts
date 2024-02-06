import capitalizeFirstLetter from "@/utils/capitalizeFirstLetter";

describe("capitalizeFirstLetter", () => {
  it("should capitalize the first letter of a string", () => {
    const input = "hello";
    const expectedOutput = "Hello";
    expect(capitalizeFirstLetter(input)).toBe(expectedOutput);
  });

  it("should return an empty string if provided an empty string", () => {
    const input = "";
    const expectedOutput = "";
    expect(capitalizeFirstLetter(input)).toBe(expectedOutput);
  });

});