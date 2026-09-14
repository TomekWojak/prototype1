import {
  BrushRule,
  Card,
  CjkGlyph,
  Container,
  Eyebrow,
  InkRule,
  Section,
  SectionHeading,
} from "@/components/ui";
import type {
  Quote,
  Pillar,
  Audience,
  FestivalEvent,
  Content,
} from "@/lib/content";

const creedNumerals = ["一", "二", "三", "四", "五", "六"] as const;

const pillarOrder = ["wen", "wu"] as const;

function PillarColumn({ pillar }: { pillar: Pillar }) {
  const traits: readonly string[] = pillar.traits;

  return (
    <div>
      <CjkGlyph className="block text-7xl text-ink/10">{pillar.cjk}</CjkGlyph>

      {}
      <h3 className="mt-4 text-2xl">
        {pillar.name}{" "}
        <span
          lang="zh-Latn"
          className="ml-3 text-lg font-normal text-ink-faint"
        >
          {pillar.pinyin}
        </span>
      </h3>

      <p className="mt-2 text-xs tracking-[0.2em] text-seal uppercase">
        {pillar.role}
      </p>

      <p className="mt-5 max-w-xl text-base text-pretty text-ink-muted">
        {pillar.description}
      </p>

      {}
      <p className="mt-5 text-sm text-ink-faint">{traits.join(" · ")}</p>
    </div>
  );
}

export default function About({
  event,
  aboutCopy,
  pillars,
  aboutQuote,
  modernCreed,
  modernCreedClosing,
  audiences,
  audiencesTitle,
}: {
  event: FestivalEvent;
  aboutCopy: Content["aboutCopy"];
  pillars: readonly Pillar[];
  aboutQuote: Quote;
  modernCreed: readonly string[];
  modernCreedClosing: string;
  audiences: readonly Audience[];
  audiencesTitle: string;
}) {
  const columns = pillarOrder
    .map((key) => pillars.find((pillar) => pillar.key === key))
    .filter((pillar): pillar is Pillar => pillar !== undefined);

  return (
    <Section id="o-festiwalu" tone="soft" labelledBy="o-festiwalu-tytul">
      <Container>
        <SectionHeading
          id="o-festiwalu-tytul"
          eyebrow={aboutCopy.eyebrow}
          title={aboutCopy.title}
          lead={event.lead}
        />

        {}
        <div className="mt-20 grid gap-14 lg:grid-cols-2">
          {columns.map((pillar) => (
            <PillarColumn key={pillar.key} pillar={pillar} />
          ))}
        </div>

        {}
        {}
        <figure className="mt-24 max-w-3xl">
          <BrushRule />
          <blockquote className="mt-8 font-display text-3xl leading-[1.15] text-balance text-ink sm:text-4xl">
            „{aboutQuote.text}”
          </blockquote>
          <figcaption className="mt-8 max-w-2xl text-base text-pretty text-ink-muted">
            {aboutQuote.note}
          </figcaption>
        </figure>

        {}
        {}
        <ol className="mt-24">
          {modernCreed.map((line, index) => (
            <li key={line}>
              <InkRule />
              <div className="flex items-baseline gap-6 py-7">
                <CjkGlyph className="w-8 shrink-0 text-2xl text-seal/40">
                  {creedNumerals[index % creedNumerals.length]}
                </CjkGlyph>
                <p className="font-display text-2xl leading-snug text-ink">
                  {line}
                </p>
              </div>
            </li>
          ))}
        </ol>

        <p className="mt-12 font-display text-xl text-seal">
          {modernCreedClosing}
        </p>

        {}
        <div className="mt-24">
          <Eyebrow>Uczestnicy</Eyebrow>

          <h3 className="mt-4 text-2xl sm:text-3xl">{audiencesTitle}</h3>

          {}
          <div className="mt-14 grid gap-x-14 gap-y-12 sm:grid-cols-2">
            {audiences.map((audience) => (
              <Card key={audience.title}>
                <h4 className="text-xl">{audience.title}</h4>
                <p className="mt-3 text-base text-pretty text-ink-muted">
                  {audience.description}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}
