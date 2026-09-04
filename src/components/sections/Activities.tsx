import {
  Button,
  Card,
  CjkGlyph,
  Container,
  Section,
  SectionHeading,
} from "@/components/ui";
import { activities, activitiesCopy } from "@/lib/content";

/**
 * Program główny — sześć pozycji jako lista, nie jako siatka kafelków.
 *
 * Sekcja była wcześniej ciemną planszą laki ze złotem: dwie bordiury chmur,
 * dwie latarnie, chmura w tle i karty w układzie trzykolumnowym. Na telefonie
 * czytała się dobrze, bo wszystko układało się w jedną kolumnę — na dużym
 * ekranie rozsypywała się w rząd kafelków i to właśnie ona najmocniej ciągnęła
 * całą stronę w stronę szablonu.
 *
 * Teraz jest biała i nie ma tu ani jednego ornamentu. Treści jest sześć razy
 * po pięć linii, więc grafika nie miałaby gdzie wybrzmieć — podział niosą
 * cienkie kreski nad pozycjami (`Card`) i duże odstępy między nimi.
 * Maksymalnie dwie kolumny: przy trzech tytuły zaczynają się łamać, a lead
 * schodzi do dwóch słów w wierszu.
 */

export default function Activities() {
  return (
    <Section id="aktywnosci" tone="paper" labelledBy="aktywnosci-tytul">
      <Container>
        <SectionHeading
          id="aktywnosci-tytul"
          eyebrow="Program główny"
          title={
            <>
              Aktywności <span className="text-seal">festiwalu</span>
            </>
          }
          lead={activitiesCopy.lead}
        />

        <div className="mt-20 grid gap-x-14 gap-y-16 lg:grid-cols-2">
          {activities.map((activity) => (
            <Card key={activity.title}>
              {/* Znak i tytuł na jednej linii bazowej — znak jest częścią
                  nagłówka wiersza, nie plamą tła pod nim. `shrink-0`, bo
                  przy 360 px dwuznakowe 舞龍 dałoby się ścisnąć razem
                  z długim tytułem. */}
              <div className="flex items-baseline gap-4">
                <CjkGlyph className="shrink-0 text-2xl text-seal/50">
                  {activity.cjk}
                </CjkGlyph>
                <h3 className="text-2xl">{activity.title}</h3>
              </div>

              <p className="mt-2 text-xs tracking-[0.2em] text-ink-faint uppercase">
                {activity.tag}
              </p>

              <p className="mt-4 text-base text-pretty text-ink-muted">
                {activity.lead}
              </p>

              {/* Punkty programu: pauza zamiast rombu, kropki czy kolorowego
                  znacznika. Pauza jest dekoracją listy — semantykę niesie
                  już `<li>`, więc czytnik ekranu jej nie powtarza. */}
              <ul className="mt-5 space-y-2">
                {activity.points.map((point) => (
                  <li key={point} className="flex gap-3 text-sm text-ink-muted">
                    <span aria-hidden="true" className="text-ink-faint">
                      —
                    </span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </Card>
          ))}
        </div>

        {/* Blok domykający. Co powtarzamy w oba dni, a co gramy raz, mówi
            `activitiesCopy` — sekcja obiecywała kiedyś program „identyczny
            w oba dni”, choć kartę wyżej zapowiadała turniej „drugiego dnia”. */}
        <div className="mt-20 max-w-2xl">
          <h3 className="text-2xl">{activitiesCopy.closingTitle}</h3>

          <p className="mt-5 text-base text-pretty text-ink-muted">
            {activitiesCopy.closingBody}
          </p>

          <Button
            href="#warsztaty"
            variant="outline"
            size="lg"
            className="mt-8"
          >
            {activitiesCopy.closingCta}
          </Button>
        </div>
      </Container>
    </Section>
  );
}
