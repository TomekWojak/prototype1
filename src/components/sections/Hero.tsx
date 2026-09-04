import { Fragment } from "react";
import { KaligrafiaWenWu, SealStamp } from "@/components/ornaments";
import {
	Button,
	Container,
	cx,
	Eyebrow,
	InkRule,
	Section,
} from "@/components/ui";
import { event, pillars } from "@/lib/content";

/**
 * Sekcja otwierająca.
 *
 * Wcześniej stało tu siedem ornamentów naraz — słońce, enso, góry z pagodą,
 * dwie gałązki śliwy, płatki i chmurka — a pod nimi pasek czterech atrakcji
 * w kółkach i strzałka „przewiń”. Każdy element z osobna był poprawny;
 * razem dawały wrażenie szablonu.
 *
 * Teraz jest odwrotnie: biała pustka, jedno duże pociągnięcie tuszem
 * wychodzące poza prawą krawędź, nazwa, pionowy podpis 文武 i mała
 * czerwona pieczęć. Sekcję niesie przestrzeń i kontrast wielkości pisma,
 * nie liczba ozdób.
 */

type Pillar = (typeof pillars)[number];

/* Etykiety samego interfejsu. `content.ts` opisuje treść festiwalu, nie
   mechanikę strony, więc wezwania mają tu własny mikro-słownik — nadal
   w jednym miejscu, nadal bez zdań wpisanych wprost w JSX. */
const chrome = {
	ctaPrimary: "Zapisz się na warsztaty",
	ctaSecondary: "Zobacz program",
} as const;

/* Nazwa własna przychodzi z `content.ts` już rozłożona na wiersze plakatu
   (`titleLines`). Wiersz spójnika to środek listy — liczymy go z długości,
   żeby nie zaszywać tu ponownie założenia o liczbie słów. */
const conjunctionIndex = Math.floor((event.titleLines.length - 1) / 2);

/* Filary wyszukujemy po `key`, nie po pozycji w tablicy: przestawienie
   kolejności w `content.ts` nie ma prawa zamienić opisów miejscami. */
const wen = pillars.find((pillar) => pillar.key === "wen");
const wu = pillars.find((pillar) => pillar.key === "wu");

/* ============================================================
   LINIA FILARU — „WEN — człowiek i kultura”
   Bez karty, bez ramki, bez tła. Wiersz tekstu między kreskami.
   ============================================================ */

function PillarLine({
	pillar,
	className,
}: {
	pillar: Pillar;
	className?: string;
}) {
	return (
		<p
			className={cx(
				"text-sm tracking-[0.18em] text-ink-muted uppercase",
				className,
			)}>
			<span className="font-bold text-seal">{pillar.name}</span>
			<span className="px-2.5 text-ink-faint">—</span>
			{pillar.role}
		</p>
	);
}

export default function Hero() {
	return (
		<Section
			id="hero"
			tone="paper"
			labelledBy="hero-tytul"
			padded={false}
			className="flex min-h-[88svh] items-center pt-28 pb-20 sm:pt-32 sm:pb-24">
			<Container className="relative z-10">
				{/* Dwie kolumny zamiast ornamentu pozycjonowanego absolutnie.
            Enso jest pełnoprawnym elementem kompozycji, a nie tłem pod
            literami — dzięki temu może mieć pełne krycie i nigdy, przy
            żadnej szerokości, nie wejdzie pod nagłówek. */}
				<div className="flex items-center gap-12 xl:gap-20">
					<div className="max-w-3xl flex-1">
					<Eyebrow>{event.kicker}</Eyebrow>

					<div className="mt-8 flex items-start gap-8 sm:mt-10">
						{/* Jedyny <h1> w serwisie. Wiersze plakatu to bloki wewnątrz
                jednego nagłówka, więc hierarchia zostaje nietknięta. */}
						<h1
							id="hero-tytul"
							className="text-6xl leading-[0.92] sm:text-7xl lg:text-8xl">
							{/* Spacje między blokami są celowe: bez nich nazwa czyta się
                  czytnikom ekranu i przy kopiowaniu jako „KsięgaiMiecz”.
                  Bloki i tak łamią wiersz, więc wizualnie nic nie zmieniają. */}
							{event.titleLines.map((line, index) => (
								<Fragment key={`${line}-${index}`}>
									{index > 0 && " "}
									<span
										className={cx(
											"block",
											index === conjunctionIndex &&
												"text-3xl leading-none text-seal sm:text-4xl lg:text-5xl",
										)}>
										{line}
									</span>
								</Fragment>
							))}
						</h1>

						{/* Mały pionowy 文武 stał tu wcześniej. Zniknął, gdy obok
                nagłówka stanęła pełna kaligrafia tych samych dwóch
                znaków — powtórzony raz jeszcze przy tytule robił
                z sekcji trzy kopie tego samego napisu. */}
					</div>

					<p className="mt-8 max-w-xl text-lg text-pretty text-ink-muted sm:text-xl">
						{event.tagline}
					</p>

					{/* ── DWA FILARY ─────────────────────────────────────
              Dwa wiersze rozdzielone włosową kreską — jedyny podział
              w tej sekcji. */}
					<div className="mt-16 max-w-xl">
						<InkRule />
						{wen ? <PillarLine pillar={wen} className="py-5" /> : null}
						<InkRule />
						{wu ? <PillarLine pillar={wu} className="py-5" /> : null}
					</div>

					{/* ── PASEK FAKTÓW ───────────────────────────────────
              Bez ikon: kalendarzyk i pinezka przy dacie to pierwszy krok
              w stronę szablonu, a sama typografia niesie te trzy fakty
              bez pomocy. Na telefonie spokojna kolumna, od `sm:` jedna
              linia z włosowymi kreskami. */}
					<ul className="mt-16 flex flex-col gap-2 text-sm text-ink-muted sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-5">
						<li>
							<time dateTime={event.dateIso}>{event.dateLabel}</time>
						</li>

						<li
							aria-hidden="true"
							className="hidden h-4 w-px shrink-0 bg-line sm:block"
						/>

						<li>{event.venue}</li>

						<li
							aria-hidden="true"
							className="hidden h-4 w-px shrink-0 bg-line sm:block"
						/>

						<li>{event.admission}</li>
					</ul>

					{/* ── DWA WEZWANIA ───────────────────────────────────
              `items-start` zamiast domyślnego rozciągania: przyciski mają
              szerokość swojej treści, a przy 360 px kurczą się i łamią
              podpis zamiast wypychać stronę w poziomie. */}
					<div className="mt-12 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
						<Button
							href="#zapisy"
							variant="solid"
							size="lg"
							className="text-center">
							{chrome.ctaPrimary}
						</Button>
						<Button
							href="#aktywnosci"
							variant="outline"
							size="lg"
							className="text-center">
							{chrome.ctaSecondary}
						</Button>
					</div>

					</div>

					{/* Nazwa festiwalu kreślona pędzlem — jedyny gest tuszem
              w sekcji. Kolumna znaków plus pieczęć pod spodem to układ
              wprost ze zwoju: obraz, a pod nim podpis autora. */}
					<div className="hidden shrink-0 flex-col items-center gap-10 lg:flex">
						<KaligrafiaWenWu className="h-[26rem] w-[12.6rem] text-ink xl:h-[30rem] xl:w-[14.5rem]" />
						<SealStamp
							glyph={event.nameCjk}
							className="h-14 w-14 text-seal"
						/>
					</div>
				</div>
			</Container>
		</Section>
	);
}
