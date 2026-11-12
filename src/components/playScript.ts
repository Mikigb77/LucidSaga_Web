/**
 * What the phone beside How it plays shows at each of its four steps (PlayDemo): kept apart
 * from the component so it can be tested without a browser.
 */

/** How far the phone has played: what each of its screens shows. */
export type Progress = {
  /** Discover: the signature world has been tapped. */
  picked: boolean;
  /** The scene: its picture has come in. */
  picture: boolean;
  /** The scene: how many words of the first narration have streamed in. */
  words1: number;
  /** The scene: the suggested choices under it are showing. */
  choices: boolean;
  /** The composer: how many letters of the player's move have been typed. */
  typed: number;
  /** The move has been sent, and shows in the scene. */
  sent: boolean;
  /** How many words of the answering narration have streamed in. */
  words2: number;
  /** The answer is complete, with its Read aloud bar. */
  done: boolean;
  /** Memory: the new deed has been kept. */
  deed: boolean;
};

/** The lengths of the scene's words, which say where each step ends. */
export type Sizes = { words1: number; words2: number; action: number };

/** The screen each step shows: Discover, the scene (two steps), Memory. */
export const PLAY = [0, 1, 1, 2] as const;

export function stepScreen(step: number): number {
  return PLAY[Math.min(Math.max(step, 0), PLAY.length - 1)];
}

const NOTHING: Progress = {
  picked: false,
  picture: false,
  words1: 0,
  choices: false,
  typed: 0,
  sent: false,
  words2: 0,
  done: false,
  deed: false,
};

/** Everything a step has shown once its moment has played. */
export function finishedAt(step: number, sizes: Sizes): Progress {
  const progress = { ...NOTHING };
  if (step >= 0) progress.picked = true;
  if (step >= 1) {
    // The scene, its choices, and the player's move typed but not yet sent.
    Object.assign(progress, {
      picture: true,
      words1: sizes.words1,
      choices: true,
      typed: sizes.action,
    });
  }
  if (step >= 2) {
    // The move sent, the choices gone with it, and the answer read aloud.
    Object.assign(progress, {
      choices: false,
      typed: 0,
      sent: true,
      words2: sizes.words2,
      done: true,
    });
  }
  if (step >= 3) progress.deed = true;
  return progress;
}

/** What a step shows before its moment plays: where the step before it ended. */
export function startOf(step: number, sizes: Sizes): Progress {
  return step <= 0 ? { ...NOTHING } : finishedAt(step - 1, sizes);
}

/**
 * The step a reader has reached in a list of steps: the last one whose number's middle has
 * passed the pen, a line across the window, and for each step how far the thread below its
 * number has filled toward the next number (0 to 1). Positions are in the window's pixels.
 */
export function reached(
  numbers: { top: number; bottom: number }[],
  pen: number,
): { step: number; reached: boolean[]; fill: number[] } {
  let step = 0;
  const hit = numbers.map((box, i) => {
    const on = pen >= (box.top + box.bottom) / 2;
    if (on) step = i;
    return on;
  });
  const fill = numbers.map((box, i) => {
    const next = numbers[i + 1];
    if (!next) return 0;
    const span = next.top - box.bottom;
    if (span <= 0) return pen >= next.top ? 1 : 0;
    return Math.min(Math.max((pen - box.bottom) / span, 0), 1);
  });
  return { step, reached: hit, fill };
}

/** A person's initial, as the app's Memory shows it: the first letter of their name. */
export function initial(name: string): string {
  return name
    .replace(/^(El |L'|The )/, "")
    .charAt(0)
    .toUpperCase();
}
