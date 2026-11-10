import type { ReactNode } from "react";

/**
 * A section's small gold label above its heading (globals.css). With a number, as the home page's
 * sections have, the number sits in a small pill where the rule would be.
 */
export function Eyebrow({ n, children }: { n?: string; children: ReactNode }) {
  return (
    <p className="eyebrow">
      {n && (
        <span className="eyebrow-n" aria-hidden="true">
          {n}
        </span>
      )}
      {children}
    </p>
  );
}
