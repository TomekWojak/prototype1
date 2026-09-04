import { SealStamp } from "@/components/ornaments";
import { Container, Eyebrow, Section, SectionHeading } from "@/components/ui";
import { partnerGroups, partnersCopy } from "@/lib/content";

/**
 * Nie mamy praw do logotypów partnerów, więc każdy z nich dostaje znak
 * typograficzny: chiński monogram jako pieczęć 印章, łacińskie inicjały jako
 * pusty kwadrat z cienką kreską. Rozpoznajemy je po zakresie Unicode, a nie po
 * długości napisu — „VT” i „太” mają tyle samo znaków, ale zupełnie inną wagę
 * wizualną i inny krój.
 */
const isCjk = (s: string) => /[㐀-鿿]/.test(s);

/* Kwadrat łacińskiego monogramu. Bez tła, bez zaokrąglenia, bez cienia —
   sama kreska. Najdłuższy skrót („R26”) mieści się w tym samym kwadracie,
   co dwuznakowy, więc nie potrzeba już wariantów stopnia pisma. */
const monogramTile =
  "flex h-14 w-14 items-center justify-center border border-line font-display text-lg text-ink-muted";

export default function Partners() {
  return (
    <Section id="partnerzy" tone="paper" labelledBy="partnerzy-tytul">
      <Container>
        <SectionHeading
          id="partnerzy-tytul"
          eyebrow="Partnerzy"
          align="center"
          title={
            <>
              Kto tworzy <span className="text-seal">festiwal</span>
            </>
          }
          lead={partnersCopy.lead}
        />

        <div className="mt-20">
          {partnerGroups.map((group, groupIndex) => (
            <div key={group.label} className={groupIndex === 0 ? "" : "mt-16"}>
              {/* Etykieta grupy, nie nagłówek: to jedna linijka wielkości
                  15 px i nie ma czego zapowiadać w spisie nagłówków. */}
              <Eyebrow className="text-center">{group.label}</Eyebrow>

              {/* Bez `group` i bez `group-hover:*`. Monogram nie jest linkiem
                  ani przyciskiem — nie mamy adresów stron partnerów — więc
                  reakcja na kursor obiecywała kliknięcie, po którym nic się
                  nie działo. Statyczny rząd znaków jest uczciwszy. */}
              <ul className="mt-8 flex flex-wrap justify-center gap-x-12 gap-y-10">
                {group.partners.map((partner) => (
                  <li
                    key={partner.name}
                    className="flex flex-col items-center gap-4"
                  >
                    {isCjk(partner.monogram) ? (
                      <SealStamp
                        glyph={partner.monogram}
                        className="h-14 w-14 text-seal"
                      />
                    ) : (
                      <span aria-hidden="true" className={monogramTile}>
                        {partner.monogram}
                      </span>
                    )}

                    <span className="max-w-[12rem] text-center text-sm leading-snug text-ink-muted">
                      {partner.name}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Uczciwość wobec miasta i partnerów: pokazujemy układ, nie udajemy
            zgody na użycie znaków graficznych. */}
        <p className="mt-16 text-center text-sm text-ink-faint">
          {partnersCopy.note}
        </p>
      </Container>
    </Section>
  );
}
