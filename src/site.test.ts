import { describe, expect, it } from "vitest";

import { garbarUrl } from "./site";

describe("garbarUrl", () => {
  it("opens GarBar's site in the page's language", () => {
    expect(garbarUrl("en")).toBe("https://garbar.tech/en/");
    expect(garbarUrl("es")).toBe("https://garbar.tech/es/");
    expect(garbarUrl("ca")).toBe("https://garbar.tech/ca/");
  });
});
