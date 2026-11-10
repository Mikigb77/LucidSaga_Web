import { describe, expect, it } from "vitest";

import { garbarUrl, taskflowUrl } from "./site";

describe("garbarUrl", () => {
  it("opens GarBar's site in the page's language", () => {
    expect(garbarUrl("en")).toBe("https://garbar.tech/en/");
    expect(garbarUrl("es")).toBe("https://garbar.tech/es/");
    expect(garbarUrl("ca")).toBe("https://garbar.tech/ca/");
  });
});

describe("taskflowUrl", () => {
  it("opens TaskFlow's site in the page's language, as garbar.tech links it", () => {
    expect(taskflowUrl("en")).toBe("https://taskflow.garbar.tech/?lang=en");
    expect(taskflowUrl("es")).toBe("https://taskflow.garbar.tech/es/");
    expect(taskflowUrl("ca")).toBe("https://taskflow.garbar.tech/ca/");
  });
});
