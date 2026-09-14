import { OrnamentDefs } from "@/components/ornaments";
import SiteHeader from "@/components/SiteHeader";
import VideoDock from "@/components/VideoDock";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Activities from "@/components/sections/Activities";
import Workshops from "@/components/sections/Workshops";
import Registration from "@/components/sections/Registration";
import Location from "@/components/sections/Location";
import Partners from "@/components/sections/Partners";
import Faq from "@/components/sections/Faq";
import Contact from "@/components/sections/Contact";
import { getContent, type Content } from "@/lib/content";

function StructuredData({ content }: { content: Content }) {
  const { contact, event, faq, location } = content;

  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Festival",
        name: `${event.kicker} „${event.name}” — ${event.subtitle}`,

        ...(event.dateIso ? { startDate: event.dateIso } : {}),
        eventStatus: "https://schema.org/EventScheduled",
        eventAttendanceMode: "https://schema.org/MixedEventAttendanceMode",
        inLanguage: "pl",
        isAccessibleForFree: true,
        location: {
          "@type": "Place",
          name: location.venue,
          address: location.venue,
        },
        organizer: {
          "@type": "Organization",
          name: contact.organiser,
          email: contact.email,
        },
        description: event.lead,
      },
      {
        "@type": "FAQPage",
        mainEntity: faq.map((item) => ({
          "@type": "Question",
          name: item.q,
          acceptedAnswer: { "@type": "Answer", text: item.a },
        })),
      },
    ],
  };

  return (
    <script
      type="application/ld+json"

      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export default async function Home() {
  const content = await getContent();

  return (
    <>
      <StructuredData content={content} />
      {}
      <OrnamentDefs />

      <SiteHeader event={content.event} />

      {}
      <main id="tresc" tabIndex={-1} className="flex-1 outline-none">
        <Hero event={content.event} pillars={content.pillars} />
        <About
          event={content.event}
          aboutCopy={content.aboutCopy}
          pillars={content.pillars}
          aboutQuote={content.aboutQuote}
          modernCreed={content.modernCreed}
          modernCreedClosing={content.modernCreedClosing}
          audiences={content.audiences}
          audiencesTitle={content.audiencesTitle}
        />
        <Activities
          activities={content.activities}
          activitiesCopy={content.activitiesCopy}
        />
        <Workshops
          workshops={content.workshops}
          workshopsCopy={content.workshopsCopy}
        />
        <Registration
          event={content.event}
          formCopy={content.formCopy}
          workshops={content.workshops}
        />
        <Location
          location={content.location}
          locationCopy={content.locationCopy}
        />
        <Partners
          partnerGroups={content.partnerGroups}
          partnersCopy={content.partnersCopy}
        />
        <Faq faq={content.faq} faqCopy={content.faqCopy} />
      </main>

      {}
      <Contact
        event={content.event}
        contact={content.contact}
        contactCopy={content.contactCopy}
      />

      {}
      {content.stream.active ? <VideoDock stream={content.stream} /> : null}
    </>
  );
}
