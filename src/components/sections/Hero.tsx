import { Fragment } from "react";
import {
  CloudPuff,
  EnsoRing,
  InkMountains,
  InkSun,
  PetalDrift,
  PlumBranch,
} from "@/components/ornaments";
import {
  Button,
  CjkGlyph,
  Container,
  cx,
  Eyebrow,
  InkRule,
  Section,
} from "@/components/ui";
import { event, pillars, posterHighlights } from "@/lib/content";

/**
 * Sekcja otwierająca — plakat festiwalu przełożony na warstwy DOM.
 *
 * Ornamenty leżą w kolejności głębi obrazu: słońce najdalej, potem enso,
 * pejzaż górski z pagodą, gałązki śliwy w narożnikach, na końcu płatki
 * i chmura. Cała treść jedzie na `z-10`, więc żadna ozdoba nie wchodzi
 * na literę — i nic w tej sekcji nie animuje wejścia tekstu.
 */

type IconProps = { className?: string };
type Pillar = (typeof pillars)[number];

/* Etykiety samego interfejsu. `content.ts` opisuje treść festiwalu, nie
   mechanikę strony, więc wezwania i podpowiedź przewijania mają tu własny
   mikro-słownik — nadal w jednym miejscu, nadal bez tekstu w JSX. */
const chrome = {
  ctaPrimary: "Zapisz się na warsztaty",
  ctaSecondary: "Zobacz program",
  scroll: "Przewiń",
} as const;

/* Nazwa własna przychodzi z `content.ts` już rozłożona na wiersze plakatu
   (`titleLines`). Wcześniej Hero robił `event.name.split(" ")` i milcząco
   zakładał dokładnie trzy słowa — zmiana nazwy na dwu- albo czterowyrazową
   zostawiała w nagłówku puste bloki. Teraz mapujemy po tym, co jest.

   Wiersz spójnika to środek listy: dla trzech wierszy indeks 1. Liczymy go
   z długości, więc nie zaszywamy tu ponownie założenia o liczbie słów. */
const conjunctionIndex = Math.floor((event.titleLines.length - 1) / 2);

/* ============================================================
   IKONY PASKA FAKTÓW — rysowane kreską, bez plików i bez emoji
   ============================================================ */

/** Kalendarz — ramka, dwa kolce i cztery kreski dni. */
function CalendarIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      aria-hidden="true"
      focusable="false"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="3" y="5.4" width="18" height="15.4" rx="2.2" />
      <path d="M3.6 10.4h16.8" />
      <path d="M8.2 3.2v3.6" />
      <path d="M15.8 3.2v3.6" />
      <path d="M7.4 14.2h3M13.6 14.2h3M7.4 17.6h3" />
    </svg>
  );
}

/** Pinezka — kropla z okiem, klasyczny znacznik miejsca. */
function PinIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      aria-hidden="true"
      focusable="false"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 21.2c3.9-4.4 6.4-7.9 6.4-11a6.4 6.4 0 1 0-12.8 0c0 3.1 2.5 6.6 6.4 11Z" />
      <circle cx="12" cy="10.1" r="2.4" />
    </svg>
  );
}

/** Otwarta brama 門 — dwa słupy, wygięty okap, przejście bez skrzydeł. */
function GateIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      aria-hidden="true"
      focusable="false"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M2.4 7.6C6.2 5.2 17.8 5.2 21.6 7.6" />
      <path d="M4.8 10.4h14.4" />
      <path d="M6.9 10.8V21" />
      <path d="M17.1 10.8V21" />
      <path d="M3.8 21h16.4" />
    </svg>
  );
}

/** Strzałka w dół — podpowiedź przewijania. */
function ArrowDownIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      aria-hidden="true"
      focusable="false"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 4.4v14.4" />
      <path d="M5.9 12.7 12 18.8l6.1-6.1" />
    </svg>
  );
}

/* ============================================================
   LINIA FILARU — „WEN — człowiek i kultura”
   ============================================================ */

function PillarLine({ pillar }: { pillar: Pillar }) {
  return (
    <p className="text-[0.7rem] uppercase tracking-[0.2em] text-ink-soft sm:text-xs sm:tracking-[0.24em]">
      <span className="font-semibold text-seal">{pillar.name}</span>
      <span className="px-2 text-ink-faint">—</span>
      {pillar.role}
    </p>
  );
}

