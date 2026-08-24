import { BambooSprig, PlumBranch } from "@/components/ornaments";
import {
  Button,
  Card,
  CjkGlyph,
  Container,
  InkRule,
  Pill,
  Section,
  SectionHeading,
} from "@/components/ui";
import { workshops, workshopsCopy } from "@/lib/content";
import { seats } from "@/lib/polish";

/* W pliku zostają wyłącznie etykiety interfejsu: nadkreślenie, tytuł
   i ukryte podpisy plakietek. Zdania merytoryczne — lead, zasady zapisów
   i etykieta przycisku — mieszkają w `workshopsCopy` w content.ts, obok
   danych, których dotyczą. */
const copy = {
  eyebrow: "Warsztaty",
  cjk: "工作坊",
  titleMain: "Warsztaty",
  titleAccent: "z zapisami",
  labelDuration: "Czas trwania:",
  labelLevel: "Poziom:",
  labelAge: "Wiek:",
  /* Wartość plakietki brzmi już „20 miejsc”, więc etykieta nie powtarza
     rzeczownika — czytnik ekranu czyta „Limit: 20 miejsc”, nie
     „Liczba miejsc: 20 miejsc”. */
  labelSeats: "Limit:",
} as const;

type IconProps = { className?: string };

/* Ikony plakietek rysowane ręcznie: żadnych plików, żadnych emoji.
   Znaczenie niosą ukryte etykiety tekstowe, ikona jest tylko sygnałem. */
function ClockIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 16 16"
      className={className}
      aria-hidden="true"
      focusable="false"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="8" cy="8.2" r="5.9" />
      <path d="M8 4.8V8.3l2.5 1.6" />
    </svg>
  );
}

/* Trzy rosnące słupki — stopnie zaawansowania. Sylwetka człowieka opisuje
   teraz wiek, więc poziom potrzebował własnego znaku. */
function StepsIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 16 16"
      className={className}
      aria-hidden="true"
      focusable="false"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3.2 13.2v-2.9" />
      <path d="M8 13.2V7.1" />
      <path d="M12.8 13.2V3.6" />
    </svg>
  );
}

function FigureIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 16 16"
      className={className}
      aria-hidden="true"
      focusable="false"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="8" cy="4.3" r="2.3" />
      <path d="M3.3 13.6c0-2.6 2.1-4.6 4.7-4.6s4.7 2 4.7 4.6" />
    </svg>
  );
}

function SeatIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 16 16"
      className={className}
      aria-hidden="true"
      focusable="false"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4.6 2.6v6.2h6.8V2.6" />
      <path d="M2.9 8.8h10.2" />
      <path d="M4.6 8.8 4 13.4" />
      <path d="M11.4 8.8l.6 4.6" />
    </svg>
  );
}

/* Liczba miejsc pokazana też wizualnie — rytm kwadracików czyta się szybciej
   niż cyfra. Warstwa dekoracyjna: liczba zostaje w tekście plakietki. */
function SeatMeter({ count }: { count: number }) {
  return (
    <div
      aria-hidden="true"
      className="mt-5 flex flex-wrap items-center gap-[3px]"
    >
      {Array.from({ length: count }, (_, index) => (
        <span
          key={index}
          className="h-1.5 w-1.5 rounded-[1px] bg-seal/30 transition-colors duration-300 group-hover:bg-seal/55"
        />
      ))}
    </div>
  );
}

