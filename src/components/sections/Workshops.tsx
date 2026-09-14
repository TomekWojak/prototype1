import { Fragment } from "react";
import { Button, Container, Section, SectionHeading } from "@/components/ui";
import type { Content, Workshop } from "@/lib/content";
import { seats } from "@/lib/polish";

export default function Workshops({
  workshops,
  workshopsCopy,
}: {
  workshops: readonly Workshop[];
  workshopsCopy: Content["workshopsCopy"];
}) {
  return (
    <Section id="warsztaty" tone="soft" labelledBy="warsztaty-tytul">
      <Container>
        <SectionHeading
          id="warsztaty-tytul"
          eyebrow={workshopsCopy.eyebrow}
          title={workshopsCopy.title}
          lead={workshopsCopy.lead}
        />

        <div className="mt-20 divide-y divide-line border-y border-line">
          {workshops.map((workshop) => {
            const age = "age" in workshop ? workshop.age : null;

            const meta = [
              workshop.duration,
              workshop.level,
              age,
              typeof workshop.seats === "number"
                ? seats(workshop.seats)
                : undefined,
            ].filter((entry): entry is string => (entry ?? "").trim() !== "");

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

                {}
                <p className="text-sm text-ink-muted lg:text-right">
                  {meta.map((item, index) => (
                    <Fragment key={`${item}-${index}`}>
                      {index > 0 && (
                        <span
                          aria-hidden="true"
                          className="px-2 text-ink-faint"
                        >
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

        {}
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
