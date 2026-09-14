import { Container, Eyebrow, Section, SectionHeading } from "@/components/ui";
import type { PartnerGroup, Content } from "@/lib/content";

export default function Partners({
  partnerGroups,
  partnersCopy,
}: {
  partnerGroups: readonly PartnerGroup[];
  partnersCopy: Content["partnersCopy"];
}) {
  return (
    <Section id="partnerzy" tone="paper" labelledBy="partnerzy-tytul">
      <Container>
        <SectionHeading
          id="partnerzy-tytul"
          eyebrow={partnersCopy.eyebrow}
          align="center"
          title={partnersCopy.title}
          lead={partnersCopy.lead}
        />

        <div className="mt-20">
          {partnerGroups.map((group, groupIndex) => (
            <div key={group.label} className={groupIndex === 0 ? "" : "mt-16"}>
              {}
              <Eyebrow className="text-center">{group.label}</Eyebrow>

              {}
              <ul className="mt-8 flex flex-wrap justify-center gap-x-10 gap-y-5">
                {group.partners.map((partner) => (
                  <li
                    key={partner.name}
                    className="max-w-[16rem] text-center text-base text-ink-soft"
                  >
                    {partner.name}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
