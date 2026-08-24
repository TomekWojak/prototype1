import {
  BambooSprig,
  BrushStroke,
  CloudPuff,
  JianSword,
  ScrollRoll,
  SealStamp,
  TaijiSymbol,
} from "@/components/ornaments";
import {
  Card,
  CjkGlyph,
  Container,
  Eyebrow,
  Pill,
  Section,
  SectionHeading,
  cx,
} from "@/components/ui";
import {
  aboutQuote,
  audiences,
  event,
  modernCreed,
  modernCreedClosing,
  pillars,
} from "@/lib/content";

/* Chińskie cyfry jako „numery” credo — to ornament typograficzny, nie treść,
   dlatego mieszka w komponencie, a nie w content.ts.
   Lista jest dłuższa niż `modernCreed`, a odczyt i tak zawija się modulo:
   dopisanie czwartej linii credo w content.ts nie zostawi pustego numeru. */
const creedNumerals = ["一", "二", "三", "四", "五", "六"] as const;

type Pillar = (typeof pillars)[number];

/**
 * Jeden filar. Układ jest lustrzany: Wen dociąga się do prawej, Wu do lewej,
 * żeby oba spotykały się na symbolu taiji w środkowej kolumnie — tak jak na
 * plakacie festiwalu (uczony | taiji | wojownik).
 */
