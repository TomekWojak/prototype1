import type { SchemaTypeDefinition } from "sanity";

import { aktywnosci } from "./aktywnosci";
import { faq } from "./faq";
import { kontakt } from "./kontakt";
import { lokalizacja } from "./lokalizacja";
import { oFestiwalu } from "./oFestiwalu";
import { partnerzy } from "./partnerzy";
import { transmisja } from "./transmisja";
import { warsztaty } from "./warsztaty";
import { wydarzenie } from "./wydarzenie";
import { zapisy } from "./zapisy";

export const schemaTypes: SchemaTypeDefinition[] = [
  wydarzenie,
  oFestiwalu,
  aktywnosci,
  warsztaty,
  zapisy,
  lokalizacja,
  partnerzy,
  faq,
  kontakt,
  transmisja,
];

export const singletony = [
  "wydarzenie",
  "oFestiwalu",
  "aktywnosci",
  "warsztaty",
  "zapisy",
  "lokalizacja",
  "partnerzy",
  "faq",
  "kontakt",
  "transmisja",
] as const;

export type Singleton = (typeof singletony)[number];
