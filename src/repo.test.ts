import { readFileSync } from "node:fs";

import { describe, expect, it } from "vitest";

// Files at the repository's root, read as text.
const read = (path: string) => readFileSync(new URL(`../${path}`, import.meta.url), "utf8");

describe("Dependabot", () => {
  it("opens every version update into dev, since CI fails a PR into main", () => {
    const config = read(".github/dependabot.yml");
    const entries = config.match(/^ {2}- package-ecosystem: /gm) ?? [];
    expect(entries.length).toBeGreaterThan(0);
    expect(config.match(/^ {4}target-branch: dev$/gm)?.length).toBe(entries.length);
  });
});

describe("Node", () => {
  it("is one image in every stage of the Dockerfile, the one CI's web job reads", () => {
    const images = [...read("Dockerfile").matchAll(/^FROM (node:\S+)/gm)].map((m) => m[1]);
    expect(images).toHaveLength(2);
    expect(new Set(images).size).toBe(1);
    const ci = read(".github/workflows/ci.yml");
    expect(ci).toContain("container: ${{ needs.node-image.outputs.image }}");
    expect(ci).not.toMatch(/container: node:/);
  });
});

describe("Dependabot alerts workflow", () => {
  it("only reads the alerts, and only when started by hand or by the weekly pass", () => {
    const workflow = read(".github/workflows/dependabot-alerts.yml");
    expect(workflow).toMatch(/^permissions: \{\}$/m);
    const scopes = [...workflow.matchAll(/^ +([a-z-]+): (read|write)$/gm)].map((m) => `${m[1]}: ${m[2]}`);
    expect(scopes).toEqual(["vulnerability-alerts: read"]);
    expect(workflow).toMatch(/^on:\n {2}workflow_dispatch:\n\n/m);
  });
});
