/**
 * Jedno źródło prawdy dla całej treści serwisu.
 *
 * Dlaczego osobny plik, a nie tekst wpisany w komponenty:
 * treść wydarzenia zmienia się częściej niż układ strony, a interesariusze
 * (miasto, partnerzy, szkoły) poprawiają zwykle słowa, nie kod. Trzymanie
 * copy w jednym miejscu pozwala im pracować bez dotykania JSX.
 *
 * UWAGA — PROTOTYP: dane kontaktowe, godziny, liczby miejsc i program
 * warsztatów są danymi ZASTĘPCZYMI. Fakty pewne (nazwa, data, adres,
 * hasła, partnerzy) pochodzą z materiałów promocyjnych festiwalu.
 */

/* ============================================================
   RDZEŃ WYDARZENIA
   ============================================================ */

export const event = {
	name: "Księga i Miecz",
	nameCjk: "文武",
	/* Nazwa rozbita jawnie na wiersze plakatu. Wcześniej Hero robił
	   `name.split(" ")` i milcząco zakładał, że słowa są dokładnie trzy. */
	titleLines: ["Księga", "i", "Miecz"],
	subtitle: "Wen & Wu",
	kicker: "Festiwal Kultury Chińskiej",
	nameEn: "Book and Sword Festival",
	dateLabel: "24–25 października 2026",
	dateShort: "24–25.10.2026",
	dateIso: "2026-10-24",
	venue: "Sala Sportowa SP nr 18",
	venueShort: "SP nr 18",
	street: "ul. Bł. Karoliny 21",
	streetShort: "Bł. Karoliny",
	postal: "35-501 Rzeszów",
	city: "Rzeszów",
	admission: "Wstęp wolny",
	tagline: "Poznaj bliżej kulturę i tradycję Chin",
	lead: "Dwa dni, w których księga i miecz stoją obok siebie. Kaligrafia i taniec smoka, herbata i szabla, cisza pędzla i huk bębna — wszystko, co przez dwa tysiące lat składało się na chiński ideał człowieka pełnego.",
} as const;

/* ============================================================
   NAWIGACJA — kolejność odpowiada kolejności sekcji na stronie
   ============================================================ */

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

/* ============================================================
   WEN & WU — dwa filary
   ============================================================ */

export const pillars = [
	{
		/* `key` zamiast polegania na kolejności w tablicy — sekcja „O festiwalu”
		   przypisuje filary do stron kompozycji właśnie po tym kluczu. */
		key: "wen",
		cjk: "文",
		pinyin: "Wén",
		name: "Wen",
		role: "Człowiek i kultura",
		description:
			"Strona księgi. To, co człowiek buduje w sobie w ciszy: cierpliwość nad pędzlem, uwaga przy parzeniu herbaty, ciekawość, która każe pytać dalej.",
		traits: ["wiedza", "edukacja", "sztuka", "mądrość"],
	},
	{
		key: "wu",
		cjk: "武",
		pinyin: "Wǔ",
		name: "Wu",
		role: "Siła i harmonia",
		description:
			"Strona miecza. To, co człowiek buduje w sobie w ruchu: powtórzenie formy, panowanie nad ciałem, gotowość stanąć tam, gdzie trudno.",
		traits: ["odwaga", "dyscyplina", "odpowiedzialność", "siła charakteru"],
	},
] as const;

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

/* ============================================================
   DLA KOGO JEST FESTIWAL
   ============================================================ */

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
			"Formy Chen, praca z broniami, rozmowy z instruktorami z całej Polski. Przyjdź w stroju treningowym — będzie gdzie się rozgrzać.",
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
			"Taijiquan zaczyna się od stania i oddechu. Nie potrzebujesz sprawności ani doświadczenia — tylko wygodnych butów.",
	},
] as const;

/* ============================================================
   AKTYWNOŚCI — program główny, otwarty dla wszystkich
   ============================================================ */

