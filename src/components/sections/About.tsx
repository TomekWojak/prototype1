import {
  BrushRule,
  Card,
  CjkGlyph,
  Container,
  Eyebrow,
  InkRule,
  Section,
  SectionHeading,
} from "@/components/ui";
import {
  aboutQuote,
  audiences,
  event,
  modernCreed,
  modernCreedClosing,
  pillars,
} from "@/lib/content";

/* Chińskie cyfry jako „numery” credo — to gest typograficzny, nie treść,
   dlatego mieszkają w komponencie, a nie w content.ts. Lista jest dłuższa
   niż `modernCreed`, a odczyt zawija się modulo: dopisanie czwartej linii
   credo w content.ts nie zostawi pustego numeru. */
const creedNumerals = ["一", "二", "三", "四", "五", "六"] as const;

type Pillar = (typeof pillars)[number];

/* Kolejność kolumn wynika z kluczy, nie z pozycji w tablicy. Wcześniej
   sekcja destrukturyzowała `pillars`, więc przestawienie wpisów w content.ts
   zamieniłoby filary miejscami bez jednego błędu kompilacji. */
const pillarOrder = ["wen", "wu"] as const;

/**
 * Jeden filar: znak jako bardzo jasne tło typograficzne, pod nim nagłówek,
 * rola, opis i cechy w jednej linii. Bez karty, bez ramki, bez symbolu
 * pośrodku — dwie kolumny tekstu i nic więcej.
 */
function PillarColumn({ pillar }: { pillar: Pillar }) {
  /* Rozszerzenie z krotki literałów na zwykłą tablicę: obie gałęzie unii
     mają inne literały, a do złączenia wystarczy `string`. */
  const traits: readonly string[] = pillar.traits;

  return (
    <div>
      <CjkGlyph className="block text-7xl text-ink/10">{pillar.cjk}</CjkGlyph>

      {/* Znak CJK niesie `aria-hidden`, więc nazwa dostępna nagłówka to
          „Wen Wén” — stąd jawna spacja przed pinyinem, bez niej czytnik
          ekranu przeczytałby „WenWén”. */}
      <h3 className="mt-4 text-2xl">
        {pillar.name}{" "}
        <span lang="zh-Latn" className="ml-3 text-lg font-normal text-ink-faint">
          {pillar.pinyin}
        </span>
      </h3>

      <p className="mt-2 text-xs tracking-[0.2em] text-seal uppercase">
        {pillar.role}
      </p>

      <p className="mt-5 max-w-xl text-base text-pretty text-ink-muted">
        {pillar.description}
      </p>

      {/* Cechy jako jedna linia tekstu rozdzielona kropką środkową. Plakietki
          w kółkach rozbijały spokój kolumny na sześć drobnych prostokątów. */}
      <p className="mt-5 text-sm text-ink-faint">{traits.join(" · ")}</p>
    </div>
  );
}

export default function About() {
  const columns = pillarOrder
    .map((key) => pillars.find((pillar) => pillar.key === key))
    .filter((pillar): pillar is Pillar => pillar !== undefined);

  return (
    <Section id="o-festiwalu" tone="soft" labelledBy="o-festiwalu-tytul">
      <Container>
        <SectionHeading
          id="o-festiwalu-tytul"
          eyebrow="O festiwalu"
          title={
            <>
              Dwa filary <span className="text-seal">chińskiej</span> kultury
            </>
          }
          lead={event.lead}
        />

        {/* ── DWA FILARY ─────────────────────────────────────── */}
        <div className="mt-20 grid gap-14 lg:grid-cols-2">
          {columns.map((pillar) => (
            <PillarColumn key={pillar.key} pillar={pillar} />
          ))}
        </div>

        {/* ── CYTAT ──────────────────────────────────────────── */}
        {/* Najmocniejszy moment sekcji, więc niesie go sam stopień pisma:
            żadnej ramki, tła ani pieczęci obok. `font-display` jest tu
            konieczne — szeryf dziedziczą wyłącznie nagłówki h1–h4. */}
        <figure className="mt-24 max-w-3xl">
          <BrushRule />
          <blockquote className="mt-8 font-display text-3xl leading-[1.15] text-balance text-ink sm:text-4xl">
            „{aboutQuote.text}”
          </blockquote>
          <figcaption className="mt-8 max-w-2xl text-base text-pretty text-ink-muted">
            {aboutQuote.note}
          </figcaption>
        </figure>

        {/* ── CREDO ──────────────────────────────────────────── */}
        {/* Trzy wiersze jeden pod drugim, nie siatka: credo czyta się w dół,
            jak zdania, a nie w bok, jak trzy równorzędne kafelki. */}
        <ol className="mt-24">
          {modernCreed.map((line, index) => (
            <li key={line}>
              <InkRule />
              <div className="flex items-baseline gap-6 py-7">
                <CjkGlyph className="w-8 shrink-0 text-2xl text-seal/40">
                  {creedNumerals[index % creedNumerals.length]}
                </CjkGlyph>
                <p className="font-display text-2xl leading-snug text-ink">
                  {line}
                </p>
              </div>
            </li>
          ))}
        </ol>

        <p className="mt-12 font-display text-xl text-seal">
          {modernCreedClosing}
        </p>

        {/* ── DLA KOGO JEST FESTIWAL ─────────────────────────── */}
        <div className="mt-24">
          <Eyebrow>Uczestnicy</Eyebrow>

          <h3 className="mt-4 text-2xl sm:text-3xl">
            Dla kogo jest ten festiwal
          </h3>

          {/* Najwyżej dwie kolumny. Cztery kafelki obok siebie to dokładnie
              ten układ, który na dużym ekranie czytał się jak szablon. */}
          <div className="mt-14 grid gap-x-14 gap-y-12 sm:grid-cols-2">
            {audiences.map((audience) => (
              <Card key={audience.title}>
                <h4 className="text-xl">{audience.title}</h4>
                <p className="mt-3 text-base text-pretty text-ink-muted">
                  {audience.description}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}
