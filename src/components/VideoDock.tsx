"use client";

import { useEffect, useState } from "react";
import { CjkGlyph, cx } from "@/components/ui";
import { event, stream } from "@/lib/content";

/**
 * Mini-odtwarzacz transmisji — panel wysuwany z prawego dolnego narożnika.
 *
 * Komponent kliencki, bo trzyma stan otwarcia i nasłuchuje klawiatury.
 * Pole 16:9 jest świadomie pustym miejscem: gdy transmisja ruszy, wystarczy
 * podmienić jeden blok na <iframe> — reszta panelu (nagłówek, wymiary,
 * animacja, dostępność) nie wymaga wtedy żadnej zmiany.
 *
 * Panel był wcześniej ciemnym pudełkiem z laki, złotą ramką i pasami meandra:
 * jedyny element strony, który wyglądał jak z innej witryny. Teraz jest z tego
 * samego papieru co reszta — biel, cienka kreska, jedna czerwień. To także
 * jedyne miejsce w serwisie z cieniem, bo jako jedyne naprawdę unosi się nad
 * treścią i musi być od niej odklejone.
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
			className="pointer-events-none fixed right-0 bottom-0 z-50 flex flex-col items-end p-4 sm:p-6">
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
					"origin-bottom-right overflow-hidden border border-line bg-paper shadow-float",
					/* Wyliczone właściwości zamiast `transition-all`: przy `all`
					   animowała się także `max-width`, więc każda zmiana szerokości
					   (np. obrót telefonu) przejeżdżała 300 ms reflow zamiast
					   przeskoczyć. Wysuwanie potrzebuje tylko tych trzech. */
					"transition-[opacity,translate,scale] duration-300 ease-out",
					open
						? "pointer-events-auto translate-y-0 scale-100 opacity-100"
						: "pointer-events-none translate-y-4 scale-95 opacity-0",
				)}>
				<div className="border-b border-line px-5 py-4">
					<p className="flex items-center gap-2.5">
						<span
							aria-hidden="true"
							className="h-2 w-2 animate-breathe rounded-full bg-seal"
						/>
						<span className="text-xs tracking-[0.18em] text-seal uppercase">
							{stream.live}
						</span>
					</p>
					<p id={TITLE_ID} className="mt-2.5 text-base text-ink">
						{stream.title}
					</p>
					<p className="text-xs text-ink-muted">{stream.subtitle}</p>
				</div>

				<div className="relative aspect-video w-full bg-paper-soft">
					{/* MIEJSCE NA RAMKĘ YOUTUBE — podmień ten blok na:
              <iframe className="absolute inset-0 h-full w-full"
                src="https://www.youtube.com/embed/ID"
                title="Transmisja na żywo — Festiwal Księga i Miecz"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; picture-in-picture"
                allowFullScreen /> */}

					{/* Jeden gest na całe pole: 直播 („transmisja na żywo”) ledwie
					    odbite w papierze. Meander i złoty znak wodny wyszły razem
					    z resztą ozdobników. */}
					<CjkGlyph className="pointer-events-none absolute -right-4 -bottom-6 text-7xl text-ink/5">
						直播
					</CjkGlyph>

					<div className="relative flex h-full w-full flex-col items-center justify-center gap-4 px-4">
						<svg
							viewBox="0 0 56 56"
							className="h-12 w-12 text-seal"
							aria-hidden="true"
							focusable="false">
							<circle
								cx="28"
								cy="28"
								r="25"
								fill="none"
								stroke="currentColor"
								strokeWidth="1.4"
							/>
							<path d="M23.5 18.5 L39 28 L23.5 37.5 Z" fill="currentColor" />
						</svg>
						<p className="text-center text-xs tracking-[0.18em] text-ink-muted uppercase">
							{stream.placeholder}
						</p>
					</div>
				</div>

				{/* Stopka panelu: kiedy transmisja idzie. Data z treści, nie z JSX. */}
				<p className="border-t border-line px-5 py-3 text-xs tracking-[0.18em] text-ink-muted uppercase">
					{event.dateShort}
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
					"pointer-events-auto mt-3 inline-flex items-center bg-seal",
					"text-xs font-bold tracking-[0.18em] text-paper uppercase transition-colors duration-200 hover:bg-vermilion",
					open ? "min-h-11 gap-2.5 px-5 py-3" : "h-11 w-11 justify-center",
				)}>
				<svg
					viewBox="0 0 24 24"
					className="h-4 w-4 shrink-0"
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
