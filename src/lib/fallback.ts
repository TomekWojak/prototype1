export const event = {
	name: "Księga i Miecz",
	nameCjk: "文武",
	subtitle: "Wen & Wu",
	kicker: "Festiwal Kultury Chińskiej",
	date: "24–25 października 2026",
	venue: "Sala Sportowa SP nr 18, ul. Bł. Karoliny 21",
	admission: "Wstęp wolny",
	facts: ["24–25 października 2026", "Sala Sportowa SP nr 18", "Wstęp wolny"],
	tagline: "Poznaj bliżej kulturę i tradycję Chin",
	ctaPrimary: "Zapisz się na warsztaty",
	ctaSecondary: "Zobacz program",
	ctaHeader: "Zapisz się",
	lead: "Dwa dni, w których księga i miecz stoją obok siebie. Kaligrafia i taniec smoka, herbata i szabla, cisza pędzla i huk bębna - wszystko, co przez dwa tysiące lat składało się na chiński ideał człowieka pełnego.",
} as const;

export const navLinks = [
	{ href: "#o-festiwalu", label: "O festiwalu" },
	{ href: "#aktywnosci", label: "Aktywności" },
	{ href: "#warsztaty", label: "Warsztaty" },
	{ href: "#zapisy", label: "Zapisy" },
	{ href: "#lokalizacja", label: "Lokalizacja" },
	{ href: "#partnerzy", label: "Partnerzy" },
	{ href: "#faq", label: "FAQ" },
	{ href: "#kontakt", label: "Kontakt" },
] as const;

export type PillarDecoration = {
	key: string;
	cjk: string;
	pinyin: string;
	traits: readonly string[];
};

export const pillarDecorations = [
	{
		key: "wen",
		cjk: "文",
		pinyin: "Wén",
		traits: ["wiedza", "edukacja", "sztuka", "mądrość"],
	},
	{
		key: "wu",
		cjk: "武",
		pinyin: "Wǔ",
		traits: ["odwaga", "dyscyplina", "odpowiedzialność", "siła charakteru"],
	},
] as const;

export function pillarDecoration(index: number): PillarDecoration {
	return (
		pillarDecorations[index] ?? { key: "", cjk: "", pinyin: "", traits: [] }
	);
}

export const pillars = [
	{
		...pillarDecorations[0],
		name: "Wen",
		role: "Człowiek i kultura",
		description:
			"Strona księgi. To, co człowiek buduje w sobie w ciszy: cierpliwość nad pędzlem, uwaga przy parzeniu herbaty, ciekawość, która każe pytać dalej.",
	},
	{
		...pillarDecorations[1],
		name: "Wu",
		role: "Siła i harmonia",
		description:
			"Strona miecza. To, co człowiek buduje w sobie w ruchu: powtórzenie formy, panowanie nad ciałem, gotowość stanąć tam, gdzie trudno.",
	},
] as const;

export const aboutCopy = {
	eyebrow: "O festiwalu",
	title: "Dwa filary chińskiej kultury",
} as const;

export const aboutQuote = {
	text: "Wiedza pokazuje właściwy kierunek. Odwaga pozwala nim podążać.",
	note: "Największym ideałem w Chinach nie był wyłącznie uczony ani wojownik, lecz człowiek, który potrafił połączyć Wen i Wu. To właśnie dlatego mówi się o jedności księgi i miecza.",
} as const;

export const modernCreed = [
	"Rozwijaj umysł.",
	"Wzmacniaj ciało.",
	"Kształtuj charakter.",
] as const;

export const modernCreedClosing = "Prawdziwa siła rodzi się z harmonii.";

