import { Fragment } from "react";
import {
  Button,
  Container,
  Section,
  SectionHeading,
} from "@/components/ui";
import { workshops, workshopsCopy } from "@/lib/content";
import { seats } from "@/lib/polish";

/**
 * Warsztaty — spis, a nie siatka kart.
 *
 * Poprzednia wersja pokazywała sześć kafelków z ramką, cieniem, znakiem
 * chińskim, numerem, czterema plakietkami z ikonami i rzędem kwadracików
 * odmierzających wolne miejsca. Sam ten licznik dokładał do dokumentu
 * 118 pustych elementów i wyglądał jak widget wyjęty z gotowego motywu —
 * a mówił dokładnie tyle, co słowo „20 miejsc” obok.
 *
 * Zostały dwie rzeczy, których czytelnik naprawdę potrzebuje: co to za
 * warsztat i na jakich warunkach się odbywa. Wiersze rozdziela jedna cienka
 * kreska, metadane stoją w jednej linii po prawej. Bez ornamentu — bambus
 * i śliwa zniknęły razem z importami.
 */

export default function Workshops() {
  return (
    <Section id="warsztaty" tone="soft" labelledBy="warsztaty-tytul">
      <Container>
        <SectionHeading
          id="warsztaty-tytul"
          eyebrow="Warsztaty"
          title={
            <>
              Warsztaty <span className="text-seal">z zapisami</span>
            </>
          }
          lead={workshopsCopy.lead}
        />

        <div className="mt-20 divide-y divide-line border-y border-line">
          {workshops.map((workshop) => {
            /* `age` ma tylko część warsztatów, więc w unii jest polem
               opcjonalnym. Operator `in` zawęża typ zamiast zmuszać do
               rzutowania — bez niego sam odczyt `workshop.age` byłby błędem. */
            const age = "age" in workshop ? workshop.age : null;

            /* Jedna linia metadanych składana z tego, co dany warsztat ma.
               Kolejność stała: czas, poziom, wiek (jeśli jest), miejsca. */
            const meta = [
              workshop.duration,
              workshop.level,
              ...(age ? [age] : []),
              seats(workshop.seats),
            ];

            return (
              <article
                key={workshop.title}
                className="grid gap-4 py-9 lg:grid-cols-[1fr_auto] lg:items-start lg:gap-14"
              >
                <div>
                  <h3 className="text-2xl">{workshop.title}</h3>

                  <p className="mt-3 max-w-xl text-base text-pretty text-ink-muted">
                    {workshop.description}
                  </p>
                </div>

                {/* Kropka środkowa jest interpunkcją układu, nie treścią —
                    stąd `aria-hidden`. Czytnik ekranu dostaje samą listę
                    wartości: „60 min”, „Bez doświadczenia”, „20 miejsc”. */}
                <p className="text-sm text-ink-muted lg:text-right">
                  {meta.map((item, index) => (
                    <Fragment key={`${item}-${index}`}>
                      {index > 0 && (
                        <span aria-hidden="true" className="px-2 text-ink-faint">
                          ·
                        </span>
                      )}
                      {item}
                    </Fragment>
                  ))}
                </p>
              </article>
            );
          })}
        </div>

        {/* Zasady zapisów: sam tekst, bez ramki, bez tła i bez pionowej
            kreski cynobru z lewej. Numery są powtórzeniem semantyki `<ol>`,
            więc niosą tylko kolor — czytnik ekranu numeruje pozycje sam. */}
        <div className="mt-20 max-w-2xl">
          <h3 className="text-2xl">{workshopsCopy.rulesTitle}</h3>

          <ol className="mt-6 space-y-4">
            {workshopsCopy.rules.map((rule, index) => (
              <li key={rule} className="flex items-baseline gap-4">
                <span aria-hidden="true" className="shrink-0 text-sm text-seal">
                  {index + 1}
                </span>
                <span className="text-base text-pretty text-ink-muted">
                  {rule}
                </span>
              </li>
            ))}
          </ol>

          <Button href="#zapisy" variant="solid" size="lg" className="mt-10">
            {workshopsCopy.ctaLabel}
          </Button>
        </div>
      </Container>
    </Section>
  );
}
