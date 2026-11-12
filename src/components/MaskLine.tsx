import type { ReactNode } from "react";

/**
 * A heading's words, which slide up from behind their own lower edge the first time the block
 * around them (a [data-reveal] element) scrolls into view (globals.css). Without script, or with
 * reduced motion, they are simply there.
 */
export function MaskLine({ children }: { children: ReactNode }) {
  return (
    <span className="mask-line">
      <span>{children}</span>
    </span>
  );
}
