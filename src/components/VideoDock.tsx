"use client";

import { useEffect, useState } from "react";
import { CjkGlyph, cx } from "@/components/ui";
import { stream } from "@/lib/content";

/**
 * Mini-odtwarzacz transmisji — panel wysuwany z prawego dolnego narożnika.
 *
 * Komponent kliencki, bo trzyma stan otwarcia i nasłuchuje klawiatury.
 * Pole 16:9 jest świadomie pustym miejscem: gdy transmisja ruszy, wystarczy
 * podmienić jeden blok na <iframe> — reszta panelu (nagłówek, wymiary,
 * animacja, dostępność) nie wymaga wtedy żadnej zmiany.
 */

const PANEL_ID = "transmisja-panel";
const TITLE_ID = "transmisja-tytul";

export default function VideoDock() {
	const [open, setOpen] = useState(false);

	/* Escape zamyka panel — nakładka wisi nad treścią strony, więc musi mieć
     wyjście awaryjne dla kogoś, kto nie używa myszy. */
	useEffect(() => {
		function handleKeyDown(eventKeyboard: KeyboardEvent) {
			if (eventKeyboard.key === "Escape") setOpen(false);
		}

		window.addEventListener("keydown", handleKeyDown);
		return () => window.removeEventListener("keydown", handleKeyDown);
	}, []);

	return (
		<div
			/* `data-nakladka` pozwala nagłówkowi wyciąć ten dok z kolejności
			   tabulacji, gdy otwarte jest menu mobilne — dok leży poza main
			   i footer, więc sam selektor landmarków by go nie objął. */
			data-nakladka
			className="pointer-events-none fixed right-0 bottom-0 z-50 flex flex-col items-end p-4 sm:p-6"
		>
			{/* PANEL — wysuwa się nad przyciskiem, dlatego stoi w drzewie przed nim. */}
			<div
				id={PANEL_ID}
				aria-labelledby={TITLE_ID}
				aria-hidden={open ? undefined : true}
				inert={!open}
				className={cx(
					/* Uwaga na wartości dowolne w Tailwindzie: spacje zapisuje się
					   podkreśleniem, a `calc` wymaga spacji wokół minusa. Zapis
					   `w-[min(22rem,calc(100vw-2rem))]` nie generował żadnej reguły
					   i panel schodził do 2 px szerokości na telefonie. */
					"w-[22rem] max-w-[calc(100vw_-_2rem)] sm:w-[24rem]",
					"origin-bottom-right overflow-hidden rounded-sm border border-gold/30 bg-lacquer-deep shadow-lacquer",
					/* Wyliczone właściwości zamiast `transition-all`: przy `all`
					   animowała się także `max-width`, więc każda zmiana szerokości
					   (np. obrót telefonu) przejeżdżała 300 ms reflow zamiast
					   przeskoczyć. Wysuwanie potrzebuje tylko tych trzech. */
					"transition-[opacity,translate,scale] duration-300 ease-out",
					open
						? "pointer-events-auto translate-y-0 scale-100 opacity-100"
						: "pointer-events-none translate-y-4 scale-95 opacity-0",
				)}>
				<div className="border-b border-gold/20 bg-lacquer px-4 py-3">
					<p className="flex items-center gap-2">
						<span
							aria-hidden="true"
							className="h-2 w-2 animate-breathe rounded-full bg-vermilion"
						/>
						<span className="text-[0.6rem] font-semibold tracking-[0.2em] text-gold-light uppercase">
							{stream.live}
						</span>
					</p>
					<p id={TITLE_ID} className="mt-1.5 text-sm font-semibold text-paper">
						{stream.title}
					</p>
				</div>

				<div className="relative aspect-video w-full bg-ink">
					{/* MIEJSCE NA RAMKĘ YOUTUBE — podmień ten blok na:
              <iframe className="absolute inset-0 h-full w-full"
                src="https://www.youtube.com/embed/ID"
                title="Transmisja na żywo — Festiwal Księga i Miecz"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; picture-in-picture"
                allowFullScreen /> */}
					<div
						aria-hidden="true"
						className="meander-band pointer-events-none absolute inset-x-0 top-0 h-px text-gold/20"
					/>
					<div
						aria-hidden="true"
						className="meander-band pointer-events-none absolute inset-x-0 bottom-0 h-px text-gold/20"
					/>
					<CjkGlyph className="pointer-events-none absolute -right-3 -bottom-5 text-[5.5rem] text-gold/8">
						直播
					</CjkGlyph>

					<div className="relative flex h-full w-full flex-col items-center justify-center gap-2.5 px-4">
						<svg
							viewBox="0 0 56 56"
							className="h-14 w-14 animate-breathe text-gold"
							aria-hidden="true"
							focusable="false">
							<circle
								cx="28"
								cy="28"
								r="25"
								fill="none"
								stroke="currentColor"
								strokeWidth="1.5"
								opacity="0.9"
							/>
							<path d="M23.5 18.5 L39 28 L23.5 37.5 Z" fill="currentColor" />
						</svg>
						<p className="text-xs tracking-widest text-gold-light/70 uppercase">
							{stream.placeholder}
						</p>
					</div>
				</div>

				{/* Nota o starcie transmisji — czyta ją też ktoś, kto trafia na panel
				    przed festiwalem. Przy tym stopniu pisma /45 dawało 4,24:1,
				    więc jaśniejszy tusz i większy stopień. */}
				<p className="border-t border-gold/20 bg-lacquer px-4 py-3 text-xs leading-relaxed text-paper/70">
					{stream.offlineNote}
				</p>
			</div>

			{/* PRZYCISK — jedyny stale widoczny element nakładki, więc zwinięty musi
			    być mały. Pełna etykieta rozpychała go do 244 px: przy 360 px zajmował
			    68% szerokości ekranu i — leżąc na z-50 — przechwytywał kliknięcia
			    w kontrolki, które wypadły na dole okna (przycisk zapisów, powrót na
			    początek). Zwinięty to kwadrat 44 × 44 z samą ikoną, a nazwa dostępna
			    zostaje w tekście `sr-only`. */}
			<button
				type="button"
				onClick={() => setOpen((wasOpen) => !wasOpen)}
				aria-expanded={open}
				aria-controls={PANEL_ID}
				className={cx(
					"pointer-events-auto mt-3 inline-flex items-center rounded-sm border border-gold/40 bg-vermilion",
					"text-xs font-semibold tracking-[0.16em] text-paper uppercase shadow-lacquer transition-colors hover:bg-seal",
					open ? "min-h-11 gap-2.5 px-5 py-3" : "h-11 w-11 justify-center",
				)}>
				<svg
					viewBox="0 0 24 24"
					className="h-4 w-4 shrink-0 text-paper/85"
					aria-hidden="true"
					focusable="false">
					<rect
						x="2.6"
						y="4"
						width="18.8"
						height="13"
						rx="1.6"
						fill="none"
						stroke="currentColor"
						strokeWidth="1.6"
					/>
					<path d="M10.2 8.6 L15.2 10.6 L10.2 12.6 Z" fill="currentColor" />
					<path
						d="M8.4 20.4 L15.6 20.4"
						stroke="currentColor"
						strokeWidth="1.6"
						strokeLinecap="round"
					/>
				</svg>

				{/* Gotowe etykiety z treści — żadnego składania odmiany wyrażeniem
				    regularnym. W stanie zwiniętym etykieta zostaje dla czytnika. */}
				<span className={cx(!open && "sr-only")}>
					{open ? stream.hideLabel : stream.showLabel}
				</span>

				{/* Strzałka schodzi razem z etykietą, żeby zmieścić się w kwadracie. */}
				{open && (
					<svg
						viewBox="0 0 14 14"
						className="h-3 w-3 shrink-0 rotate-180"
						aria-hidden="true"
						focusable="false">
						<path
							d="M2 9.2 L7 4.4 L12 9.2"
							fill="none"
							stroke="currentColor"
							strokeWidth="1.9"
							strokeLinecap="round"
							strokeLinejoin="round"
						/>
					</svg>
				)}
			</button>
		</div>
	);
}
