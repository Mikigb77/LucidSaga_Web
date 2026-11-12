/** How far down the page the reader is, from 0 at the top to 1 at the end. */
export function readProgress(scrollY: number, pageHeight: number, windowHeight: number): number {
  const room = pageHeight - windowHeight;
  if (room <= 0) return 0;
  return Math.min(Math.max(scrollY / room, 0), 1);
}

/**
 * Which section the reader is in: the one that spans a line across the window (in the window's
 * pixels), or -1 when none does. Sections missing from the page are null.
 */
export function activeSection(sections: ({ top: number; bottom: number } | null)[], line: number): number {
  return sections.findIndex((box) => box !== null && box.top <= line && box.bottom > line);
}

/**
 * How far the next of Features' chapters has slid over this one, from 0 to 1, from the tops of
 * both in the window and this one's height.
 */
export function coverOf(top: number, height: number, nextTop: number): number {
  if (height <= 0) return 0;
  return Math.min(Math.max((top + height - nextTop) / height, 0), 1);
}
