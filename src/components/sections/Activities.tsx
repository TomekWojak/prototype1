import {
  Button,
  Card,
  CjkGlyph,
  Container,
  Section,
  SectionHeading,
} from "@/components/ui";
import type { Activity, Content } from "@/lib/content";

export default function Activities({
  activities,
  activitiesCopy,
}: {
  activities: readonly Activity[];
  activitiesCopy: Content["activitiesCopy"];
}) {
  return (
    <Section id="aktywnosci" tone="paper" labelledBy="aktywnosci-tytul">
      <Container>
        <SectionHeading
          id="aktywnosci-tytul"
          eyebrow={activitiesCopy.eyebrow}
          title={activitiesCopy.title}
          lead={activitiesCopy.lead}
        />

        <div className="mt-20 grid gap-x-14 gap-y-16 lg:grid-cols-2">
          {activities.map((activity) => (
            <Card key={activity.title}>
              {}
              <div className="flex items-baseline gap-4">
                {activity.cjk ? (
                  <CjkGlyph className="shrink-0 text-2xl text-seal/50">
                    {activity.cjk}
                  </CjkGlyph>
                ) : null}
                <h3 className="text-2xl">{activity.title}</h3>
              </div>

              {}
              <p className="mt-4 text-base whitespace-pre-line text-pretty text-ink-muted">
                {activity.description}
              </p>
            </Card>
          ))}
        </div>

        {}
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
