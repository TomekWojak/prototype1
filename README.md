# Festiwal „Księga i Miecz” — Wen & Wu

Prototyp jednostronicowej witryny festiwalu kultury chińskiej.
Rzeszów, 24–25 października 2026, Sala Sportowa SP nr 18.

**Next.js 16.3** (App Router, Turbopack) · **React 19.2** · **TypeScript** (strict) · **Tailwind CSS v4**

---

## Uruchomienie

```bash
npm run dev
```

Strona: <http://localhost:3000>

```bash
npm run build
```

---

## Zasada naczelna projektu: zero plików graficznych

W całym serwisie **nie ma ani jednego obrazu** — żadnego `.png`, `.jpg`, `.svg` z dysku,
żadnego `next/image`, żadnego emoji użytego jako ikona, żadnej zewnętrznej biblioteki ikon.

Cała chińska warstwa wizualna — enso, kwiat śliwy, chmury pomyślności, pieczęcie, latarnie,
miecz jian, zwój, taiji, meander 回紋, pejzaż z pagodą, bambus, plan okolicy w sekcji
Lokalizacja, monogramy partnerów, wszystkie ikony interfejsu — jest **rysowana ścieżkami
wektorowymi w kodzie**.

Dzięki temu każdy ornament skaluje się bez utraty jakości, waży kilobajty i dziedziczy kolor
przez `currentColor`, więc ten sam komponent obsługuje sekcję jasną i ciemną.

---

## Struktura

```
src/
├── app/
│   ├── layout.tsx          fonty (Playfair Display + Inter, subset latin-ext), metadane, lang="pl"
│   ├── globals.css         SYSTEM WIZUALNY — tokeny @theme, tekstury, animacje
│   └── page.tsx            złożenie sekcji + dane strukturalne JSON-LD
├── lib/
│   ├── content.ts          CAŁA treść serwisu w jednym miejscu
│   └── polish.ts           odmiana liczebników („24 miejsca”, nie „24 miejsc”)
└── components/
    ├── ornaments.tsx       18 ornamentów SVG + wspólne definicje (filtry pędzla)
    ├── ui.tsx              primitywy: Section, SectionHeading, Card, Button, Pill, Eyebrow…
    ├── SiteHeader.tsx      przyklejona nawigacja + menu mobilne          [klient]
    ├── VideoDock.tsx       wysuwany mini-odtwarzacz transmisji           [klient]
    └── sections/
        ├── Hero.tsx           1. Hero
        ├── About.tsx          2. O festiwalu  (#o-festiwalu)
        ├── Activities.tsx     3. Aktywności   (#aktywnosci)
        ├── Workshops.tsx      4. Warsztaty    (#warsztaty)
        ├── Registration.tsx   5. Zapisy       (#zapisy)          [klient]
        ├── Location.tsx       6. Lokalizacja  (#lokalizacja)
        ├── Partners.tsx       7. Partnerzy    (#partnerzy)
        ├── Faq.tsx            8. FAQ          (#faq)
        └── Contact.tsx        9. Kontakt      (#kontakt, element <footer>)
```

Tylko trzy komponenty są klienckie. Reszta to Server Components — do przeglądarki nie trafia
JavaScript, który nie jest potrzebny.

---

## Gdzie co zmieniać

### Treść

Wszystko w **`src/lib/content.ts`**. Nazwa i data wydarzenia, filary Wen i Wu, cytaty,
grupy odbiorców, program, warsztaty, godziny, noty dojazdowe, partnerzy, FAQ, kontakt,
opisy transmisji. Interesariusze poprawiają zwykle słowa, nie kod — dlatego copy nie żyje
w JSX.

### Wygląd

**`src/app/globals.css`**, blok `@theme`. Zmiana jednej wartości przechodzi przez cały serwis.

| grupa | tokeny |
|---|---|
| papier i tusz | `paper` `paper-warm` `paper-blush` `ink` `ink-soft` `ink-muted` `ink-faint` |
| cynober i laka | `vermilion` `vermilion-soft` `seal` `crimson` `lacquer` `lacquer-deep` |
| złoto | `gold` `gold-light` `gold-deep` |
| akcent | `jade` |

Każdy token jest dostępny jako `bg-*`, `text-*`, `border-*` z modyfikatorem krycia (`bg-gold/20`).

Sekcje mają cztery „materiały” tła, ustawiane propem `tone` komponentu `Section`:
`paper` · `paperWarm` · `mist` (Hero) · `lacquer` (ciemna czerwień) · `ink` (najciemniejsza).

> **Uwaga przy edycji:** `Section`, `SectionHeading`, `Eyebrow`, `Card` i `Pill` mają
> **osobny** prop `tone` — to Server Components, więc nie ma kontekstu Reacta.
> Zmieniając ton sekcji, zmień go we wszystkich primitywach w środku, inaczej dostaniesz
> ciemny nagłówek na ciemnym tle.

### Trzy pułapki, które już raz kosztowały działający komponent

