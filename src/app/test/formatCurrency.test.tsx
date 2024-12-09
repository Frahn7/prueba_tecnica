import { describe, it, expect } from "vitest";
import { formatCurrency } from "../utils/format";

describe("formatCurrency", () => {
  it("should format positive numbers correctly", () => {
    const result = formatCurrency(123456.789);
    expect(result).toBe("$ 123,456.79");
  });

  it("should format zero correctly", () => {
    const result = formatCurrency(0);
    expect(result).toBe("$ 0.00");
  });

  it("should format negative numbers correctly", () => {
    const result = formatCurrency(-123456.789);
    expect(result).toBe("($ 123,456.79)");
  });

  it("should handle large numbers correctly", () => {
    const result = formatCurrency(987654321.123);
    expect(result).toBe("$ 987,654,321.12");
  });
});