export const audiences = [
	{
		cjk: "家",
		title: "Rodziny z dziećmi",
		description:
			"Strefa rodzinna, warsztaty od 7 lat i pokazy, na których dzieci siedzą w pierwszym rzędzie. Wejście bez biletów, bez sztywnego harmonogramu.",
	},
	{
		cjk: "武",
		title: "Ćwiczący sztuki walki",
		description:
			"Formy Chen, praca z broniami, rozmowy z instruktorami z całej Polski. Przyjdź w stroju treningowym - będzie gdzie się rozgrzać.",
	},
	{
		cjk: "文",
		title: "Miłośnicy kultury i sztuki",
		description:
			"Kaligrafia, ceremonia gongfu cha, muzyka i gry planszowe Wschodu. Dla tych, których do Chin prowadzi pędzel, a nie pięść.",
	},
	{
		cjk: "壽",
		title: "Seniorzy i osoby początkujące",
		description:
			"Taijiquan zaczyna się od stania i oddechu. Nie potrzebujesz sprawności ani doświadczenia - tylko wygodnych butów.",
	},
] as const;

export const activities = [
	{
		title: "Taniec smoka",
		description:
			"Kilkunastometrowy smok na drążkach, prowadzony przez zgraną ekipę.\n\n- Symbolizuje szczęście i dobrobyt\n- Porusza się w rytm bębnów i talerzy\n- Pokaz główny, powtarzany w oba dni",
	},
	{
		title: "Taniec lwa",
		description:
			"Dwóch tancerzy w jednym kostiumie - i lew, który mruga, kłania się i psoci.\n\n- Odpędza złe duchy i przynosi błogosławieństwo\n- Towarzyszy Chińskiemu Nowemu Rokowi i festiwalom\n- Prowadzony przez bębny i talerze",
	},
	{
		title: "Pokazy sztuk walki",
		description:
			"Taijiquan stylu Chen, wushu, formy z bronią białą - na żywo, z omówieniem.\n\n- Formy ręczne i pokazy z broniami\n- Sekcje dzieci, młodzieży i dorosłych\n- Komentarz instruktora po każdym pokazie",
	},
	{
		title: "Ceremonia parzenia herbaty",
		description:
			"Gongfu cha: mały czajniczek, gorąca woda i bardzo dużo uwagi.\n\n- Pokaz pełnej ceremonii co godzinę\n- Degustacja herbat z Yunnanu i Fujianu\n- Rozmowa o tym, czym różni się parzenie od zaparzania",
	},
	{
		title: "Kaligrafia chińska",
		description:
			"Pędzel, tusz, papier ryżowy i pierwszy własny znak do zabrania do domu.\n\n- Stanowiska otwarte przez cały dzień\n- Nauka znaków 文 i 武 od podstaw\n- Własna kaligrafia na pamiątkę",
	},
	{
		title: "Gry Wschodu: weiqi i xiangqi",
		description:
			"Go i chińskie szachy - strategia, która uczy cierpliwości szybciej niż każdy wykład.\n\n- Stoliki do gry i krótkie partie pokazowe\n- Wprowadzenie w zasady w 10 minut\n- Turniej błyskawiczny drugiego dnia",
	},
] as const;

export const activityGlyphs = [
	"藝",
	"節",
	"華",
	"禮",
	"和",
	"道",
	"氣",
	"心",
	"風",
	"神",
] as const;

export function activityGlyph(index: number): string {
	return activityGlyphs[index % activityGlyphs.length] ?? "";
}

export const activitiesCopy = {
	eyebrow: "Program główny",
	title: "Aktywności festiwalu",
	lead: "Wszystko poniżej jest otwarte dla każdego - bez biletów, bez zapisów, w oba dni festiwalu.",
	closingTitle: "Pokazy główne powtarzamy w oba dni",
	closingBody:
		"Nie musisz wybierać dnia - tańce, pokazy sztuk walki, ceremonia herbaty i kaligrafia czekają i w sobotę, i w niedzielę. Jednorazowy jest tylko turniej błyskawiczny weiqi, który rozgrywamy w niedzielę.",
	closingCta: "Zobacz warsztaty z zapisami",
} as const;