1. **Wartości dowolne w Tailwindzie v4 zapisują spacje podkreśleniem.**
   `w-[min(22rem,calc(100vw-2rem))]` nie generuje **żadnej** reguły — `calc` wymaga spacji
   wokół minusa. Poprawnie: `max-w-[calc(100vw_-_2rem)]`. Kompilator tego nie wyłapie;
   objawem był panel transmisji o szerokości 2 px na telefonie.
2. **`className` przekazany do `Button`, `Card` czy `Container` nie może ustawiać
   `display`, `padding` ani `max-width`** — te komponenty już je ustawiają, a o zwycięzcy
   decyduje kolejność reguł w arkuszu, nie w atrybucie. Chcesz ukryć przycisk?
   Owiń go w `<span className="hidden sm:block">`.
3. **Nie łącz dwóch mechanizmów krycia na jednym elemencie.** `text-gold/70` razem
   z `opacity-60` mnoży się do 0,42. Wybierz alfę koloru albo klasę `opacity-*`.

### Reguły spójności

| rzecz | ton jasny | ton ciemny |
|---|---|---|
| pieczęć `SealStamp` | `text-seal` | `text-gold` |
| latarnia `Lantern` | — | `text-gold` (cynober daje 1,5 : 1) |
| obrys `:focus-visible` | cynober (globalnie) | złoto (automatycznie) |

Szew między blokami w sekcji: `mt-14 sm:mt-16`.
Nagłówek `h3` blokowy: `font-display text-2xl sm:text-3xl`; w karcie: `text-xl`.
Mikroetykieta kolumny to **nie** nagłówek — użyj `<Eyebrow tone={…}>`.
Ornament tła: krycie 0,06–0,20. Ornament akcentowy: 0,30–0,70.

---

## Mini-odtwarzacz transmisji

Prawy dolny róg, domyślnie zwinięty. Przycisk **„Pokaż transmisję” / „Ukryj transmisję”**
wysuwa panel z polem zastępczym 16:9.

Aby podłączyć prawdziwą transmisję, otwórz **`src/components/VideoDock.tsx`** i znajdź
komentarz `MIEJSCE NA RAMKĘ YOUTUBE`. Podmień blok pola zastępczego na:

```tsx
<iframe
  className="absolute inset-0 h-full w-full"
  src="https://www.youtube.com/embed/TWOJE_ID"
  title="Transmisja na żywo — Festiwal Księga i Miecz"
  allow="accelerometer; autoplay; clipboard-write; encrypted-media; picture-in-picture"
  allowFullScreen
/>
```

Nagłówek panelu, wymiary, animacja wysuwania i obsługa klawiatury nie wymagają wtedy
żadnej zmiany.

---

## Formularz zapisów

Cztery pola zgodnie ze specyfikacją: **imię, nazwisko, adres e-mail, numer telefonu**.

Walidacja jest po stronie klienta, po polsku, uruchamiana przy opuszczeniu pola i przy
wysyłce. Telefon przyjmuje `123 456 789` oraz `+48 123 456 789`. Przy błędach fokus wędruje
na pierwsze niepoprawne pole, a podsumowanie ląduje w bloku `role="alert"`.

**Wysyłka jest symulowana** — zgłoszenie nie jest nigdzie zapisywane ani wysyłane.
Żeby je podpiąć, zastąp `setTimeout` w `Registration.tsx` wywołaniem Server Action
albo `fetch` do własnego endpointu.

Przed wdrożeniem produkcyjnym formularz będzie potrzebował jeszcze zgody RODO oraz
zabezpieczenia antyspamowego — świadomie nie ma ich w prototypie, bo specyfikacja
wymieniała dokładnie cztery pola.

---

## Dane zastępcze

Prototyp używa prawdziwych faktów tam, gdzie je znamy (nazwa, data, adres, hasła, partnerzy),
i danych przykładowych tam, gdzie ich nie znamy:

- adres e-mail i numer telefonu w sekcji Kontakt,
- godziny otwarcia i liczby miejsc na warsztatach,
- program warsztatów i treść FAQ,
- monogramy partnerów zamiast logotypów (pliki graficzne są wykluczone z założenia),
- odnośniki do mediów społecznościowych prowadzą do `#`.

Stopka informuje o tym wprost, żeby nikt nie wziął prototypu za wersję gotową.

---

## Dostępność

- jeden `<h1>`, hierarchia nagłówków bez przeskoków, landmarki `header`/`nav`/`main`/`footer`
- link „Przejdź do treści” na pierwszym tabulatorze
- FAQ na natywnych `<details>` — działa bez JavaScriptu, klawiatura i czytniki ekranu z pudełka
- zwinięty panel transmisji ma `inert` i `aria-hidden`, więc nie łapie fokusu
- ornamenty mają `aria-hidden`; plan okolicy jest ozdobą, a adres stoi obok jako tekst
- `prefers-reduced-motion` wyłącza animacje globalnie
- cele dotykowe co najmniej 44 × 44 px