export const activities = [
	{
		cjk: "舞龍",
		title: "Taniec smoka",
		tag: "Pokaz główny",
		lead: "Kilkunastometrowy smok na drążkach, prowadzony przez zgraną ekipę.",
		points: [
			"Symbolizuje szczęście i dobrobyt",
			"Wykonywany przez zgraną ekipę tancerzy",
			"Porusza się w rytm bębnów i talerzy",
		],
	},
	{
		cjk: "舞獅",
		title: "Taniec lwa",
		tag: "Pokaz główny",
		lead: "Dwóch tancerzy w jednym kostiumie — i lew, który mruga, kłania się i psoci.",
		points: [
			"Odpędza złe duchy i przynosi błogosławieństwo",
			"Towarzyszy Chińskiemu Nowemu Rokowi i festiwalom",
			"Prowadzony przez bębny i talerze",
		],
	},
	{
		cjk: "武術",
		title: "Pokazy sztuk walki",
		tag: "Wu",
		lead: "Taijiquan stylu Chen, wushu, formy z bronią białą — na żywo, z omówieniem.",
		points: [
			"Formy ręczne i pokazy z broniami",
			"Sekcje dzieci, młodzieży i dorosłych",
			"Komentarz instruktora po każdym pokazie",
		],
	},
	{
		cjk: "茶道",
		title: "Ceremonia parzenia herbaty",
		tag: "Wen",
		lead: "Gongfu cha: mały czajniczek, gorąca woda i bardzo dużo uwagi.",
		points: [
			"Pokaz pełnej ceremonii co godzinę",
			"Degustacja herbat z Yunnanu i Fujianu",
			"Rozmowa o tym, czym różni się parzenie od zaparzania",
		],
	},
	{
		cjk: "書法",
		title: "Kaligrafia chińska",
		tag: "Wen",
		lead: "Pędzel, tusz, papier ryżowy i pierwszy własny znak do zabrania do domu.",
		points: [
			"Stanowiska otwarte przez cały dzień",
			"Nauka znaków 文 i 武 od podstaw",
			"Własna kaligrafia na pamiątkę",
		],
	},
	{
		cjk: "棋",
		title: "Gry Wschodu: weiqi i xiangqi",
		tag: "Wen",
		lead: "Go i chińskie szachy — strategia, która uczy cierpliwości szybciej niż każdy wykład.",
		points: [
			"Stoliki do gry i krótkie partie pokazowe",
			"Wprowadzenie w zasady w 10 minut",
			"Turniej błyskawiczny drugiego dnia",
		],
	},
] as const;

/* ============================================================
   CZTERY HASŁA Z PLAKATU
   Osobno od `activities`, bo plakat mówi krócej niż program:
   smok i lew stoją tam w jednym haśle. Trzymanie tego jako własnej
   listy zamiast sięgania do `activities` po indeksie sprawia, że
   przestawienie programu nie psuje po cichu sekcji Hero.
   ============================================================ */

export const posterHighlights = [
	{ cjk: "舞", label: "Smocze i lwie tańce" },
	{ cjk: "武", label: "Pokazy sztuk walki" },
	{ cjk: "茶", label: "Ceremonia parzenia herbaty" },
	{ cjk: "書", label: "Warsztaty kaligrafii" },
] as const;

/* ============================================================
   TEKSTY SEKCJI

   Leady, hasła domykające i zasady zapisów. Wcześniej mieszkały wprost
   w JSX poszczególnych sekcji, przez co zaczęły się rozjeżdżać: jedna
   sekcja obiecywała identyczny program w oba dni, druga zapowiadała
   turniej „drugiego dnia”; jedna kazała przyjść 15 minut przed startem,
   druga o tej samej godzinie zwalniała miejsce. Trzymanie tego obok
   danych, których dotyczy, jest jedynym sposobem, żeby takie sprzeczności
   dało się w ogóle zauważyć.
   ============================================================ */

export const activitiesCopy = {
	lead: "Wszystko poniżej jest otwarte dla każdego — bez biletów, bez zapisów, w oba dni festiwalu.",
	closingTitle: "Pokazy główne powtarzamy w oba dni",
	closingBody:
		"Nie musisz wybierać dnia — tańce, pokazy sztuk walki, ceremonia herbaty i kaligrafia czekają i w sobotę, i w niedzielę. Jednorazowy jest tylko turniej błyskawiczny weiqi, który rozgrywamy w niedzielę.",
	closingCta: "Zobacz warsztaty z zapisami",
} as const;

export const workshopsCopy = {
	lead: "Każdy warsztat ma ograniczoną liczbę miejsc. Pędzle, herbatę, maty i broń treningową zapewniamy — przynieś tylko wygodny strój.",
	rulesTitle: "Jak działają zapisy",
	rules: [
		"Jedna osoba, jeden warsztat — termin proponujemy w odpowiedzi",
		"Potwierdzenie e-mailem w ciągu dwóch dni roboczych",
		"Niepotwierdzone miejsca zwalniamy 5 minut przed startem",
	],
	ctaLabel: "Przejdź do zapisów",
} as const;

