import { SealStamp } from "@/components/ornaments";
import {
  Button,
  Card,
  Container,
  Eyebrow,
  Section,
  SectionHeading,
} from "@/components/ui";
import { event, location, locationCopy } from "@/lib/content";

const mapsHref =
  "https://www.google.com/maps/search/?api=1&query=" +
  encodeURIComponent(location.mapsQuery);

/* ============================================================
   LOKALIZACJA

   Sekcja była wcześniej najciemniejszym miejscem serwisu: tło tuszu,
   złote obramowania, latarnia, góry przy dolnej krawędzi i osadzona
   ramka Map Google przefiltrowana na negatyw. Teraz jest jasna jak
   reszta strony, a plan okolicy rysujemy sami — bez plików, bez
   zewnętrznej ramki i bez skryptów śledzących.

   Plan jest dekoracją i ma `aria-hidden`: pełna nazwa obiektu oraz
   adres stoją w bloku danych obok i w widocznym podpisie pod planem,
   a przycisk prowadzi do map z nawigacją. Podpisy na rysunku biorą
   skróty z `content.ts`, więc zmiana adresu nie zostawia po sobie
   starej nazwy ulicy zapieczonej w ścieżce SVG.
   ============================================================ */

export default function Location() {
  return (
    <Section id="lokalizacja" tone="soft" labelledBy="lokalizacja-tytul">
      <Container>
        <SectionHeading
          id="lokalizacja-tytul"
          eyebrow="Lokalizacja"
          title={
            <>
              Gdzie i <span className="text-seal">kiedy</span>
            </>
          }
          lead={locationCopy.lead}
        />

        <div className="mt-20 grid items-start gap-16 lg:grid-cols-2 lg:gap-20">
          {/* ── DANE ─────────────────────────────────────────────── */}
          <div>
            <div className="flex items-start justify-between gap-6">
              <div>
                {/* Nazwa obiektu jest najważniejszym tekstem bloku, więc
                    jest nagłówkiem. Stoi poza `address`, bo model treści
                    elementu `address` nie dopuszcza nagłówków. */}
                <h3 className="text-2xl">{location.venue}</h3>
                <address className="mt-2 text-base text-ink-muted not-italic">
                  {location.address}
                </address>
              </div>
              <SealStamp className="h-12 w-12 shrink-0 text-seal" />
            </div>

            {/* Godziny — dwa dni, dwie kreski, żadnej ramki. */}
            <div className="mt-16">
              {/* Mikroetykieta kolumny, nie nagłówek: czytnik ekranu nie
                  dostaje h3 wielkości 15 px obok h3 wielkości 28 px. */}
              <Eyebrow>{locationCopy.hoursTitle}</Eyebrow>
              <dl className="mt-6">
                {location.hours.map((slot) => (
                  <div
                    key={slot.day}
                    className="flex justify-between gap-6 border-b border-line py-4"
                  >
                    <dt className="text-base text-ink-soft">{slot.day}</dt>
                    <dd className="font-display text-base text-ink">
                      {slot.time}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>

            <div className="mt-16 grid gap-10">
              {location.notes.map((note) => (
                <Card key={note.title}>
                  <h4 className="text-xl">{note.title}</h4>
                  <p className="mt-3 text-base text-pretty text-ink-muted">
                    {note.body}
                  </p>
                </Card>
              ))}
            </div>

            <div className="mt-14">
              <Button
                variant="outline"
                size="md"
                href={mapsHref}
                target="_blank"
                rel="noopener noreferrer"
              >
                {locationCopy.mapsLabel}
                <span className="sr-only"> (otwiera się w nowej karcie)</span>
              </Button>
            </div>
          </div>

          {/* ── POGLĄDOWY PLAN OKOLICY ───────────────────────────── */}
          <figure>
            <div className="border border-line bg-paper p-6">
              <svg
                viewBox="0 0 400 300"
                className="h-auto w-full"
                aria-hidden="true"
                focusable="false"
              >
                {/* Ulice: jasnoszare pasma, wyraźnie szersze niż kreski
                    zabudowy, żeby siatka czytała się od razu. */}
                <g fill="none" stroke="var(--color-line)">
                  <path d="M0 214 H400" strokeWidth="26" />
                  <path d="M86 0 V300" strokeWidth="18" />
                  <path d="M326 0 V300" strokeWidth="16" />
                </g>

                {/* Kwartały zabudowy. */}
                <g
                  fill="var(--color-paper-soft)"
                  stroke="var(--color-line)"
                  strokeWidth="1.5"
                >
                  <rect x="8" y="20" width="69" height="181" />
                  <rect x="334" y="20" width="58" height="181" />
                  <rect x="8" y="227" width="69" height="65" />
                  <rect x="95" y="227" width="223" height="65" />
                </g>

                {/* Teren szkoły — ten sam papier, ciemniejsza krawędź. */}
                <rect
                  x="95"
                  y="20"
                  width="223"
                  height="181"
                  fill="var(--color-paper-soft)"
                  stroke="var(--color-ink-faint)"
                  strokeOpacity="0.5"
                  strokeWidth="1.5"
                />

                {/* Budynek celu — jedyna czerwień na planie. */}
                <rect
                  x="145"
                  y="76"
                  width="120"
                  height="62"
                  fill="var(--color-seal)"
                />

                {/* Znacznik: okrąg oddycha wokół budynku. `transformOrigin`
                    trzyma puls w miejscu — bez niego przeglądarka liczy
                    środek od lewego górnego rogu układu SVG. */}
                <circle
                  cx="205"
                  cy="107"
                  r="76"
                  fill="none"
                  stroke="var(--color-seal)"
                  strokeWidth="2.5"
                  className="animate-breathe"
                  style={{ transformOrigin: "205px 107px" }}
                />

                {/* Podpisy: 18 jednostek viewBox to około 17 px na ekranie.
                    Przy poprzednich 11 px plan był nieczytelny. */}
                <g fill="var(--color-ink-muted)" fontSize="18">
                  <text x="205" y="64" textAnchor="middle">
                    {event.venueShort}
                  </text>
                  <text x="104" y="220">
                    {event.streetShort}
                  </text>
                </g>

                {/* Róża wiatrów. */}
                <g stroke="var(--color-line)" strokeWidth="1.5">
                  <path d="M345 272 H381" />
                  <path d="M363 256 V288" />
                </g>
                <path
                  d="M363 250 L358 260 L368 260 Z"
                  fill="var(--color-line)"
                />
                <text
                  x="363"
                  y="246"
                  textAnchor="middle"
                  fontSize="16"
                  fill="var(--color-ink-muted)"
                >
                  Pn
                </text>
              </svg>
            </div>

            <figcaption className="mt-5 text-sm text-ink-muted">
              {location.venue}, {location.address}
            </figcaption>
          </figure>
        </div>
      </Container>
    </Section>
  );
}
