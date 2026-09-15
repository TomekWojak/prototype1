import { Fragment } from "react";
import { WenWuCalligraphy, SealStamp } from "@/components/ornaments";
import {
  Button,
  Container,
  cx,
  Eyebrow,
  InkRule,
  Section,
} from "@/components/ui";
import type { Pillar, FestivalEvent } from "@/lib/content";

function titleLines(
  name: string,
): ReadonlyArray<{ word: string; accent: boolean }> {
  const words = name.trim().split(/\s+/).filter(Boolean);

  return words.map((word, index) => ({
    word,
    accent: index > 0 && index < words.length - 1 && word.length <= 2,
  }));
}

function PillarLine({
  pillar,
  className,
}: {
  pillar: Pillar;
  className?: string;
}) {
  return (
    <p
      className={cx(
        "text-sm tracking-[0.18em] text-ink-muted uppercase",
        className,
      )}
    >
      <span className="font-bold text-seal">{pillar.name}</span>
      <span className="px-2.5 text-ink-faint">—</span>
      {pillar.role}
    </p>
  );
}

export default function Hero({
  event,
  pillars,
}: {
  event: FestivalEvent;
  pillars: readonly Pillar[];
}) {
  const lines = titleLines(event.name);

  const wen = pillars.find((pillar) => pillar.key === "wen");
  const wu = pillars.find((pillar) => pillar.key === "wu");

  return (
    <Section
      id="hero"
      tone="paper"
      labelledBy="hero-tytul"
      padded={false}
      className="flex min-h-[88svh] items-center pt-28 pb-20 sm:pt-32 sm:pb-24"
    >
      <Container className="relative z-10">
        <div className="flex items-center gap-12 xl:gap-20">
          <div className="max-w-3xl flex-1">
            <Eyebrow>{event.kicker}</Eyebrow>

            <div className="mt-8 flex items-start gap-8 sm:mt-10">
              <h1
                id="hero-tytul"
                className="text-6xl leading-[0.92] sm:text-7xl lg:text-8xl"
              >
                {lines.map(({ word, accent }, index) => (
                  <Fragment key={`${word}-${index}`}>
                    {index > 0 && " "}
                    <span
                      className={cx(
                        "block",
                        accent &&
                          "text-3xl leading-none text-seal sm:text-4xl lg:text-5xl",
                      )}
                    >
                      {word}
                    </span>
                  </Fragment>
                ))}
              </h1>
            </div>

            <p className="mt-8 max-w-xl text-lg text-pretty text-ink-muted sm:text-xl">
              {event.tagline}
            </p>

            <div className="mt-16 max-w-xl">
              <InkRule />
              {wen ? <PillarLine pillar={wen} className="py-5" /> : null}
              <InkRule />
              {wu ? <PillarLine pillar={wu} className="py-5" /> : null}
            </div>

            <ul className="mt-16 flex flex-col gap-2 text-sm text-ink-muted sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-5">
              {event.facts.map((fakt, index) => (
                <Fragment key={fakt}>
                  {index > 0 && (
                    <li
                      aria-hidden="true"
                      className="hidden h-4 w-px shrink-0 bg-line sm:block"
                    />
                  )}
                  <li>{fakt}</li>
                </Fragment>
              ))}
            </ul>

            <div className="mt-12 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
              <Button
                href="#zapisy"
                variant="solid"
                size="lg"
                className="text-center"
              >
                {event.ctaPrimary}
              </Button>
              <Button
                href="#aktywnosci"
                variant="outline"
                size="lg"
                className="text-center"
              >
                {event.ctaSecondary}
              </Button>
            </div>
          </div>

          <div className="hidden shrink-0 flex-col items-center gap-10 lg:flex">
            <WenWuCalligraphy className="h-[26rem] w-[12.6rem] text-ink xl:h-[30rem] xl:w-[14.5rem]" />
            <SealStamp glyph={event.nameCjk} className="h-14 w-14 text-seal" />
          </div>
        </div>
      </Container>
    </Section>
  );
}
