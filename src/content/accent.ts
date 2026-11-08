/**
 * A world's accent color from its genre, by the same rules as the app's GenreAccent
 * (PlayableAnime app/lib/design/accent.dart), so a world wears the same color on the site as on
 * Discover. Unknown genres get the app's own gold.
 */
const accents = {
  jade: "#5CC9A7",
  azure: "#84A9F5",
  ember: "#F08A5D",
  violet: "#B08CFA",
  crimson: "#EF7A82",
  cyan: "#4FCFE0",
  orchid: "#DD8BE8",
  gold: "#E3B66B",
} as const;

// Order matters: "urban fantasy" is supernatural before it is fantasy.
const rules: [keyof typeof accents, RegExp][] = [
  ["orchid", /supernatural|occult|urban|vampire|horror|ghost|hidden|witch/],
  ["violet", /reincarnat|isekai|rebirth|regress|transmigrat|reborn/],
  ["jade", /cultivat|xianxia|wuxia|murim|martial|immortal/],
  ["azure", /knight|aura|chivalr|paladin|superpower|superhero/],
  ["cyan", /\bsci|space|cyber|\bstar|mecha|future|android|robot/],
  ["crimson", /crime|mafia|noir|thriller|vendetta|modern|grounded|detective|mob\b/],
  ["ember", /monster|races|dungeon|fantasy|magic|dragon|sorcer|beast|apocalyp|wasteland/],
];

/** The accent for an English genre label, such as "Cultivation" or "Neon urban fantasy". */
export function accentFor(genre: string): string {
  const g = genre.toLowerCase();
  for (const [accent, pattern] of rules) {
    if (pattern.test(g)) return accents[accent];
  }
  return accents.gold;
}