export const locationCopy = {
	lead: "Sala sportowa SP nr 18 — kwadrans autobusem z Rynku, wejście z poziomu ulicy. Otwarte w oba dni festiwalu.",
	mapCaption: "Poglądowy plan okolicy. Dokładna lokalizacja:",
	mapsLabel: "Otwórz w Mapach Google",
	hoursTitle: "Godziny otwarcia",
} as const;

export const partnersCopy = {
	lead: "Festiwal powstaje we współpracy z miastem, związkami sportowymi i szkołami sztuk walki z Rzeszowa i całej Polski.",
	note: "Logotypy partnerów zostaną wstawione w wersji produkcyjnej — powyżej monogramy zastępcze.",
} as const;

export const faqCopy = {
	lead: "Zebrane pytania od uczestników, szkół i partnerów. Jeśli czegoś tu brakuje — napisz do nas.",
	/* Bezrodzajowo: to jedyne miejsce w serwisie, gdzie zwrot do użytkownika
	   zdradzał rodzaj („Nie znalazłeś”). Reszta strony go unika. */
	ctaTitle: "Nie ma tu Twojego pytania?",
	ctaLabel: "Napisz do nas",
} as const;

export const contactCopy = {
	lead: "Pytania o program, współpracę i wolontariat — na adres główny. Media i patronaty mają osobną skrzynkę.",
	channelsTitle: "Śledź festiwal",
	navTitle: "Na tej stronie",
	backToTop: "Wróć na początek",
} as const;

/* ============================================================
   WARSZTATY — wymagają zapisu, limit miejsc

   `level` mówi wyłącznie o zaawansowaniu, a ograniczenia wiekowe mają
   własne pole `age`. Wcześniej jedno pole trzymało oba rodzaje informacji,
   przez co plakietka z ukrytą etykietą „Poziom:” czytała się czytnikom
   ekranu jako „Poziom: Poziom średni” albo „Poziom: 7–12 lat”.
   ============================================================ */

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
		title: "Taijiquan Chen — forma podstawowa",
		duration: "75 min",
		level: "Początkujący",
		seats: 30,
		description:
			"Osiem ruchów, które wystarczą na całe życie ćwiczenia. Pracujemy nad postawą, przenoszeniem ciężaru i spokojnym oddechem.",
	},
	{
		cjk: "功夫茶",
		title: "Gongfu cha — warsztat herbaty",
		duration: "45 min",
		level: "Dla wszystkich",
		seats: 16,
		description:
			"Parzysz sam, od pierwszego przelania po ostatni napar. Uczymy proporcji, temperatury i czasu — reszta to już uważność.",
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
		title: "Bęben lwa — rytm i sygnały",
		duration: "45 min",
		level: "Dla wszystkich",
		age: "od 10 lat",
		seats: 12,
		description:
			"Bez bębna lew się nie rusza. Uczymy trzech podstawowych rytmów i sygnałów, którymi perkusja prowadzi tancerzy.",
	},
	{
		cjk: "器械",
		title: "Szabla i włócznia — praca z bronią",
		duration: "60 min",
		level: "Średniozaawansowany",
		seats: 16,
		description:
			"Dla osób, które mają za sobą podstawy formy ręcznej. Broń treningowa na miejscu, obowiązkowy instruktaż bezpieczeństwa.",
	},
] as const;

/* ============================================================
   FORMULARZ ZAPISÓW
   ============================================================ */

export const formCopy = {
	eyebrow: "Zapisy",
	title: "Zapisz się na warsztaty",
	lead: "Wejście na festiwal jest wolne i nie wymaga rejestracji. Zapisujemy tylko na warsztaty — miejsc jest tyle, ile pędzli i mat na sali.",
	submit: "Wyślij zgłoszenie",
	submitting: "Wysyłanie…",
	successTitle: "Zgłoszenie przyjęte",
	/* Formularz nie ma wyboru warsztatu, więc obietnica nie może mówić
	   o „wybranym” terminie — to my proponujemy warsztat w odpowiedzi. */
	successBody:
		"Dziękujemy. Propozycję warsztatu i termin wyślemy na podany adres e-mail w ciągu dwóch dni roboczych.",
	againLabel: "Zgłoś kolejną osobę",
	prototypeNote:
		"To prototyp — zgłoszenie nie jest nigdzie wysyłane ani zapisywane.",
} as const;

/* ============================================================
   LOKALIZACJA
   ============================================================ */

