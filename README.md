# Festiwal „Księga i Miecz” — Wen & Wu

Prototyp jednostronicowej witryny festiwalu kultury chińskiej.
Rzeszów, 24–25 października 2026, Sala Sportowa SP nr 18.

**Next.js 16.3** (App Router, Turbopack) · **React 19.2** · **TypeScript** (strict) · **Tailwind CSS v4**

```bash
npm run dev     # http://localhost:3000
npm run build
```

---

## Kierunek wizualny: cisza

Punkt odniesienia to **chen.rzeszow.pl** — czystość, zen, malarstwo tuszem.
Strona stoi na **przestrzeni i typografii**, nie na ozdobnikach.

Pierwsza wersja prototypu poszła w drugą stronę: gradientowe tła w każdej sekcji,
ziarno papieru, ciemne sekcje laki ze złotem, latarnie, chmury pomyślności, bordiury
meandra, kwiaty śliwy, bambus, karty z obramowaniami i cieniami. Każdy z tych elementów
z osobna wyglądał poprawnie — dopiero ich **nagromadzenie** dało efekt szablonu.
Uwaga klienta brzmiała: „zalatuje Canvą okrutnie”.

Obecna wersja jest odwrotnością tamtej i trzyma się czterech reguł:

1. **Biel i tusz.** Dwa tła: `paper` (biel) i `paper-soft` (ledwie złamana biel).
   Żadnych ciemnych sekcji, gradientów, tekstur.
2. **Jeden gest na ekran.** Cztery ornamenty na cały serwis, użyte 2–3 razy łącznie.
3. **Duża typografia.** Skala podniesiona o stopień: tekst 18 px, najmniejszy
   dopuszczalny 15 px, h3 28 px, h2 40–52 px.
4. **Czerwień oszczędnie.** Nadkreślenia, jedno słowo w nagłówku, pieczęć, główny przycisk.

---

## System

### Paleta — dziewięć wartości na cały serwis

| token | wartość | rola |
|---|---|---|
| `paper` | `#ffffff` | tło podstawowe |
| `paper-soft` | `#f7f6f4` | złamana biel, żeby sąsiednie sekcje się nie zlewały |
| `ink` | `#1a1a1a` | nagłówki, pociągnięcia pędzla |
| `ink-soft` | `#333333` | tekst główny *(wprost z chen.rzeszow.pl)* |
| `ink-muted` | `#666666` | tekst drugorzędny *(jw.)* |
| `ink-faint` | `#8f8b87` | podpisy, drobny druk |
| `line` | `#e4e1dd` | cienkie kreski — jedyny separator |
| `seal` | `#c21c20` | czerwień pieczęci |
| `vermilion` | `#e34234` | jaśniejsza czerwień, stan hover |

Nie ma już: złota, laki, jadeitu, ciepłego papieru, różu kwiatu śliwy.

### Typografia

- **Tinos** (nagłówki) — metrycznie zgodny z Times New Roman, którego używa referencja
- **Lato** (tekst) — dokładnie ten sam krój co na stronie stowarzyszenia

Skala jest podniesiona globalnie w `@theme`, więc `text-sm` to 16 px, a nie 14.
**`text-xs` (15 px) to twarda dolna granica** — zapis w rodzaju `text-[0.7rem]`
był główną przyczyną uwagi „za mała czcionka”.

### Ornamenty — cztery

`InkWash` (plama tuszu, główny gest) · `EnsoRing` · `SealStamp` · `BrushStroke`

Zasada: **najwyżej jeden na sekcję, większość sekcji nie ma żadnego.**
Jeśli jest — ma być duży i wychodzić poza krawędź, nie chować się w rogu.
`pointer-events-none` i `aria-hidden` są wbudowane w definicję, nie w listę klas.

---

## Struktura

```
src/
├── app/
│   ├── globals.css         SYSTEM — tokeny, skala pisma, podstawa
│   ├── layout.tsx          fonty, metadane, lang="pl"
│   └── page.tsx            złożenie sekcji + dane strukturalne JSON-LD
├── lib/
│   ├── content.ts          CAŁA treść serwisu
│   └── polish.ts           odmiana liczebników („24 miejsca”, nie „24 miejsc”)
└── components/
    ├── ornaments.tsx       cztery ornamenty SVG
    ├── ui.tsx              Section, SectionHeading, Card, Button, Pill, Eyebrow…
    ├── SiteHeader.tsx      nawigacja + menu mobilne          [klient]
    ├── VideoDock.tsx       wysuwany odtwarzacz transmisji    [klient]
    └── sections/           Hero · About · Activities · Workshops · Registration
                            Location · Partners · Faq · Contact
```

Treść zmienia się **wyłącznie** w `content.ts`. Wygląd — w `globals.css`.

---

## Zasada naczelna: zero plików graficznych

W całym serwisie nie ma ani jednego obrazu — żadnego `.png`, `.jpg`, `next/image`,
emoji jako ikony, zewnętrznej biblioteki ikon. Ornamenty, plan okolicy, monogramy
partnerów i ikony interfejsu są **rysowane ścieżkami wektorowymi w kodzie**.

---

## Trzy pułapki, które już raz kosztowały działający komponent

1. **Wartości dowolne w Tailwindzie v4 zapisują spacje podkreśleniem.**
   `w-[calc(100vw-2rem)]` nie generuje **żadnej** reguły. Poprawnie:
   `w-[calc(100vw_-_2rem)]`. Kompilator tego nie wyłapie — objawem był panel
   transmisji o szerokości 2 px na telefonie.
2. **`className` przekazany do `Button` czy `Container` nie może ustawiać
   `display`, `padding` ani `max-width`** — te komponenty już je ustawiają, a o zwycięzcy
   decyduje kolejność reguł w arkuszu, nie w atrybucie. Chcesz ukryć przycisk?
   Owiń go w `<span className="hidden sm:block">`.
3. **Nie łącz dwóch mechanizmów krycia na jednym elemencie.** `text-ink/70` razem
   z `opacity-60` mnoży się do 0,42.

---

## Mini-odtwarzacz transmisji

Prawy dolny róg, domyślnie zwinięty do przycisku 44 × 44. Aby podłączyć transmisję,
znajdź w `VideoDock.tsx` komentarz `MIEJSCE NA RAMKĘ YOUTUBE` i podmień blok
pola zastępczego na `<iframe>` — reszta panelu nie wymaga zmian.

## Formularz zapisów

Cztery pola zgodnie ze specyfikacją: imię, nazwisko, e-mail, telefon.
Walidacja po polsku, fokus na pierwszym błędnym polu, komunikaty przez `aria-describedby`,
podsumowanie w `role="alert"`, ekran sukcesu ogłaszany przez trwały region `aria-live`.

**Wysyłka jest symulowana** — zgłoszenie nie jest nigdzie zapisywane. Przed wdrożeniem
formularz będzie potrzebował zgody RODO i zabezpieczenia antyspamowego.

## Dane zastępcze

Fakty pewne (nazwa, data, adres, hasła, partnerzy) pochodzą z materiałów festiwalu.
Przykładowe są: adres e-mail, telefon, godziny, liczby miejsc, program warsztatów,
treść FAQ oraz monogramy zamiast logotypów partnerów. Stopka mówi o tym wprost.

## Dostępność

Jeden `<h1>`, hierarchia bez przeskoków, landmarki, link „Przejdź do treści”,
FAQ na natywnych `<details>` (działa bez JavaScriptu), zwinięty panel transmisji
z `inert`, `prefers-reduced-motion`, cele dotykowe ≥ 44 × 44 px.
