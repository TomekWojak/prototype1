import { Button, Container, Eyebrow, Section } from "@/components/ui";
import type { Content } from "@/lib/content";

export const TRANSFER_ID = "dane-do-przelewu";

export default function Support({
  supportCopy,
}: {
  supportCopy: Content["supportCopy"];
}) {
  return (
    <Section
      id="wsparcie"
      tone="soft"
      labelledBy="wsparcie-tytul"
      padded={false}
      className="border-y border-line py-16 sm:py-20"
    >
      <Container>
        <div className="flex flex-col gap-10 lg:flex-row lg:items-center lg:justify-between lg:gap-16">
          <div className="max-w-2xl">
            <Eyebrow>{supportCopy.eyebrow}</Eyebrow>

            <h2 id="wsparcie-tytul" className="mt-4 text-3xl sm:text-4xl">
              {supportCopy.title}
            </h2>

            <p className="mt-5 text-base text-pretty text-ink-muted">
              {supportCopy.body}
            </p>
          </div>

          {/* Przycisk przewija do danych w stopce, a nie otwiera nic nowego —
              stąd zwykła kotwica. `shrink-0`, żeby przy długim tytule nie
              ścisnął się do dwóch słów w wierszu. */}
          <Button
            href={`#${TRANSFER_ID}`}
            variant="solid"
            size="lg"
            className="shrink-0 text-center"
          >
            {supportCopy.ctaLabel}
          </Button>
        </div>
      </Container>
    </Section>
  );
}
