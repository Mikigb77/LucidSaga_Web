import { ca } from "./dictionaries/ca";
import { en, type Dictionary } from "./dictionaries/en";
import { es } from "./dictionaries/es";
import type { Locale } from "./locales";

export type { Dictionary } from "./dictionaries/en";

const dictionaries: Record<Locale, Dictionary> = { en, es, ca };

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}