function PillarPanel({ pillar, side }: { pillar: Pillar; side: "wen" | "wu" }) {
  const isWen = side === "wen";
  // Rozszerzenie z krotki literałów na zwykłą tablicę — obie gałęzie unii
  // mają inne literały, a do mapowania wystarczy string.
  const traits: readonly string[] = pillar.traits;

  const glyph = (
    <CjkGlyph className="text-7xl text-seal/25 sm:text-8xl">
      {pillar.cjk}
    </CjkGlyph>
  );

  const motif = isWen ? (
    <ScrollRoll className="h-14 w-40 text-ink-soft" />
  ) : (
    <JianSword className="h-40 w-10 text-ink-soft" />
  );

  return (
    <div
      className={cx(
        "flex flex-col gap-5",
        isWen ? "lg:items-end lg:text-right" : "lg:items-start lg:text-left",
      )}
    >
      {/* Stała wysokość pasma motywu od lg — dzięki temu nagłówki obu filarów
          leżą na jednej linii, mimo że miecz jest pionowy, a zwój poziomy. */}
      <div
        className={cx(
          "flex items-center gap-5 sm:gap-6 lg:min-h-40",
          isWen && "lg:justify-end",
        )}
      >
        {isWen ? glyph : motif}
        {isWen ? motif : glyph}
      </div>

      <div className="flex flex-col gap-2">
        {/* h3 blokowy — o stopień niżej niż h2 sekcji, żeby hierarchia była
            widoczna, a nie tylko zadeklarowana znacznikiem. */}
        <h3
          className={cx(
            "flex flex-wrap items-baseline gap-x-3 gap-y-1 font-display text-2xl leading-tight text-ink sm:text-3xl",
            isWen && "lg:justify-end",
          )}
        >
          <span>{pillar.name}</span>
          {/* Znak CJK jest ornamentem: CjkGlyph nadaje mu aria-hidden, więc
              nie wchodzi do nazwy dostępnej nagłówka. */}
          <CjkGlyph className="text-xl text-ink/70 sm:text-2xl">
            {pillar.cjk}
          </CjkGlyph>
          {/* Odstęp wyłącznie dla czytników ekranu — „Wen Wén”, nie „WenWén”.
              `sr-only` pozycjonuje absolutnie, więc nie dokłada przerwy flex. */}
          <span className="sr-only"> </span>
          <span
            lang="zh-Latn"
            className="font-body text-base italic text-ink-muted"
          >
            {pillar.pinyin}
          </span>
        </h3>

        <p className="text-xs font-semibold uppercase tracking-widest text-seal">
          {pillar.role}
        </p>
      </div>

      <p className="max-w-md text-base leading-relaxed text-pretty text-ink-soft">
        {pillar.description}
      </p>

      <ul
        className={cx(
          "flex flex-wrap gap-2",
          isWen && "lg:justify-end",
        )}
      >
        {traits.map((trait) => (
          <li key={trait}>
            <Pill tone="paper">{trait}</Pill>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function About() {
  /* Filary wyszukujemy po `key`, nie po pozycji w tablicy. Destrukturyzacja
     `const [wen, wu] = pillars` wiązała stronę kompozycji wyłącznie z
     kolejnością wpisów w content.ts — przestawienie ich zamieniłoby zwój
     z mieczem bez jednego błędu kompilacji. */
  const wen = pillars.find((pillar) => pillar.key === "wen");
  const wu = pillars.find((pillar) => pillar.key === "wu");

  return (
    <Section id="o-festiwalu" tone="paper" labelledBy="o-festiwalu-tytul">
      {/* Warstwa ornamentów — ujemny z-index trzyma je pod treścią. */}
      <BambooSprig className="pointer-events-none absolute top-1/3 -left-10 -z-10 hidden h-72 w-24 text-jade opacity-[0.12] xl:block" />
      <CloudPuff className="pointer-events-none absolute top-24 -right-6 -z-10 hidden h-20 w-40 text-ink-faint opacity-[0.18] sm:block" />
      <CloudPuff className="pointer-events-none absolute bottom-40 -right-10 -z-10 hidden h-16 w-32 text-ink-faint opacity-[0.18] lg:block" />

      <Container>
        <SectionHeading
          id="o-festiwalu-tytul"
          eyebrow="O festiwalu"
          cjk={event.nameCjk}
          title={
            <>
              Dwa filary <span className="text-vermilion">chińskiej</span>{" "}
              kultury
            </>
          }
          lead={event.lead}
          tone="paper"
        />

        {/* ── DWA FILARY ─────────────────────────────────────── */}
        <div className="mt-14 grid items-center gap-10 sm:mt-16 lg:grid-cols-[1fr_auto_1fr]">
          {wen && <PillarPanel pillar={wen} side={wen.key} />}

          {/* Na wąskich ekranach taiji staje się poziomym separatorem. */}
          <div className="flex items-center justify-center gap-4">
            <BrushStroke
              aria-hidden="true"
              className="h-3 w-16 text-vermilion/35 sm:w-24 lg:hidden"
            />
            <TaijiSymbol className="h-24 w-24 shrink-0 text-ink" />
            <BrushStroke
              aria-hidden="true"
              className="h-3 w-16 text-vermilion/35 sm:w-24 lg:hidden"
            />
          </div>

          {wu && <PillarPanel pillar={wu} side={wu.key} />}
        </div>

        {/* ── CYTAT ──────────────────────────────────────────── */}
        <figure className="mt-14 rounded-sm border-l-4 border-vermilion bg-paper-warm p-6 shadow-paper sm:mt-16 sm:p-10">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:gap-8">
            <SealStamp className="h-14 w-14 shrink-0 text-seal" />
            <div className="flex flex-col gap-5">
              <blockquote className="font-display text-2xl leading-snug text-balance text-ink sm:text-3xl">
                „{aboutQuote.text}”
              </blockquote>
              <figcaption className="max-w-2xl text-sm leading-relaxed text-pretty text-ink-soft sm:text-base">
                {aboutQuote.note}
              </figcaption>
            </div>
          </div>
        </figure>

        {/* ── CREDO ──────────────────────────────────────────── */}
        <div className="mt-14 sm:mt-16">
          <ol className="grid gap-5 sm:grid-cols-3 sm:gap-8">
            {modernCreed.map((line, index) => (
              <li
                key={line}
                className="flex items-baseline gap-4 border-t border-ink/12 pt-5"
              >
                <CjkGlyph className="text-4xl text-vermilion/60">
                  {creedNumerals[index % creedNumerals.length]}
                </CjkGlyph>
                <p className="font-display text-xl leading-snug text-ink sm:text-2xl">
                  {line}
                </p>
              </li>
            ))}
          </ol>

          <div className="mt-12 flex flex-col items-center gap-3">
            <BrushStroke className="h-3 w-40 text-vermilion/40" />
            <p className="font-display text-center text-xl text-seal sm:text-2xl">
              {modernCreedClosing}
            </p>
            <BrushStroke className="h-3 w-40 text-vermilion/40" />
          </div>
        </div>

        {/* ── DLA KOGO JEST FESTIWAL ─────────────────────────── */}
        <div className="mt-14 sm:mt-16">
          <Eyebrow cjk="人" tone="paper">
            Uczestnicy
          </Eyebrow>

          <h3 className="mt-4 font-display text-2xl leading-tight text-ink sm:text-3xl">
            Dla kogo jest ten festiwal
          </h3>

          <div className="mt-8 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
            {audiences.map((audience) => (
              <Card key={audience.title} tone="paper">
                <CjkGlyph className="pointer-events-none absolute -right-3 -bottom-5 text-8xl text-seal/10 transition-colors duration-300 group-hover:text-seal/20">
                  {audience.cjk}
                </CjkGlyph>

                <div className="relative flex flex-col gap-3">
                  <h4 className="font-display text-xl leading-snug text-ink">
                    {audience.title}
                  </h4>
                  <p className="text-sm leading-relaxed text-pretty text-ink-soft">
                    {audience.description}
                  </p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}