export const workshopsCopy = {
	eyebrow: "Warsztaty",
	title: "Warsztaty z zapisami",
	lead: "Każdy warsztat ma ograniczoną liczbę miejsc. Pędzle, herbatę, maty i broń treningową zapewniamy - przynieś tylko wygodny strój.",
	rulesTitle: "Jak działają zapisy",
	rules: [
		"Jedna osoba, jeden warsztat - termin proponujemy w odpowiedzi",
		"Potwierdzenie e-mailem w ciągu dwóch dni roboczych",
		"Niepotwierdzone miejsca zwalniamy 5 minut przed startem",
	],
	ctaLabel: "Przejdź do zapisów",
} as const;

export const locationCopy = {
	eyebrow: "Lokalizacja",
	title: "Gdzie i kiedy",
	lead: "Sala sportowa SP nr 18 - kwadrans autobusem z Rynku, wejście z poziomu ulicy. Otwarte w oba dni festiwalu.",
	mapsLabel: "Otwórz w Mapach Google",
	hoursTitle: "Godziny otwarcia",
} as const;

export const partnersCopy = {
	eyebrow: "Partnerzy",
	title: "Kto tworzy festiwal",
	lead: "Festiwal powstaje we współpracy z miastem, związkami sportowymi i szkołami sztuk walki z Rzeszowa i całej Polski.",
} as const;

export const supportCopy = {
	eyebrow: "Przekaż nam 1,5%",
	title: "Wesprzyj nasze stowarzyszenie",
	body: "Ponadto zawsze można nas wesprzeć przelewem o tytule DAROWIZNA.",
	ctaLabel: "Zobacz dane do przelewu",
} as const;

export const faqCopy = {
	eyebrow: "Pytania i odpowiedzi",
	title: "Najczęstsze pytania",
	lead: "Zebrane pytania od uczestników, szkół i partnerów. Jeśli czegoś tu brakuje - napisz do nas.",
	ctaTitle: "Nie ma tu Twojego pytania?",
	ctaLabel: "Napisz do nas",
} as const;

export const contactCopy = {
	eyebrow: "Kontakt",
	title: "Napisz do nas",
	lead: "Pytania o program, współpracę, wolontariat i patronaty medialne - na adres poniżej. Odpisujemy w ciągu dwóch dni roboczych.",
	channelsTitle: "Śledź festiwal",
	navTitle: "Na tej stronie",
	backToTop: "Wróć na początek",
} as const;

export const workshops = [
	{
		cjk: "書法",
		title: "Kaligrafia: pierwsze pociągnięcie pędzla",
		duration: "60 min",
		level: "Bez doświadczenia",
		seats: 20,
		description:
			"Jak trzymać pędzel, jak oddychać przy kresce i dlaczego ten sam znak dwa razy nigdy nie wychodzi tak samo. Materiały zapewniamy.",
	},
	{
		cjk: "太極拳",
		title: "Taijiquan Chen - forma podstawowa",
		duration: "75 min",
		level: "Początkujący",
		seats: 30,
		description:
			"Osiem ruchów, które wystarczą na całe życie ćwiczenia. Pracujemy nad postawą, przenoszeniem ciężaru i spokojnym oddechem.",
	},
	{
		cjk: "功夫茶",
		title: "Gongfu cha - warsztat herbaty",
		duration: "45 min",
		level: "Dla wszystkich",
		seats: 16,
		description:
			"Parzysz sam, od pierwszego przelania po ostatni napar. Uczymy proporcji, temperatury i czasu - reszta to już uważność.",
	},
	{
		cjk: "武術",
		title: "Wushu dla dzieci",
		duration: "45 min",
		level: "Początkujący",
		age: "7–12 lat",
		seats: 24,
		description:
			"Rozgrzewka, podstawowe pozycje, kopnięcia i sporo hałasu. Dziecko wychodzi zmęczone i bardzo z siebie zadowolone.",
	},
	{
		cjk: "鼓",
		title: "Bęben lwa - rytm i sygnały",
		duration: "45 min",
		level: "Dla wszystkich",
		age: "od 10 lat",
		seats: 12,
		description:
			"Bez bębna lew się nie rusza. Uczymy trzech podstawowych rytmów i sygnałów, którymi perkusja prowadzi tancerzy.",
	},
	{
		cjk: "器械",
		title: "Szabla i włócznia - praca z bronią",
		duration: "60 min",
		level: "Średniozaawansowany",
		seats: 16,
		description:
			"Dla osób, które mają za sobą podstawy formy ręcznej. Broń treningowa na miejscu, obowiązkowy instruktaż bezpieczeństwa.",
	},
] as const;

