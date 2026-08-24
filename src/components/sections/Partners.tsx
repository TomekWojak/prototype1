import { BrushStroke, CloudBand, SealStamp } from "@/components/ornaments";
import { Container, cx, Section, SectionHeading } from "@/components/ui";
import { partnerGroups, partnersCopy } from "@/lib/content";

/**
 * Nie mamy praw do logotypów partnerów, więc każdy z nich dostaje znak
 * typograficzny: chiński monogram jako pieczęć 印章, łacińskie inicjały jako
 * kafelek na ciepłym papierze. Rozpoznajemy je po zakresie Unicode, a nie po
 * długości napisu — „VT” i „太” mają tyle samo znaków, ale zupełnie inną wagę
 * wizualną i inny font.
 */
const isCjk = (s: string) => /[㐀-鿿]/.test(s);

/* Kafelek łacińskiego monogramu. Warianty różnią się wyłącznie stopniem
   pisma — dłuższy skrót („R26”) musi zmieścić się w tym samym kwadracie,
   co dwuznakowy. Wcześniej stały tu obok siebie dwa niemal identyczne
   łańcuchy po ~200 znaków; przy każdej poprawce trzeba było pamiętać, żeby
   zmienić oba. */
const monogramTile =
  "flex h-14 w-14 items-center justify-center rounded-sm border border-ink/20 bg-paper-warm font-display font-semibold tracking-tight text-ink-soft";

export default function Partners() {
  return (
    <Section id="partnerzy" tone="paper" labelledBy="partnerzy-tytul">
      <CloudBand className="pointer-events-none absolute inset-x-0 top-0 h-6 w-full text-vermilion opacity-[0.12]" />
      <CloudBand className="pointer-events-none absolute inset-x-0 bottom-0 h-6 w-full rotate-180 text-vermilion opacity-[0.08]" />

      <Container>
        <SectionHeading
          id="partnerzy-tytul"
          eyebrow="Partnerzy"
          cjk="夥伴"
          tone="paper"
          align="center"
          title={
            <>
              Kto tworzy <span className="text-vermilion">festiwal</span>
            </>
          }
          lead={partnersCopy.lead}
        />

        <div className="mt-14 sm:mt-16">
          {partnerGroups.map((group, groupIndex) => (
            <div key={group.label} className={groupIndex === 0 ? "" : "mt-14"}>
              {/* Pociągnięcie pędzla oddziela grupy mocniej niż sam odstęp,
                  a nie wprowadza kolejnej linii do siatki. */}
              {groupIndex > 0 && (
                <BrushStroke className="mx-auto mb-14 h-2 w-24 text-vermilion/25" />
              )}

              <div className="flex items-center gap-4">
                <span aria-hidden="true" className="rule-ink h-px flex-1" />
                <h3 className="text-center text-[0.7rem] font-semibold tracking-[0.28em] text-seal uppercase">
                  {group.label}
                </h3>
                <span aria-hidden="true" className="rule-ink h-px flex-1" />
              </div>

              {/* Bez `group` i bez `group-hover:*`. Monogram nie jest linkiem
                  ani przyciskiem — nie mamy adresów stron partnerów — więc
                  podnoszenie się kafelka pod kursorem obiecywało kliknięcie,
                  po którym nic się nie działo. Statyczna ściana znaków jest
                  uczciwsza. */}
              <ul className="mt-8 flex flex-wrap justify-center gap-4 sm:gap-8">
                {group.partners.map((partner) => (
                  <li
                    key={partner.name}
                    className="flex flex-col items-center gap-3 px-1 py-2"
                  >
                    {isCjk(partner.monogram) ? (
                      <SealStamp
                        glyph={partner.monogram}
                        className="h-14 w-14 text-seal"
                      />
                    ) : (
                      <span
                        aria-hidden="true"
                        className={cx(
                          monogramTile,
                          partner.monogram.length > 2
                            ? "text-base"
                            : "text-lg",
                        )}
                      >
                        {partner.monogram}
                      </span>
                    )}

                    <span className="max-w-[11rem] text-center text-xs leading-snug text-ink-soft sm:text-sm">
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
        <p className="mx-auto mt-14 max-w-md text-center text-xs italic text-ink-muted">
          {partnersCopy.note}
        </p>
      </Container>
    </Section>
  );
}
