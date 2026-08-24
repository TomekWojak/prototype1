import { EnsoRing, PetalDrift } from "@/components/ornaments";
import {
  Button,
  Card,
  CjkGlyph,
  Container,
  Section,
  SectionHeading,
} from "@/components/ui";
import { contact, faq, faqCopy } from "@/lib/content";

/* Treść merytoryczna sekcji (lead, wezwanie do kontaktu) mieszka w
   `faqCopy` w content.ts — razem z pytaniami, których dotyczy. Tutaj zostają
   wyłącznie etykiety kompozycyjne: nadkreślenie i rozbity na dwa człony
   tytuł, których nie da się zapisać jako zwykły łańcuch znaków. */
const copy = {
  eyebrow: "Pytania i odpowiedzi",
  cjk: "問答",
  titleMain: "Najczęstsze",
  titleAccent: "pytania",
  ctaLead:
    "Odpowiadamy w ciągu dwóch dni roboczych — także na pytania szkół, grup zorganizowanych i partnerów.",
  ctaMailPrefix: "Albo napisz wprost na adres",
} as const;

/* Numeracja pytań chińskimi cyframi to ornament typograficzny, nie treść —
   dlatego mieszka w komponencie i nie trafia do drzewa dostępności. */
const numerals = [
  "一",
  "二",
  "三",
  "四",
  "五",
  "六",
  "七",
  "八",
  "九",
] as const;

/** Wskaźnik rozwinięcia: plus, który przy otwarciu obraca się w minus. */
function PlusMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 16 16"
      className={className}
      aria-hidden="true"
      focusable="false"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
    >
      <path d="M8 2.8V13.2" />
      <path d="M2.8 8H13.2" />
    </svg>
  );
}

/**
 * FAQ na natywnych <details>/<summary>.
 *
 * Dlaczego bez Reactowego stanu: akordeon musi działać przy wyłączonym
 * JavaScripcie, a przeglądarka daje z pudełka obsługę klawiatury, rolę
 * i komunikat „rozwinięte/zwinięte” dla czytników ekranu. Własna implementacja
 * mogłaby to tylko zepsuć — i zamieniłaby sekcję w komponent kliencki.
 */
export default function Faq() {
  return (
    <Section id="faq" tone="paperWarm" labelledBy="faq-tytul">
      {/* Warstwa ornamentów — ujemny z-index trzyma ją pod treścią, a brak
          zdarzeń wskaźnika pozwala klikać pytania na całej szerokości. */}
      <EnsoRing className="pointer-events-none absolute top-1/4 -left-32 -z-10 hidden h-96 w-96 text-ink opacity-[0.06] lg:block" />
      <PetalDrift className="pointer-events-none absolute inset-0 -z-10 h-full w-full text-vermilion opacity-[0.15]" />

      <Container className="relative">
        <SectionHeading
          id="faq-tytul"
          eyebrow={copy.eyebrow}
          cjk={copy.cjk}
          tone="paperWarm"
          align="center"
          title={
            <>
              {copy.titleMain}{" "}
              <span className="text-vermilion">{copy.titleAccent}</span>
            </>
          }
          lead={faqCopy.lead}
        />

        {/* ── AKORDEON ───────────────────────────────────────── */}
        <div className="mx-auto mt-14 max-w-3xl divide-y divide-ink/10 border-y border-ink/10 sm:mt-16">
          {faq.map((item, index) => (
            <details key={item.q} className="group">
              <summary className="flex cursor-pointer list-none items-start justify-between gap-5 py-5 text-left font-display text-lg text-ink transition-colors hover:text-vermilion sm:text-xl [&::-webkit-details-marker]:hidden">
                <span className="flex items-start gap-3.5 sm:gap-4">
                  <CjkGlyph className="mt-1.5 shrink-0 text-sm text-seal/40 sm:text-base">
                    {numerals[index % numerals.length]}
                  </CjkGlyph>
                  <span className="text-balance">{item.q}</span>
                </span>

                <span
                  aria-hidden="true"
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-seal/30 transition-colors duration-300 group-hover:border-vermilion/60 group-open:border-seal/60"
                >
                  <PlusMark className="h-3.5 w-3.5 transition-transform duration-300 group-open:rotate-45" />
                </span>
              </summary>

              {/* Wcięcie odpowiedzi równa się szerokości glifu numeracji plus
                  odstęp z <summary> — pytanie i odpowiedź stoją na jednej osi,
                  zamiast rozjeżdżać się o 28 px. */}
              <div className="pb-6 pl-[2.1rem] pr-12 leading-relaxed text-ink-soft sm:pl-9">
                {item.a}
              </div>
            </details>
          ))}
        </div>

        {/* ── ZAPROSZENIE DO KONTAKTU ────────────────────────── */}
        <div className="mx-auto mt-14 max-w-2xl sm:mt-16">
          <Card tone="paperWarm" className="text-center">
            <CjkGlyph className="pointer-events-none absolute -right-3 -bottom-6 text-8xl text-seal/10 transition-colors duration-300 group-hover:text-seal/20">
              問
            </CjkGlyph>

            <div className="relative flex flex-col items-center gap-4">
              <h3 className="font-display text-2xl leading-snug text-balance text-ink sm:text-3xl">
                {faqCopy.ctaTitle}
              </h3>

              <p className="max-w-md text-sm leading-relaxed text-pretty text-ink-soft">
                {copy.ctaLead}
              </p>

              <Button href="#kontakt" variant="outline" className="mt-1">
                {faqCopy.ctaLabel}
              </Button>

              {/* `text-ink-muted` daje na papierze ciepłym 4,12:1 — poniżej
                  progu AA dla tekstu tej wielkości. Stąd `text-ink-soft`. */}
              <p className="text-sm text-ink-soft">
                {copy.ctaMailPrefix}{" "}
                <a
                  href={`mailto:${contact.email}`}
                  className="font-semibold text-seal underline decoration-seal/40 underline-offset-4 transition-colors hover:text-vermilion hover:decoration-vermilion/60"
                >
                  {contact.email}
                </a>
              </p>
            </div>
          </Card>
        </div>
      </Container>
    </Section>
  );
}