export const location = {
	venue: event.venue,
	address: `${event.street}, ${event.postal}`,
	hours: [
		{ day: "Sobota, 24 października", time: "10:00–19:00" },
		{ day: "Niedziela, 25 października", time: "10:00–17:00" },
	],
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

/* ============================================================
   PARTNERZY — logotypy zastąpione monogramami-pieczęciami
   ============================================================ */

export const partnerGroups = [
	{
		label: "Patronat i wsparcie",
		partners: [
			{ name: "Rzeszów 2026 — Europejskie Miasto Sportu", monogram: "R26" },
			{ name: "ACES Europe", monogram: "AC" },
			{ name: "Rzeszów — stolica innowacji", monogram: "RZ" },
		],
	},
	{
		label: "Organizatorzy",
		partners: [
			{ name: "Fundacja Chen Taijiquan Rzeszów", monogram: "陳" },
			{ name: "Stowarzyszenie Chen Taijiquan Rzeszów", monogram: "太" },
		],
	},
	{
		label: "Współorganizatorzy",
		partners: [
			{ name: "Polski Związek Wushu", monogram: "武" },
			{ name: "Szkoła Sztuk Walki Vo Thuat Thanh Quyen", monogram: "VT" },
		],
	},
] as const;

/* ============================================================
   FAQ
   ============================================================ */

export const faq = [
	{
		q: "Czy wstęp na festiwal jest płatny?",
		a: "Nie. Wstęp na cały festiwal jest wolny, w oba dni, bez biletów i bez rejestracji. Płatne nie są także pokazy ani degustacje herbaty.",
	},
	{
		q: "Czy muszę się zapisywać?",
		a: "Na pokazy, ceremonię herbaty i stanowiska kaligrafii — nie, wchodzisz i uczestniczysz. Zapisy dotyczą wyłącznie warsztatów, bo w każdym jest ograniczona liczba miejsc. Formularz znajdziesz w sekcji „Zapisy”.",
	},
	{
		q: "Dla kogo jest ten festiwal?",
		a: "Dla wszystkich — od dzieci po seniorów, od osób, które nigdy nie widziały taijiquan, po ćwiczących od lat. Program jest tak ułożony, żeby dało się przyjść na godzinę albo zostać na cały dzień.",
	},
	{
		q: "Co zabrać na warsztaty?",
		a: "Wygodny strój i obuwie na zmianę — sala jest halą sportową. Pędzle, tusz, papier, herbatę i broń treningową zapewniamy na miejscu. Nie musisz mieć nic własnego.",
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
		a: "Tak, oba dni transmitujemy na żywo. Mini-odtwarzacz jest dostępny w prawym dolnym rogu tej strony — wystarczy rozwinąć panel „Transmisja”.",
	},
	{
		q: "Czy mogę robić zdjęcia i nagrywać?",
		a: "Tak, do celów prywatnych bez ograniczeń. Prosimy tylko o wyłączenie lampy błyskowej podczas ceremonii parzenia herbaty i pokazów z bronią. Media i twórcy komercyjni — prosimy o kontakt przed wydarzeniem.",
	},
	{
		q: "Czy na miejscu będzie coś do jedzenia?",
		a: "Będzie stoisko z herbatą i przekąskami. Pełną gastronomię znajdziesz w promieniu 300 m od sali — mamy listę lokali przy punkcie informacyjnym.",
	},
] as const;

/* ============================================================
   KONTAKT
   ============================================================ */

export const contact = {
	organiser: "Fundacja Chen Taijiquan Rzeszów",
	email: "kontakt@ksiegaimiecz.pl",
	phone: "+48 17 000 00 00",
	phoneHref: "+48170000000",
	pressEmail: "media@ksiegaimiecz.pl",
	/* `href: null` zamiast "#" — dopóki nie znamy prawdziwych adresów,
	   kanały renderują się jako tekst, a nie jako linki prowadzące donikąd. */
	channels: [
		{ label: "Facebook", handle: "/ksiegaimiecz", href: null },
		{ label: "Instagram", handle: "@ksiegaimiecz", href: null },
		{ label: "YouTube", handle: "Księga i Miecz", href: null },
	],
	channelsPending: "Profile uruchomimy przed festiwalem.",
	prototypeNote:
		"Prototyp strony festiwalu. Dane kontaktowe, godziny i program warsztatów są przykładowe.",
} as const;

/* ============================================================
   TRANSMISJA (mini-odtwarzacz)
   ============================================================ */

export const stream = {
	label: "Transmisja",
	live: "Na żywo",
	title: "Transmisja na żywo",
	subtitle: `Scena główna · ${event.venue}`,
	placeholder: "Miejsce na live YouTube",
	showLabel: "Pokaż transmisję",
	hideLabel: "Ukryj transmisję",
} as const;
