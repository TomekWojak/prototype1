import { SealStamp } from "@/components/ornaments";
import {
  Button,
  Card,
  Container,
  Eyebrow,
  Section,
  SectionHeading,
} from "@/components/ui";
import type { Content } from "@/lib/content";

export default function Location({
  location,
  locationCopy,
}: {
  location: Content["location"];
  locationCopy: Content["locationCopy"];
}) {
  const mapsHref =
    "https://www.google.com/maps/search/?api=1&query=" +
    encodeURIComponent(location.mapsQuery);

  return (
    <Section id="lokalizacja" tone="soft" labelledBy="lokalizacja-tytul">
      <Container>
        <SectionHeading
          id="lokalizacja-tytul"
          eyebrow={locationCopy.eyebrow}
          title={locationCopy.title}
          lead={locationCopy.lead}
        />

        <div className="mt-20 grid items-start gap-16 lg:grid-cols-2 lg:gap-20">
          <div>
            <div className="flex items-start justify-between gap-6">
              <div>
                <h3 className="text-2xl text-balance">{location.venue}</h3>
              </div>
              <SealStamp className="h-12 w-12 shrink-0 text-seal" />
            </div>

            {location.hours.length > 0 && (
              <div className="mt-16">
                <Eyebrow>{locationCopy.hoursTitle}</Eyebrow>
                <dl className="mt-6">
                  {location.hours.map((slot) => (
                    <div
                      key={slot.day}
                      className="flex justify-between gap-6 border-b border-line py-4"
                    >
                      <dt className="text-base text-ink-soft">{slot.day}</dt>
                      <dd className="font-display text-base text-ink">
                        {slot.time}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>
            )}

            <div className="mt-16 grid gap-10">
              {location.notes.map((note) => (
                <Card key={note.title}>
                  <h4 className="text-xl">{note.title}</h4>
                  <p className="mt-3 text-base text-pretty text-ink-muted">
                    {note.body}
                  </p>
                </Card>
              ))}
            </div>

            <div className="mt-14">
              <Button
                variant="outline"
                size="md"
                href={mapsHref}
                target="_blank"
                rel="noopener noreferrer"
              >
                {locationCopy.mapsLabel}
                <span className="sr-only"> (otwiera się w nowej karcie)</span>
              </Button>
            </div>
          </div>
          <figure>
            <div className="border border-line bg-paper p-6">
              <svg
                viewBox="0 0 400 300"
                className="h-auto w-full"
                aria-hidden="true"
                focusable="false"
              >
                <g fill="none" stroke="var(--color-line)">
                  <path d="M0 214 H400" strokeWidth="26" />
                  <path d="M86 0 V300" strokeWidth="18" />
                  <path d="M326 0 V300" strokeWidth="16" />
                </g>

                <g
                  fill="var(--color-paper-soft)"
                  stroke="var(--color-line)"
                  strokeWidth="1.5"
                >
                  <rect x="8" y="20" width="69" height="181" />
                  <rect x="334" y="20" width="58" height="181" />
                  <rect x="8" y="227" width="69" height="65" />
                  <rect x="95" y="227" width="223" height="65" />
                </g>

                <rect
                  x="95"
                  y="20"
                  width="223"
                  height="181"
                  fill="var(--color-paper-soft)"
                  stroke="var(--color-ink-faint)"
                  strokeOpacity="0.5"
                  strokeWidth="1.5"
                />

                <rect
                  x="145"
                  y="76"
                  width="120"
                  height="62"
                  fill="var(--color-seal)"
                />

                <circle
                  cx="205"
                  cy="107"
                  r="76"
                  fill="none"
                  stroke="var(--color-seal)"
                  strokeWidth="2.5"
                  className="animate-breathe"
                  style={{ transformOrigin: "205px 107px" }}
                />

                <g stroke="var(--color-line)" strokeWidth="1.5">
                  <path d="M345 272 H381" />
                  <path d="M363 256 V288" />
                </g>
                <path
                  d="M363 250 L358 260 L368 260 Z"
                  fill="var(--color-line)"
                />
                <text
                  x="363"
                  y="246"
                  textAnchor="middle"
                  fontSize="16"
                  fill="var(--color-ink-muted)"
                >
                  Pn
                </text>
              </svg>
            </div>

            <figcaption className="mt-5 text-sm text-ink-muted">
              {location.venue}
            </figcaption>
          </figure>
        </div>
      </Container>
    </Section>
  );
}