export const formCopy = {
	eyebrow: "Zapisy",
	consentLabel: "Wyrażam zgodę na przetwarzanie moich danych osobowych.",
	consentLinkLabel: "polityce prywatności",
	consentUrl: "",
	stepsTitle: "Jak to działa",
	steps: [
		{
			title: "Wypełniasz formularz",
			description:
				"Cztery pola i jedno kliknięcie. Wybór konkretnego warsztatu ustalamy w odpowiedzi.",
		},
		{
			title: "Dostajesz potwierdzenie e-mailem",
			description:
				"W ciągu dwóch dni roboczych piszemy z terminem, salą i listą rzeczy do zabrania.",
		},
		{
			title: "Przychodzisz 15 minut przed startem",
			description:
				"Tyle wystarczy na przebranie się i spokojne zajęcie miejsca na macie.",
		},
	],
	title: "Zapisz się na warsztaty",
	lead: "Wejście na festiwal jest wolne i nie wymaga rejestracji. Zapisujemy tylko na warsztaty - miejsc jest tyle, ile pędzli i mat na sali.",
	submit: "Wyślij zgłoszenie",
	submitting: "Wysyłanie…",
	successTitle: "Zgłoszenie przyjęte",
	successBody:
		"Dziękujemy. Propozycję warsztatu i termin wyślemy na podany adres e-mail w ciągu dwóch dni roboczych.",
	againLabel: "Zgłoś kolejną osobę",
} as const;

export const location = {
	venue: event.venue,
	hours: [] as ReadonlyArray<{ day: string; time: string }>,
	notes: [
		{
			cjk: "門",
			title: "Wejście i dostępność",
			body: "Sala na poziomie parteru, wejście bez progów, wydzielone miejsca dla wózków przy scenie. Toaleta dostępna.",
		},
		{
			cjk: "車",
			title: "Dojazd i parking",
			body: "Bezpłatny parking przy szkole (ok. 60 miejsc) oraz parking osiedlowy od ul. Bł. Karoliny. Przystanek autobusowy 200 m od wejścia.",
		},
		{
			cjk: "時",
			title: "Ile to zajmie",
			body: "Ok. 15 minut autobusem z Rynku, 25 minut spacerem. Pełny obieg festiwalu to około 2 godziny.",
		},
	],
	mapsQuery: "Szkoła Podstawowa nr 18, Bł. Karoliny 21, 35-501 Rzeszów",
} as const;

export const partnerGroups = [
	{
		label: "Patronat i wsparcie",
		partners: [
			{ name: "Rzeszów 2026 - Europejskie Miasto Sportu" },
			{ name: "ACES Europe" },
			{ name: "Rzeszów - stolica innowacji" },
		],
	},
	{
		label: "Organizatorzy",
		partners: [
			{ name: "Fundacja Chen Taijiquan Rzeszów" },
			{ name: "Stowarzyszenie Chen Taijiquan Rzeszów" },
		],
	},
	{
		label: "Współorganizatorzy",
		partners: [
			{ name: "Polski Związek Wushu" },
			{ name: "Szkoła Sztuk Walki Vo Thuat Thanh Quyen" },
		],
	},
] as const;

