import {
  Button,
  Container,
  Section,
  SectionHeading,
} from "@/components/ui";
import { faq, faqCopy } from "@/lib/content";

/* Treść merytoryczna sekcji (lead, wezwanie do kontaktu) mieszka w `faqCopy`
   w content.ts — razem z pytaniami, których dotyczy. Tutaj zostają wyłącznie
   etykiety kompozycyjne: nadkreślenie i rozbity na dwa człony tytuł, którego
   nie da się zapisać jako zwykły łańcuch znaków. */
const copy = {
  eyebrow: "Pytania i odpowiedzi",
  titleMain: "Najczęstsze",
  titleAccent: "pytania",
} as const;

/**
 * Wskaźnik rozwinięcia: plus, który przy otwarciu obraca się w minus.
 *
 * Sam znak, bez kółka i obramowania — kółko z ramką przy każdym z dziewięciu
 * pytań robiło z listy zestaw kontrolek, a nie spis treści.
 */
function PlusMark({ className }: { className?: string }) {
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
    >
      <path d="M8 2.4V13.6" />
      <path d="M2.4 8H13.6" />
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
    <Section id="faq" tone="soft" labelledBy="faq-tytul">
      {/* Bez ornamentu. Enso stoi teraz w sekcji otwierającej jako pełnoprawny
          element kompozycji — powtórzone tutaj przy kryciu 0,05 było ledwie
          szarą plamą, czyli dokładnie tym, za co klient odrzucił poprzednią
          wersję. Jeden gest na stronę wystarczy. */}
      <Container className="relative">
        <SectionHeading
          id="faq-tytul"
          eyebrow={copy.eyebrow}
          align="center"
          title={
            <>
              {copy.titleMain}{" "}
              <span className="text-seal">{copy.titleAccent}</span>
            </>
          }
          lead={faqCopy.lead}
        />

        {/* ── AKORDEON ───────────────────────────────────────────
            Cienkie kreski między pozycjami i po zewnętrznej stronie listy —
            żadnych kart, ramek ani teł. Podział widać, a strona zostaje
            jednym arkuszem papieru. */}
        <div className="mx-auto mt-20 max-w-3xl divide-y divide-line border-y border-line">
          {faq.map((item) => (
            <details key={item.q} className="group">
              <summary className="flex cursor-pointer list-none items-start justify-between gap-6 py-7 text-left font-display text-xl text-ink transition-colors hover:text-seal [&::-webkit-details-marker]:hidden">
                <span className="text-balance">{item.q}</span>

                <PlusMark className="mt-2 h-5 w-5 shrink-0 text-ink-faint transition-transform duration-300 group-open:rotate-45" />
              </summary>

              <div className="pb-7 pr-10 text-base text-ink-muted">
                {item.a}
              </div>
            </details>
          ))}
        </div>

        {/* ── ZAPROSZENIE DO KONTAKTU ────────────────────────────
            Bez karty i bez ramki: wystarczy odstęp i kontrast wielkości
            między nagłówkiem a przyciskiem. */}
        <div className="mt-16 text-center">
          <h3 className="text-2xl">{faqCopy.ctaTitle}</h3>

          <Button href="#kontakt" variant="outline" className="mt-6">
            {faqCopy.ctaLabel}
          </Button>
        </div>
      </Container>
    </Section>
  );
}