export default function Hero() {
  const [wen, wu] = pillars;

  return (
    <Section
      id="hero"
      tone="mist"
      labelledBy="hero-tytul"
      className="min-h-[92svh] flex items-center pt-28 sm:pt-32"
    >
      {/* ── WARSTWA ORNAMENTÓW ─────────────────────────────────
          Wszystko tutaj siedzi na `-z-10`, tak samo jak w „O festiwalu”
          i w FAQ: ozdoba nie ma prawa wejść ponad literę nawet wtedy,
          gdy któryś blok treści zgubi swoje `z-10`.

          Krycia są celowo niskie. Hero pracowało wcześniej w wartościach
          2–3× wyższych niż reszta serwisu — ten sam PetalDrift miał tu 0,30,
          a w FAQ 0,15 — przez co sekcja otwierająca wyglądała jak z innego
          projektu, a podpisy traciły kontrast.

          Krycie plamy słońca zostaje na samym SVG, a `animate-breathe`
          — które nadpisuje `opacity` własnymi klatkami — siedzi na
          obudowie. Inaczej słońce rozjaśniłoby się do 85% i położyło
          czerwień pod nagłówkiem. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-16 right-[-6%] -z-10 animate-breathe"
      >
        <InkSun className="h-[26rem] w-[26rem] text-vermilion opacity-[0.13] sm:h-[34rem] sm:w-[34rem]" />
      </div>

      {/* Enso pojawia się od `sm:` — na telefonie okrąg wpadałby wprost
          pod nazwę festiwalu i rozbijał ją na dwie plamy tuszu. */}
      <EnsoRing className="pointer-events-none absolute top-1/2 right-[4%] -z-10 hidden h-[22rem] w-[22rem] -translate-y-1/2 text-ink opacity-[0.09] sm:block lg:right-[10%] lg:h-[30rem] lg:w-[30rem]" />

      <InkMountains className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-56 w-full text-ink opacity-[0.16]" />

      {/* Gałązka w lewym dolnym narożniku leży dokładnie pod podpisami
          paska czterech atrakcji. Przy 0,26 / 0,40 kontrast tych etykiet
          spadał z 8,4:1 do 4,6:1, więc gałązka schodzi do krycia tła. */}
      <PlumBranch className="pointer-events-none absolute -bottom-6 -left-12 -z-10 h-56 w-72 text-ink opacity-[0.18] sm:-bottom-4 sm:-left-8 sm:h-64 sm:w-80 sm:opacity-[0.20]" />
      <PlumBranch
        flip
        className="pointer-events-none absolute -top-6 -right-6 -z-10 hidden h-44 w-56 text-ink opacity-[0.18] sm:block"
      />

      <PetalDrift className="pointer-events-none absolute inset-0 -z-10 h-full w-full text-vermilion opacity-[0.15]" />

      {/* Chmurka była biała (`text-paper`) na mgle, która w tym miejscu jest
          niemal tak samo jasna — widać było prostokąt, nie chmurę. Tusz
          w kryciu tła, jak w „O festiwalu”. */}
      <CloudPuff className="pointer-events-none absolute bottom-24 right-[8%] -z-10 hidden h-16 w-32 text-ink-faint opacity-[0.18] md:block" />

      {/* ── TREŚĆ ──────────────────────────────────────────────── */}
      <Container className="relative z-10">
        <div className="max-w-3xl">
          <Eyebrow cjk={event.nameCjk} tone="mist">
            {event.kicker}
          </Eyebrow>

          <div className="mt-6 flex items-start gap-5 sm:mt-8 sm:gap-8">
            {/* Jedyny <h1> w całym serwisie. Wiersze plakatu to bloki
                wewnątrz jednego nagłówka — hierarchia zostaje nietknięta. */}
            <h1
              id="hero-tytul"
              className="font-display text-6xl leading-[0.95] text-ink sm:text-7xl lg:text-8xl"
            >
              {/* Spacje między blokami są celowe: bez nich nazwa czyta się
                  czytnikom ekranu i przy kopiowaniu jako „KsięgaiMiecz”.
                  Bloki i tak łamią wiersz, więc wizualnie nic nie zmieniają. */}
              {event.titleLines.map((line, index) => (
                <Fragment key={`${line}-${index}`}>
                  {index > 0 && " "}
                  <span
                    className={cx(
                      "block",
                      index === conjunctionIndex &&
                        "py-1 pl-1 text-3xl italic leading-none text-vermilion sm:text-4xl lg:text-5xl",
                    )}
                  >
                    {line}
                  </span>
                </Fragment>
              ))}
            </h1>

            <CjkGlyph className="vertical-cjk mt-3 shrink-0 text-4xl tracking-[0.18em] text-seal/70">
              {event.nameCjk}
            </CjkGlyph>
          </div>

          {/* Dwa filary — para etykiet rozdzielona pionową kreską. */}
          <div className="mt-8 flex flex-col gap-3 sm:mt-9 sm:flex-row sm:items-center sm:gap-6">
            <PillarLine pillar={wen} />
            <span
              aria-hidden="true"
              className="hidden h-4 w-px shrink-0 bg-ink/20 sm:block"
            />
            <PillarLine pillar={wu} />
          </div>

          <p className="mt-7 max-w-xl text-lg leading-relaxed text-pretty text-ink-soft sm:text-xl">
            {event.tagline}
          </p>

          {/* ── PASEK FAKTÓW ───────────────────────────────────── */}
          <ul className="mt-8 flex flex-wrap items-center gap-x-4 gap-y-3 text-sm text-ink-soft sm:gap-x-5">
            <li className="flex items-center gap-2.5">
              <CalendarIcon className="h-4 w-4 shrink-0 text-seal" />
              <time dateTime={event.dateIso}>{event.dateLabel}</time>
            </li>

            <li
              aria-hidden="true"
              className="hidden h-4 w-px bg-ink/20 sm:block"
            />

            <li className="flex items-center gap-2.5">
              <PinIcon className="h-4 w-4 shrink-0 text-seal" />
              <span>
                {event.venue}
                {/* `ink-soft`, nie `ink-muted`: tło Hero to różowo-czerwona mgła,
                    najciemniejszy punkt gradientu zjada kontrast wyciszonej szarości. */}
                <span className="text-ink-soft">, {event.street}</span>
              </span>
            </li>

            <li
              aria-hidden="true"
              className="hidden h-4 w-px bg-ink/20 sm:block"
            />

            <li className="flex items-center gap-2.5">
              <GateIcon className="h-4 w-4 shrink-0 text-seal" />
              <span className="font-semibold text-seal">{event.admission}</span>
            </li>
          </ul>

          {/* ── DWA WEZWANIA ───────────────────────────────────── */}
          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
            <Button
              href="#zapisy"
              variant="solid"
              size="lg"
              className="max-w-full text-center"
            >
              {chrome.ctaPrimary}
            </Button>
            <Button
              href="#aktywnosci"
              variant="outline"
              size="lg"
              className="max-w-full text-center"
            >
              {chrome.ctaSecondary}
            </Button>
          </div>

          {/* ── CZTERY ATRAKCJE Z PLAKATU ──────────────────────── */}
          <div className="mt-12 sm:mt-14">
            <InkRule />

            <ul className="mt-7 grid grid-cols-2 gap-x-4 gap-y-7 sm:grid-cols-4 sm:gap-x-6">
              {posterHighlights.map((item) => (
                <li
                  key={item.cjk}
                  className="flex flex-col items-center gap-3 text-center"
                >
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-seal/30 bg-paper/60">
                    <CjkGlyph className="text-lg text-seal">
                      {item.cjk}
                    </CjkGlyph>
                  </span>
                  <span className="text-[0.7rem] uppercase tracking-wider text-balance text-ink-soft">
                    {item.label}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>

      {/* ── PODPOWIEDŹ PRZEWIJANIA ─────────────────────────────
          Pokazuje się tylko tam, gdzie ekran jest realnie wysoki —
          na niskim oknie i tak leżałaby na treści. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-6 z-10 hidden flex-col items-center gap-2 [@media(min-height:820px)]:flex"
      >
        <span className="text-[0.62rem] font-semibold uppercase tracking-[0.32em] text-ink-muted">
          {chrome.scroll}
        </span>
        <ArrowDownIcon className="h-5 w-5 animate-breathe text-seal" />
      </div>
    </Section>
  );
}
