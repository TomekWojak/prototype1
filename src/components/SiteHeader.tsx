"use client";

import { useEffect, useState } from "react";
import { SealStamp } from "@/components/ornaments";
import { Button, Container, cx } from "@/components/ui";
import { event, navLinks } from "@/lib/content";

/**
 * Pasek nawigacji.
 *
 * Nad Hero jest przezroczysty — plakatowe tło ma zostać nietknięte. Dopiero po
 * przewinięciu pasek „materializuje się” w papier, żeby tekst linków nie walczył
 * z treścią sekcji przesuwającą się pod nim.
 */

/* Etykiety samego interfejsu paska. `content.ts` opisuje treść festiwalu, nie
   mechanikę nawigacji, więc chrome ma tu własny mikro-słownik — nadal w jednym
   miejscu, nadal bez tekstu wpisanego wprost w JSX. */
const chrome = {
	skip: "Przejdź do treści",
	cta: "Zapisz się",
	navLabel: "Nawigacja główna",
	openMenu: "Otwórz menu",
	closeMenu: "Zamknij menu",
} as const;

const MENU_ID = "menu-mobilne";

/** Cienka strzałka dla listy mobilnej — rysowana ręcznie, bez pliku i bez emoji. */
function Chevron({ className }: { className?: string }) {
	return (
		<svg
			viewBox="0 0 16 16"
			className={className}
			aria-hidden="true"
			focusable="false"
			fill="none"
			stroke="currentColor"
			strokeWidth="1.6"
			strokeLinecap="round"
			strokeLinejoin="round">
			<path d="M5.5 3 L11 8 L5.5 13" />
		</svg>
	);
}

