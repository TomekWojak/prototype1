import { Container, Eyebrow, Section, SectionHeading } from "@/components/ui";
import type { PartnerGroup, Content } from "@/lib/content";

/* Parametry skalowania CDN-a Sanity. Wysokość z zapasem na ekrany o dużej
   gęstości; pliki SVG serwer i tak zwraca w oryginale. */
function logoSrc(url: string): string {
  return `${url}?h=224&fit=max&auto=format`;
}

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
              <Eyebrow className="text-center">{group.label}</Eyebrow>

              <ul className="mt-8 flex flex-wrap items-start justify-center gap-x-10 gap-y-10">
                {group.partners.map((partner) => (
                  <li
                    key={partner.name}
                    className="flex max-w-[16rem] flex-col items-center gap-3 text-center"
                  >
                    {partner.logo ? (
                      /* Zwykły <img>, nie <Image> z Next.js: logotypy przychodzą
                         z CDN-a Sanity, który sam je skaluje przez parametry w
                         adresie, a next/image domyślnie odmawia obsługi SVG.
                         Pusty `alt` jest celowy - nazwa stoi tuż pod obrazkiem,
                         więc czytnik ekranu przeczytałby ją dwa razy. */
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={logoSrc(partner.logo.url)}
                        alt={partner.logo.alt}
                        width={partner.logo.width ?? undefined}
                        height={partner.logo.height ?? undefined}
                        loading="lazy"
                        className="h-14 w-auto max-w-[12rem] object-contain"
                      />
                    ) : null}

                    <span className="text-base text-ink-soft">
                      {partner.name}
                    </span>
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
