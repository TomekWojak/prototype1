import { CloudBand, CloudPuff, Lantern } from "@/components/ornaments";
import {
  Button,
  Card,
  CjkGlyph,
  Container,
  GoldRule,
  Pill,
  Section,
  SectionHeading,
} from "@/components/ui";
import { activities, activitiesCopy, event } from "@/lib/content";

/**
 * Sekcja odświętna — czerwono-złoty rejestr plakatu o tańcu smoka i lwa.
 *
 * Ornamentów jest tu celowo mało. Wcześniej sekcja niosła ich piętnaście,
 * w tym cztery pełnowymiarowe pasy poziome, których nie ma żadna inna
 * sekcja — oprawa krzyczała głośniej niż program, który miała oprawić.
 * Zostały dwie bordiury chmur, dwie latarnie i dwie chmurki.
 *
 * Latarnie i chmury żyją tylko od `md:` w górę: na telefonie każdy piksel
 * szerokości jest potrzebny treści, a ozdoba zwisająca nad kartą zabiera
 * uwagę zamiast ją prowadzić.
 */

/**
 * Latarnie zwisają z bordiury; różne rozmiary i opóźnienia rozstrajają
 * kołysanie. Złoto, nie cynober: cynober na lace daje kontrast 1,5:1,
 * czyli plamę, której nie widać — a nie ornament.
 */
const lanterns = [
  {
    className:
      "hidden md:block pointer-events-none absolute top-0 left-4 h-32 w-20 origin-top text-gold opacity-60 animate-sway lg:left-10",
    delay: "0s",
  },
  {
    className:
      "hidden md:block pointer-events-none absolute top-0 right-5 h-40 w-24 origin-top text-gold opacity-60 animate-sway lg:right-12",
    delay: "1.6s",
  },
];

export default function Activities() {
  return (
    <Section id="aktywnosci" tone="lacquer" labelledBy="aktywnosci-tytul">
      {/* ── Bordiura górna: chmury pomyślności ─────────────────── */}
      <CloudBand className="pointer-events-none absolute inset-x-0 top-0 h-8 w-full text-gold opacity-20" />

      {lanterns.map((lantern) => (
        <Lantern
          key={lantern.delay}
          className={lantern.className}
          style={{ animationDelay: lantern.delay }}
        />
      ))}

      {/* Jedna chmura w tle — żeby laka nie była płaska, ale też żeby
          nie zbierać drugiego planu z trzech nakładających się warstw. */}
      <CloudPuff className="pointer-events-none absolute top-52 -left-10 hidden h-24 w-48 animate-drift text-gold opacity-10 md:block" />

      <Container className="relative">
        <SectionHeading
          id="aktywnosci-tytul"
          eyebrow="Program główny"
          cjk="節目"
          tone="lacquer"
          align="center"
          title={
            <>
              Aktywności <span className="text-gold">festiwalu</span>
            </>
          }
          lead={activitiesCopy.lead}
        />

        <div className="mt-14 grid gap-6 sm:mt-16 md:grid-cols-2 xl:grid-cols-3">
          {activities.map((activity) => (
            <Card key={activity.title} tone="lacquer" className="flex flex-col">
              {/* Plakietka i znak trzymają jedną linię bazową: znak jest
                  narożnikiem kompozycji, nie tłem pod tekstem. Krycie
                  niesie sama alfa koloru — inaczej `opacity-*` mnożyłoby
                  się przez nią i znak gasł dwa razy. */}
              <div className="flex items-start justify-between gap-4">
                <Pill tone="lacquer">{activity.tag}</Pill>
                <CjkGlyph className="-mt-2 shrink-0 text-5xl text-gold/25 transition-colors duration-300 group-hover:text-gold/45">
                  {activity.cjk}
                </CjkGlyph>
              </div>

              <h3 className="mt-5 font-display text-2xl leading-snug text-balance text-paper">
                {activity.title}
              </h3>

              <p className="mt-3 leading-relaxed text-pretty text-paper/70">
                {activity.lead}
              </p>

              <GoldRule className="my-6" />

              <ul className="flex flex-col gap-2.5">
                {activity.points.map((point) => (
                  <li key={point} className="flex items-start gap-3">
                    <span
                      aria-hidden="true"
                      className="mt-2 h-1.5 w-1.5 shrink-0 rotate-45 bg-gold"
                    />
                    <span className="text-sm leading-relaxed text-paper/80">
                      {point}
                    </span>
                  </li>
                ))}
              </ul>
            </Card>
          ))}
        </div>

        {/* ── Pasek domykający ───────────────────────────────────
            Co dokładnie powtarzamy w oba dni, a co gramy raz, mówi
            `activitiesCopy` — sekcja obiecywała kiedyś program
            „identyczny w oba dni”, choć kartę wyżej zapowiadała
            turniej „drugiego dnia”. */}
        <div className="relative mt-14 overflow-hidden rounded-sm border border-gold/25 bg-lacquer-deep/40 px-6 py-9 sm:mt-16 sm:px-10 sm:py-11">
          <CloudPuff className="pointer-events-none absolute -top-10 -right-10 h-28 w-56 text-gold opacity-10" />

          <div className="relative flex flex-col items-center gap-5 text-center">
            <Pill tone="lacquer">{event.dateShort}</Pill>

            <p className="max-w-xl font-display text-2xl leading-snug text-balance text-paper sm:text-3xl">
              {activitiesCopy.closingTitle}
            </p>

            <p className="max-w-xl text-sm leading-relaxed text-pretty text-paper/70">
              {activitiesCopy.closingBody}
            </p>

            {/* Bez `max-w-*` w `className`: szerokość i wewnętrzne
                marginesy ustawia `buttonClasses`, a o zwycięzcy decyduje
                kolejność w arkuszu, nie w atrybucie. */}
            <Button href="#warsztaty" variant="gold" size="lg" className="mt-1">
              {activitiesCopy.closingCta}
            </Button>

            <p className="text-[0.7rem] font-semibold tracking-[0.28em] uppercase text-gold-light/70">
              {event.venue} · {event.admission}
            </p>
          </div>
        </div>
      </Container>

      {/* ── Bordiura dolna ─────────────────────────────────────── */}
      <CloudBand className="pointer-events-none absolute inset-x-0 bottom-0 h-8 w-full rotate-180 text-gold opacity-20" />
    </Section>
  );
}