export default function SiteHeader() {
	const [scrolled, setScrolled] = useState(false);
	const [open, setOpen] = useState(false);
	const [active, setActive] = useState("");

	/* Tło paska zależy od przewinięcia. Pierwsze wywołanie ustawia stan także
     wtedy, gdy przeglądarka przywróciła pozycję w środku strony. */
	useEffect(() => {
		const onScroll = () => setScrolled(window.scrollY > 40);
		onScroll();
		window.addEventListener("scroll", onScroll, { passive: true });
		return () => window.removeEventListener("scroll", onScroll);
	}, []);

	/* Podświetlenie aktywnej sekcji. Wąski pas obserwacji (45%–50% wysokości okna)
     działa jak celownik na środku ekranu: aktywna jest ta sekcja, którą
     użytkownik faktycznie czyta, a nie ta, która dopiero wchodzi w kadr. */
	useEffect(() => {
		const ids = navLinks.map((link) => link.href.slice(1));
		const sections = ids
			.map((id) => document.getElementById(id))
			.filter((el): el is HTMLElement => el !== null);

		if (sections.length === 0) return;

		const seen = new Set<string>();
		const observer = new IntersectionObserver(
			(entries) => {
				for (const entry of entries) {
					if (entry.isIntersecting) seen.add(entry.target.id);
					else seen.delete(entry.target.id);
				}
				// Kolejność z `navLinks` = kolejność w dokumencie, więc przy dwóch
				// sekcjach w pasie wygrywa ta wyżej — bez migania w trakcie przewijania.
				setActive(ids.find((id) => seen.has(id)) ?? "");
			},
			{ rootMargin: "-45% 0px -50% 0px", threshold: 0 },
		);

		sections.forEach((section) => observer.observe(section));
		return () => observer.disconnect();
	}, []);

	/* Cykl życia menu mobilnego: blokada przewijania tła, wyłączenie reszty
     strony z tabulacji i z drzewa dostępności, wyjście klawiszem Escape
     i zamknięcie, gdy okno urośnie do układu desktopowego (panel byłby wtedy
     ukryty, a przewijanie strony zostałoby zablokowane). */
	useEffect(() => {
		if (!open) return;

		const onKey = (e: KeyboardEvent) => {
			if (e.key === "Escape") setOpen(false);
		};
		const wide = window.matchMedia("(min-width: 1024px)");
		const onWide = (e: MediaQueryListEvent) => {
			if (e.matches) setOpen(false);
		};

		/* Samo `overflow: hidden` zatrzymuje tylko przewijanie — Tab i czytnik
		   ekranu nadal schodziły „pod” panel, do kilkunastu odnośników zakrytej
		   strony. `inert` wycina main i footer z obu tych ścieżek naraz.
		   Ustawiamy właściwość DOM, nie atrybut: React trzyma wtedy jeden
		   spójny stan elementu, a zdjęcie flagi nie zależy od nazwy atrybutu.
		   Lista bywa pusta (pierwszy render, portal) — `forEach` to znosi. */
		const zakryte = Array.from(
			/* `[data-nakladka]` to mini-odtwarzacz: leży poza main i footer,
			   więc bez tego jego przycisk zostawał w kolejności tabulacji
			   przy otwartym menu. */
			document.querySelectorAll<HTMLElement>("main, footer, [data-nakladka]"),
		);
		zakryte.forEach((el) => {
			el.inert = true;
		});

		const poprzedniOverflow = document.body.style.overflow;
		document.body.style.overflow = "hidden";
		window.addEventListener("keydown", onKey);
		wide.addEventListener("change", onWide);

		return () => {
			zakryte.forEach((el) => {
				el.inert = false;
			});
			document.body.style.overflow = poprzedniOverflow;
			window.removeEventListener("keydown", onKey);
			wide.removeEventListener("change", onWide);
		};
	}, [open]);

	const solid = scrolled || open;

	return (
		<header
			className={cx(
				"fixed inset-x-0 top-0 z-40 border-b transition-all duration-300 ease-out",
				solid
					? "border-ink/10 bg-paper/88 shadow-paper backdrop-blur-md"
					: "border-transparent bg-transparent",
			)}>
			{/* Pierwszy element w kolejności tabulacji — skrót do treści.
			    Celem jest `main#tresc`, a nie pierwsza sekcja: skok do
			    „#o-festiwalu” przeskakiwałby Hero, czyli całą pierwszą
			    ekranówkę, której użytkownik klawiatury nigdy by nie usłyszał. */}
			<a
				href="#tresc"
				className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-4 focus:z-50 focus:rounded-sm focus:border focus:border-seal/35 focus:bg-paper focus:px-4 focus:py-2 focus:text-[0.72rem] focus:font-semibold focus:tracking-[0.16em] focus:text-seal focus:uppercase focus:shadow-paper">
				{chrome.skip}
			</a>

			<nav aria-label={chrome.navLabel}>
				<Container>
					<div className="flex h-16 items-center justify-between gap-3 sm:h-[4.5rem] xl:gap-4">
						{/* ── Sygnatura: pieczęć + dwuwierszowy lockup ───────────── */}
						<a
							href="#hero"
							className="group flex shrink-0 items-center gap-3 rounded-sm">
							<SealStamp
								glyph={event.nameCjk}
								className="h-9 w-9 shrink-0 text-seal transition-transform duration-300 ease-out group-hover:-rotate-3"
							/>
							<span className="flex flex-col leading-none">
								<span className="font-display text-base font-semibold text-ink transition-colors duration-200 group-hover:text-seal xl:text-[1.05rem]">
									{event.name}
								</span>
								{/* Podpis ma niecałe 10 px — przy tej wielkości `ink-muted`
								    schodzi na tle paska do 3,59:1. `ink-soft` trzyma kontrast
								    tekstu drobnego. */}
								<span className="mt-1.5 text-[0.62rem] tracking-[0.28em] text-ink-soft uppercase">
									{event.subtitle}
								</span>
							</span>
						</a>

						{/* ── Linki sekcji (od lg) ───────────────────────────────────
                Osiem etykiet, pieczęć i CTA muszą zmieścić się w jednym
                wierszu już przy 1024 px — dlatego skala typografii rośnie
                dopiero na xl, a nie odwrotnie. */}
						<ul className="hidden items-center gap-0.5 lg:flex">
							{navLinks.map((link) => {
								const activeLink = link.href.slice(1) === active;
								return (
									<li key={link.href}>
										<a
											href={link.href}
											aria-current={activeLink ? "true" : undefined}
											className={cx(
												"group relative block px-1.5 py-2 text-[0.68rem] whitespace-nowrap tracking-[0.09em] uppercase transition-colors duration-200 xl:px-2 xl:text-[0.76rem] xl:tracking-[0.13em]",
												/* `seal`, nie `vermilion`: pasek jest półprzezroczysty,
												   więc pod etykietami bywa ciemna sekcja i tło miesza się
												   do ok. #e8dad6 — cynober daje tam 3,87:1, pieczęć 5,5:1. */
												activeLink
													? "text-seal"
													: "text-ink-soft hover:text-seal",
											)}>
											{link.label}
											<span
												aria-hidden="true"
												className={cx(
													"absolute inset-x-1.5 bottom-0.5 h-px origin-left bg-seal transition-transform duration-300 ease-out xl:inset-x-2",
													activeLink
														? "scale-x-100"
														: "scale-x-0 group-hover:scale-x-100 group-focus-visible:scale-x-100",
												)}
											/>
										</a>
									</li>
								);
							})}
						</ul>

						{/* ── Wezwanie do działania + hamburger ──────────────────── */}
						<div className="flex shrink-0 items-center gap-1.5">
							{/* Ukrywaniem steruje OPAKOWANIE, nie `className` przycisku.
							    `buttonClasses()` ustawia już `inline-flex` na tym samym
							    elemencie, a w Tailwind v4 wygrywa reguła późniejsza
							    w arkuszu, nie w atrybucie — `hidden` przegrywało, CTA
							    zostawało widoczne i przy 360 px wypychało hamburger
							    poza krawędź ekranu. Padding zostaje przy `size`. */}
							<span className="hidden sm:inline-flex">
								<Button href="#zapisy" variant="solid" size="md">
									{chrome.cta}
								</Button>
							</span>

							<button
								type="button"
								onClick={() => setOpen((prev) => !prev)}
								aria-label={open ? chrome.closeMenu : chrome.openMenu}
								aria-expanded={open}
								aria-controls={MENU_ID}
								className="inline-flex h-11 w-11 items-center justify-center rounded-sm text-ink transition-colors duration-200 hover:text-seal lg:hidden">
								<svg
									viewBox="0 0 24 24"
									className="h-6 w-6"
									aria-hidden="true"
									focusable="false">
									<g
										stroke="currentColor"
										strokeWidth="1.7"
										strokeLinecap="round">
										<line
											x1="4"
											y1="7"
											x2="20"
											y2="7"
											style={{ transformBox: "view-box" }}
											className={cx(
												"origin-center transition-transform duration-300 ease-out",
												open && "translate-y-[5px] rotate-45",
											)}
										/>
										<line
											x1="4"
											y1="12"
											x2="20"
											y2="12"
											className={cx(
												"transition-opacity duration-200",
												open ? "opacity-0" : "opacity-100",
											)}
										/>
										<line
											x1="4"
											y1="17"
											x2="20"
											y2="17"
											style={{ transformBox: "view-box" }}
											className={cx(
												"origin-center transition-transform duration-300 ease-out",
												open && "-translate-y-[5px] -rotate-45",
											)}
										/>
									</g>
								</svg>
							</button>
						</div>
					</div>
				</Container>

				{/* ── Panel mobilny ───────────────────────────────────────────
            Kontener zostaje w drzewie na stałe, żeby `aria-controls`
            zawsze wskazywał istniejący element; treść montuje się
            dopiero po otwarciu, więc linki nie łapią tabulacji, gdy
            menu jest zamknięte. */}
				<div id={MENU_ID} className="lg:hidden">
					{open && (
						<div className="animate-ink-in max-h-[calc(100dvh-4rem)] overflow-y-auto border-b border-ink/12 bg-paper shadow-paper">
							<Container>
								<ul className="flex flex-col">
									{navLinks.map((link, i) => {
										const activeLink = link.href.slice(1) === active;
										return (
											<li key={link.href} className="border-b border-ink/8">
												<a
													href={link.href}
													onClick={() => setOpen(false)}
													aria-current={activeLink ? "true" : undefined}
													className={cx(
														"group flex items-center gap-4 py-4 transition-colors duration-200",
														activeLink ? "text-seal" : "text-ink-soft",
													)}>
													<span
														aria-hidden="true"
														className={cx(
															"w-6 text-[0.7rem] tabular-nums",
															activeLink ? "text-seal" : "text-ink-faint",
														)}>
														{String(i + 1).padStart(2, "0")}
													</span>
													<span className="flex-1 text-[1.02rem] tracking-[0.01em]">
														{link.label}
													</span>
													<Chevron
														className={cx(
															"h-4 w-4 shrink-0 transition-all duration-200 group-hover:translate-x-0.5",
															activeLink ? "text-seal" : "text-ink-faint",
														)}
													/>
												</a>
											</li>
										);
									})}
								</ul>

								<div className="flex flex-col gap-4 py-6">
									<div
										aria-hidden="true"
										className="meander-band h-[5px] w-full text-seal/25"
									/>
									<p className="text-[0.68rem] tracking-[0.2em] text-ink-muted uppercase">
										{event.dateShort} · {event.admission}
									</p>
									<Button
										href="#zapisy"
										variant="solid"
										size="md"
										className="w-full"
										onClick={() => setOpen(false)}>
										{chrome.cta}
									</Button>
								</div>
							</Container>
						</div>
					)}
				</div>
			</nav>

			{/* Złota kreska pojawia się razem z tłem — pasek dostaje wtedy dolną
          krawędź jak bordiura zwoju. */}
			<div
				aria-hidden="true"
				className={cx(
					"rule-gold pointer-events-none absolute inset-x-0 bottom-0 h-px transition-opacity duration-300",
					solid ? "opacity-70" : "opacity-0",
				)}
			/>
		</header>
	);
}
