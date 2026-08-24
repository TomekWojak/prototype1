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
import { contact, event, faq, location } from "@/lib/content";

/**
 * Dane strukturalne — pozwalają wyszukiwarkom pokazać festiwal jako wydarzenie
 * (data, miejsce, wstęp) oraz wyświetlić pytania z FAQ wprost w wynikach.
 * Nie renderują niczego widocznego.
 */
function StructuredData() {
	const data = {
		"@context": "https://schema.org",
		"@graph": [
			{
				"@type": "Festival",
				name: "Festiwal Kultury Chińskiej „Księga i Miecz” — Wen & Wu",
				startDate: "2026-10-24T10:00",
				endDate: "2026-10-25T17:00",
				eventStatus: "https://schema.org/EventScheduled",
				eventAttendanceMode: "https://schema.org/MixedEventAttendanceMode",
				inLanguage: "pl",
				isAccessibleForFree: true,
				location: {
					"@type": "Place",
					name: location.venue,
					address: {
						"@type": "PostalAddress",
						streetAddress: "Bł. Karoliny 21",
						postalCode: "35-501",
						addressLocality: "Rzeszów",
						addressCountry: "PL",
					},
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
			// Treść jest w pełni statyczna i pochodzi z naszego pliku content.ts,
			// więc nie ma tu danych z zewnątrz, które trzeba by sanityzować.
			dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
		/>
	);
}

export default function Home() {
	return (
		<>
			<StructuredData />
			{/* Wspólne definicje SVG (filtry pędzla, symbol kwiatu) — raz na stronę. */}
			<OrnamentDefs />

			<SiteHeader />

			{/* `id` + `tabIndex` są celem linku „Przejdź do treści” — bez
			    tabIndex przeglądarka przewinie stronę, ale nie przeniesie
			    fokusu, więc następny Tab wróciłby do nawigacji. */}
			<main id="tresc" tabIndex={-1} className="flex-1 outline-none">
				<Hero />
				<About />
				<Activities />
				<Workshops />
				<Registration />
				<Location />
				<Partners />
				<Faq />
			</main>

			{/* Kontakt jest jednocześnie stopką — dlatego stoi poza <main>. */}
			<Contact />

			{/* Mini-odtwarzacz transmisji, przyklejony do prawego dolnego narożnika. */}
			<VideoDock />
		</>
	);
}
