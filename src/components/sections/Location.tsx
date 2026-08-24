import { InkMountains, Lantern, SealStamp } from "@/components/ornaments";
import {
	Button,
	CjkGlyph,
	Container,
	Eyebrow,
	GoldRule,
	Pill,
	Section,
	SectionHeading,
} from "@/components/ui";
import { event, location, locationCopy } from "@/lib/content";

const mapsHref =
	"https://www.google.com/maps/search/?api=1&query=" +
	encodeURIComponent(location.mapsQuery);

/* ============================================================
   POGLĄDOWY PLAN OKOLICY

   Rysowany wektorowo, tak jak reszta grafiki w serwisie — bez plików,
   bez ramek osadzonych z zewnątrz i bez skryptów śledzących.

   Plan jest dekoracją i ma `aria-hidden`: pełna nazwa obiektu i adres
   stoją w bloku danych obok oraz w widocznym podpisie pod planem, a
   przycisk niżej prowadzi do map z nawigacją. Podpisy na rysunku biorą
   skróty z `content.ts`, żeby zmiana adresu nie zostawiała po sobie
   starej nazwy ulicy wklejonej w ścieżkę SVG.
   ============================================================ */

export default function Location() {
	return (
		<Section id="lokalizacja" tone="ink" labelledBy="lokalizacja-tytul">
			<InkMountains className="pointer-events-none absolute inset-x-0 bottom-0 h-40 w-full text-gold opacity-10" />
			{/* Cynober na tuszu daje 1,5:1 — latarnia znikała w tle. Na ciemnych
          sekcjach latarnia świeci złotem. */}
			<Lantern className="pointer-events-none absolute top-8 right-6 hidden h-24 w-16 origin-top text-gold opacity-60 animate-sway lg:block" />

			<Container className="relative">
				<SectionHeading
					id="lokalizacja-tytul"
					eyebrow="Lokalizacja"
					cjk="地圖"
					tone="ink"
					title={
						<>
							Gdzie i <span className="text-gold">kiedy</span>
						</>
					}
					lead={locationCopy.lead}
				/>

				<div className="mt-14 grid items-start gap-12 sm:mt-16 lg:grid-cols-2">
					{/* ── DANE ────────────────────────────────────────────── */}
					<div>
						<div className="flex items-start gap-5">
							{/* Pieczęć: seal na tonach jasnych, złoto na ciemnych. */}
							<SealStamp className="h-12 w-12 shrink-0 text-gold" />
							<div>
								{/* Nazwa obiektu jest najważniejszym tekstem bloku, więc
                    jest nagłówkiem, a nie tylko dużym napisem. Stoi poza
                    `address`, bo `address` nie może zawierać nagłówków. */}
								<h3 className="font-display text-2xl leading-tight text-balance text-paper sm:text-3xl">
									{location.venue}
								</h3>
								<address className="mt-2 not-italic text-paper/70">
									{location.address}
								</address>
							</div>
						</div>

						{/* Godziny — jedna tabela, dwa dni, bez rozstrzygania który lepszy. */}
						<div className="mt-8 rounded-sm border border-gold/20 bg-lacquer-deep/30 p-6">
							<div className="flex flex-wrap items-center justify-between gap-3">
								{/* Mikroetykieta kolumny, nie nagłówek — inaczej czytnik
                    ekranu dostawał h3 wielkości 11 px obok h3 wielkości 18 px. */}
								<Eyebrow tone="ink">{locationCopy.hoursTitle}</Eyebrow>
								<div className="flex flex-wrap gap-2">
									<Pill tone="ink">{event.dateShort}</Pill>
									<Pill tone="ink">{event.admission}</Pill>
								</div>
							</div>

							<div className="mt-5">
								{location.hours.map((slot, index) => (
									<div key={slot.day}>
										{index > 0 && <GoldRule className="my-4" />}
										<div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
											<span className="text-sm text-paper/85 sm:text-base">
												{slot.day}
											</span>
											<span className="font-display text-base text-gold-light sm:text-lg">
												{slot.time}
											</span>
										</div>
									</div>
								))}
							</div>
						</div>

						<ul className="mt-8 flex flex-col gap-6">
							{location.notes.map((note) => (
								<li key={note.title} className="flex items-start gap-4">
									<CjkGlyph className="mt-1 text-2xl text-gold/60">
										{note.cjk}
									</CjkGlyph>
									<div>
										<h3 className="font-display text-xl leading-snug text-paper">
											{note.title}
										</h3>
										<p className="mt-1.5 text-sm leading-relaxed text-pretty text-paper/70">
											{note.body}
										</p>
									</div>
								</li>
							))}
						</ul>
					</div>

					{/* ── PLAN OKOLICY ───────────────────────────────────── */}
					<div className="flex flex-col">
						<figure>
							<div className="rounded-sm border border-gold/25 bg-lacquer-deep/40 p-4">
								<iframe
									className="w-full"
									src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2562.283031014194!2d21.9518682!3d50.0435291!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x473cfb7f2d96b03f%3A0x1188c424c9861640!2sSzko%C5%82a%20Podstawowa%20Nr%2018%20Rzeszowie!5e0!3m2!1spl!2spl!4v1787557421917!5m2!1spl!2spl"
									width="600"
									height="450"
									style={{
										border: 0,
										filter: "invert(90%) hue-rotate(180deg)",
									}}
									allowFullScreen={true}
									loading="lazy"
									referrerPolicy="strict-origin-when-cross-origin"></iframe>
							</div>
						</figure>

						<Button
							variant="gold"
							size="md"
							href={mapsHref}
							target="_blank"
							rel="noopener noreferrer"
							className="mt-8 self-center text-center">
							{locationCopy.mapsLabel}
							<span className="sr-only"> (otwiera się w nowej karcie)</span>
						</Button>
					</div>
				</div>
			</Container>
		</Section>
	);
}