export default function Workshops() {
  return (
    <Section id="warsztaty" tone="paperWarm" labelledBy="warsztaty-tytul">
      <BambooSprig className="absolute top-24 right-[-2rem] hidden h-80 w-28 text-jade opacity-[0.12] lg:block" />
      <PlumBranch className="absolute -bottom-6 -left-10 hidden h-48 w-64 text-ink opacity-[0.14] md:block" />

      <Container className="relative">
        <SectionHeading
          id="warsztaty-tytul"
          eyebrow={copy.eyebrow}
          cjk={copy.cjk}
          tone="paperWarm"
          title={
            <>
              {copy.titleMain}{" "}
              <span className="text-vermilion">{copy.titleAccent}</span>
            </>
          }
          lead={workshopsCopy.lead}
        />

        <div className="mt-14 grid gap-6 sm:mt-16 md:grid-cols-2 xl:grid-cols-3">
          {workshops.map((workshop, index) => {
            /* `age` ma tylko część warsztatów, więc w unii jest polem
               opcjonalnym. Operator `in` zawęża typ zamiast zmuszać do
               rzutowania — bez niego sam odczyt `workshop.age` byłby błędem. */
            const age = "age" in workshop ? workshop.age : null;

            return (
              <Card
                key={workshop.title}
                tone="paperWarm"
                className="flex h-full flex-col"
              >
                <div className="flex items-start justify-between gap-4">
                  <CjkGlyph className="text-3xl text-seal/45">
                    {workshop.cjk}
                  </CjkGlyph>
                  <span
                    aria-hidden="true"
                    className="font-display text-sm tracking-widest text-ink-faint"
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>

                <h3 className="mt-5 font-display text-xl leading-snug text-balance text-ink">
                  {workshop.title}
                </h3>

                <p className="mt-3 text-sm leading-relaxed text-ink-soft">
                  {workshop.description}
                </p>

                {/* mt-auto dociska stopkę do dołu, żeby plakietki wszystkich
                    kart w rzędzie leżały na jednej linii. */}
                <div className="mt-auto">
                  <InkRule className="my-5" />

                  <div className="flex flex-wrap items-center gap-2">
                    <Pill tone="paperWarm">
                      <ClockIcon className="h-3.5 w-3.5 shrink-0 opacity-70" />
                      <span className="sr-only">{copy.labelDuration}</span>
                      {workshop.duration}
                    </Pill>
                    <Pill tone="paperWarm">
                      <StepsIcon className="h-3.5 w-3.5 shrink-0 opacity-70" />
                      <span className="sr-only">{copy.labelLevel}</span>
                      {workshop.level}
                    </Pill>
                    {age && (
                      <Pill tone="paperWarm">
                        <FigureIcon className="h-3.5 w-3.5 shrink-0 opacity-70" />
                        <span className="sr-only">{copy.labelAge}</span>
                        {age}
                      </Pill>
                    )}
                    <Pill tone="paperWarm">
                      <SeatIcon className="h-3.5 w-3.5 shrink-0 opacity-70" />
                      <span className="sr-only">{copy.labelSeats}</span>
                      {seats(workshop.seats)}
                    </Pill>
                  </div>

                  <SeatMeter count={workshop.seats} />
                </div>
              </Card>
            );
          })}
        </div>

        {/* Panel zasad — jaśniejszy papier i pionowa kreska cynobru czytają się
            jak notatka organizatora przypięta pod programem. */}
        <div className="mt-14 rounded-sm border-l-4 border-vermilion bg-paper p-6 shadow-paper sm:mt-16 sm:p-10 lg:flex lg:items-end lg:justify-between lg:gap-12">
          <div className="lg:max-w-3xl">
            <h3 className="font-display text-2xl leading-snug text-ink sm:text-3xl">
              {workshopsCopy.rulesTitle}
            </h3>

            <ol className="mt-7 grid gap-5 sm:grid-cols-3 sm:gap-6">
              {workshopsCopy.rules.map((rule, index) => (
                <li key={rule} className="flex items-start gap-3">
                  <span
                    aria-hidden="true"
                    className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-seal/30 font-display text-sm text-seal"
                  >
                    {index + 1}
                  </span>
                  <span className="text-sm leading-relaxed text-ink-soft">
                    {rule}
                  </span>
                </li>
              ))}
            </ol>
          </div>

          <Button
            href="#zapisy"
            variant="solid"
            size="lg"
            className="mt-8 w-full lg:mt-0 lg:w-auto lg:shrink-0"
          >
            {workshopsCopy.ctaLabel}
          </Button>
        </div>
      </Container>
    </Section>
  );
}
