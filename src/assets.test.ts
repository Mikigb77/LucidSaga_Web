import { readFileSync } from "node:fs";

import { describe, expect, it } from "vitest";

/** A WebP's width and height, from its header (lossy VP8, lossless VP8L or extended VP8X). */
function webpSize(bytes: Buffer) {
  expect(bytes.toString("ascii", 0, 4)).toBe("RIFF");
  expect(bytes.toString("ascii", 8, 12)).toBe("WEBP");
  const chunk = bytes.toString("ascii", 12, 16);
  if (chunk === "VP8X") return { width: 1 + bytes.readUIntLE(24, 3), height: 1 + bytes.readUIntLE(27, 3) };
  if (chunk === "VP8 ")
    return { width: bytes.readUInt16LE(26) & 0x3fff, height: bytes.readUInt16LE(28) & 0x3fff };
  if (chunk === "VP8L") {
    const bits = bytes.readUInt32LE(21);
    return { width: 1 + (bits & 0x3fff), height: 1 + ((bits >> 14) & 0x3fff) };
  }
  throw new Error(`unknown WebP chunk ${chunk}`);
}

describe("the hero's gate", () => {
  const gate = readFileSync(new URL("./assets/gate.webp", import.meta.url));

  it("is sharp on a retina screen: the hero shows it up to 1000 px wide", () => {
    expect(webpSize(gate)).toEqual({ width: 2000, height: 2000 });
  });

  it("stays light enough to load first", () => {
    expect(gate.length).toBeLessThan(220 * 1024);
  });
});