export const faq = [
	{
		q: "Czy wstęp na festiwal jest płatny?",
		a: "Nie. Wstęp na cały festiwal jest wolny, w oba dni, bez biletów i bez rejestracji. Płatne nie są także pokazy ani degustacje herbaty.",
	},
	{
		q: "Czy muszę się zapisywać?",
		a: "Na pokazy, ceremonię herbaty i stanowiska kaligrafii - nie, wchodzisz i uczestniczysz. Zapisy dotyczą wyłącznie warsztatów, bo w każdym jest ograniczona liczba miejsc. Formularz znajdziesz w sekcji „Zapisy”.",
	},
	{
		q: "Dla kogo jest ten festiwal?",
		a: "Dla wszystkich - od dzieci po seniorów, od osób, które nigdy nie widziały taijiquan, po ćwiczących od lat. Program jest tak ułożony, żeby dało się przyjść na godzinę albo zostać na cały dzień.",
	},
	{
		q: "Co zabrać na warsztaty?",
		a: "Wygodny strój i obuwie na zmianę - sala jest halą sportową. Pędzle, tusz, papier, herbatę i broń treningową zapewniamy na miejscu. Nie musisz mieć nic własnego.",
	},
	{
		q: "Czy mogę przyjść z małym dzieckiem?",
		a: "Tak. Działa strefa rodzinna z matami i grami, dzieci do 7 lat pod opieką opiekuna. Warsztaty dla dzieci startują od 7 lat, ale na pokazy wiek nie ma znaczenia.",
	},
	{
		q: "Czy obiekt jest dostępny dla osób z niepełnosprawnościami?",
		a: "Tak. Wejście jest bez progów, sala znajduje się na parterze, a przy scenie wydzielamy miejsca dla osób na wózkach z pełnym widokiem na pokazy. Na miejscu jest dostępna toaleta.",
	},
	{
		q: "Czy będzie transmisja online?",
		a: "Tak, oba dni transmitujemy na żywo. Mini-odtwarzacz jest dostępny w prawym dolnym rogu tej strony - wystarczy rozwinąć panel „Transmisja”.",
	},
	{
		q: "Czy mogę robić zdjęcia i nagrywać?",
		a: "Tak, do celów prywatnych bez ograniczeń. Prosimy tylko o wyłączenie lampy błyskowej podczas ceremonii parzenia herbaty i pokazów z bronią. Media i twórcy komercyjni - prosimy o kontakt przed wydarzeniem.",
	},
	{
		q: "Czy na miejscu będzie coś do jedzenia?",
		a: "Będzie stoisko z herbatą i przekąskami. Pełną gastronomię znajdziesz w promieniu 300 m od sali - mamy listę lokali przy punkcie informacyjnym.",
	},
] as const;

export const contact = {
	organiser: "Fundacja Chen Taijiquan Rzeszów",
	email: "kontakt@ksiegaimiecz.pl",
	phone: "+48 17 000 00 00",
	transferTitle: "Dane do przelewu",
	taxId: "5170391083",
	courtRegister: "0000 402 564",
	statisticalId: "380330020",
	bankAccount: "02 1140 2004 0000 3402 8238 7016",
	channels: [
		{ label: "Facebook", href: null },
		{ label: "Instagram", href: null },
		{ label: "YouTube", href: null },
	],
} as const;

export const stream = {
	live: "Na żywo",
	title: "Transmisja na żywo",
	placeholder: "Miejsce na live YouTube",
	showLabel: "Pokaż transmisję",
	hideLabel: "Ukryj transmisję",
} as const;

export const defaultChannelUrls: Record<string, string> = {
	facebook:
		"https://www.facebook.com/p/Chen-Taijiquan-Rzesz%C3%B3w-100063528968853/",

	instagram:
		"https://www.instagram.com/explore/search/keyword/?q=chen%20taijiquan%20rzesz%C3%B3w",
	youtube: "https://www.youtube.com/",
};

export function defaultChannelUrl(label: string): string | null {
	return defaultChannelUrls[label.trim().toLowerCase()] ?? null;
}
