# Schematy treści — Sanity

Dziesięć dokumentów pojedynczych, po jednym na sekcję strony. Panel odwzorowuje
stronę: kto chce poprawić tekst w Warsztatach, znajdzie go pod „Warsztaty”.

```
sanity/
├── schemaTypes/
│   ├── index.ts        rejestr typów + lista dokumentów pojedynczych
│   ├── wydarzenie.ts   nazwa, termin, miejsce — fakty używane w wielu sekcjach
│   ├── oFestiwalu.ts   filary Wen i Wu, cytat, credo, grupy odbiorców
│   ├── aktywnosci.ts   program otwarty + blok domykający
│   ├── warsztaty.ts    zajęcia z limitem miejsc + zasady zapisów
│   ├── zapisy.ts       teksty wokół formularza
│   ├── lokalizacja.ts  godziny, wskazówki dojazdu, zapytanie do Map
│   ├── partnerzy.ts    grupy partnerów i logotypy
│   ├── faq.ts          pytania i odpowiedzi
│   ├── kontakt.ts      dane kontaktowe, kanały, stopka
│   └── transmisja.ts   panel z odtwarzaczem
└── structure.ts        układ panelu (bez tego Sanity pozwoli utworzyć drugie „Wydarzenie”)
```

## Co zostaje w kodzie

W panelu ląduje to, co zmienia **treść**. To, co zmienia **konstrukcję**, zostaje
w `src/lib/fallback.ts`:

| zostaje w kodzie | dlaczego |
|---|---|
| `navLinks` | etykiety są sparowane z identyfikatorami sekcji (`#warsztaty`); literówka w panelu zepsułaby wszystkie odnośniki bez ostrzeżenia |
| `event.nameCjk` | 文武 na pieczęci, element tożsamości |
| `activityGlyphs` | znaki przy kafelkach Aktywności — patrz niżej |
| `pillarDecorations` | znak, pinyin i cechy przy filarach Wen i Wu — patrz niżej |
| `defaultChannelUrls` | zapasowe adresy Facebooka, Instagrama i YouTube — patrz niżej |
| etykiety dostępności w pasku | „Przejdź do treści”, „Otwórz/Zamknij menu”, nazwa nawigacji — czyta je czytnik ekranu i klawiatura, nie są treścią marketingową |
| pola formularza | dodanie pola w panelu nie stworzy jego obsługi po stronie serwera |

### Znaki chińskie przy Aktywnościach

Redaktor ich nie wpisuje. Tablica `activityGlyphs` w `fallback.ts` ma dziesięć
znaków i przypisuje je **po pozycji**: pierwszy kafelek dostaje pierwszy znak,
drugi drugi, a po dziesiątym zaczynamy od nowa.

Wcześniej znak dobierał się po tytule, ze słownika sześciu nazw. Sprawdzało się
to wyłącznie dla tych sześciu — kafelek nazwany po swojemu zostawał bez znaku,
a przy własnych nazwach redaktora to znaczyło „prawie każdy”. Ceną obecnego
rozwiązania jest to, że dopisanie pozycji w środku listy przesuwa znaki na
kolejnych. To świadomy wybór: znaki są dekoracją kompozycji, a nie opisem
treści kafelka, więc przesunięcie niczego nie przekłamuje.

Pozycję liczymy **po odsianiu pustych wierszy**, więc wyczyszczony wiersz
w panelu nie zabiera znaku kolejnym — pierwszy widoczny kafelek zawsze ma 藝.

Znaki są **celowo ogólne**: 藝 節 華 禮 和 道 氣 心 風 神 — sztuka, święto,
Chiny, ceremonia, harmonia, droga, energia, serce, styl, duch. Pierwsza wersja
tablicy opisywała konkretne czynności (舞 taniec, 茶 herbata, 書 kaligrafia)
i przy dobieraniu po pozycji dawała podpisy nie na temat: 茶 stanęło nad
pokazami sztuk walki, 棋 nad kaligrafią. Znak dobierany pozycją nie może
niczego nazywać, więc nazywać nie próbuje.

### Dekoracje przy filarach Wen i Wu

Ta sama zasada, inny sposób dopasowania. Redaktor wypełnia trzy rubryki —
nazwę, podtytuł i opis. Znak (文, 武), pinyin i wiersz cech („wiedza ·
edukacja · sztuka · mądrość”) dokłada `pillarDecorations` z `fallback.ts`,
dobierając je **po pozycji na liście**: pierwszy filar to Wen, drugi Wu.

Po pozycji, a nie po tytule, bo pozycja i tak decyduje o kolumnie, a filary
są zawsze dwa — nie ma tu listy, która rosłaby i przesuwała znaki. Gdyby
dopasowywać po nazwie, literówka nie odebrałaby filarowi samego znaku, tylko
usunęłaby go z układu w całości: po `key` szuka go zarówno Hero, jak i ta
sekcja. Numer pozycji liczymy przed odsianiem pustych wierszy, żeby
wyczyszczenie pierwszego filaru nie oddało jego znaku drugiemu.

Jedno miejsce w kodzie nadal ma datę wpisaną na sztywno: metadane strony
w `src/app/(site)/layout.tsx` (tytuł karty przeglądarki i opis dla
wyszukiwarek). To zdania pisane pod pozycjonowanie, z datą wplecioną w prozę,
więc nie składa się ich z pól CMS-a bez pogorszenia treści. Po zmianie terminu
w panelu trzeba je poprawić ręcznie.

### Zapasowe adresy kanałów

Puste pole „Adres profilu” nie zostawia już martwej pozycji w stopce. Kanał bez
adresu prowadzi na profil **organizatora**, dobierany po nazwie serwisu
(`defaultChannelUrls` w `fallback.ts`):

| serwis | adres zapasowy |
|---|---|
| Facebook | strona Chen Taijiquan Rzeszów |
| Instagram | wyszukiwarka Instagrama dla frazy „chen taijiquan rzeszów” — profilu nie udało się ustalić |
| YouTube | strona główna serwisu |
| TikTok | brak — kanał bez adresu nie pojawi się na stronie |

Serwis, dla którego nie znamy ani własnego, ani zapasowego adresu, **wypada
z listy**. Sama nazwa serwisu bez odnośnika nie ma po co stać w stopce, a link
prowadzący donikąd jest gorszy niż jego brak.

W stopce widać wyłącznie nazwę serwisu i ikonę — nazwy profilu („@…”, „/…”)
nie ma ani na stronie, ani w panelu. Liczy się dokąd odnośnik prowadzi,
nie jak wygląda.

Numer telefonu ma jedną rubrykę. Wersję do wybrania na telefonie (`tel:`)
strona składa z tego samego zapisu, usuwając spacje — druga rubryka z tym
samym numerem to drugie miejsce do rozjechania.

### Tytuły sekcji

Każda sekcja ma w panelu dwie rubryki: **Nadkreślenie nad tytułem** (wersaliki,
czerwone) i **Tytuł sekcji**. Tytuł wpisuje się w całości, jednym polem —
**ostatnie słowo strona składa na czerwono**. „Aktywności festiwalu” da czerwone
„festiwalu”, „Kto tworzy festiwal” da czerwone „festiwal”.

Regułę trzyma `SectionHeading` w `src/components/ui.tsx`, a nie osiem sekcji
z osobna, żeby akcent nie mógł się między nimi rozjechać. Tytuł jednowyrazowy
nie dostaje akcentu: jedyne słowo w czerwieni czytałoby się jak podkreślenie
całego nagłówka.

### Transmisja na żywo

Ramka YouTube powstaje **dopiero po kliknięciu „Pokaż transmisję"** i znika
przy zamknięciu panelu. To nie optymalizacja, tylko decyzja o prywatności:
dopóki nikt nie kliknie, strona nie łączy się z YouTube i nie zostawia
u uczestnika żadnych plików. Zamknięcie odmontowuje ramkę, więc dźwięk
i pobieranie danych ustają.

Adres składamy z `autoplay=1&mute=1`. Autoodtwarzanie jest bezpieczne, bo ramka
powstaje na żądanie; wyciszenie jest do tego konieczne, bo przeglądarki blokują
automatyczne odtwarzanie z dźwiękiem i bez niego film by nie ruszył.

## Mapowanie pól

| dokument | pole w Sanity | obecnie w `fallback.ts` |
|---|---|---|
| wydarzenie | `nazwa`, `podtytul`, `nadkreslenie`, `tagline`, `lead`, `fakty` | `event.name`, `.subtitle`, `.kicker`, `.tagline`, `.lead`, `.facts` |
| | `data`, `wstep` | `event.date`, `.admission` |
| | `miejsce` | `event.venue` |
| | `przyciskGlowny`, `przyciskDrugi`, `przyciskWPasku` | `event.ctaPrimary`, `.ctaSecondary`, `.ctaHeader` |
| oFestiwalu | `nadkreslenie`, `tytul` | `aboutCopy` |
| | `filary[]` — nazwa, podtytuł, opis | `pillars` |
| | `cytatTekst`, `cytatNota` | `aboutQuote.text`, `.note` |
| | `credo[]`, `credoZamkniecie` | `modernCreed`, `modernCreedClosing` |
| | `odbiorcy[]` | `audiences` |
| aktywnosci | `lead`, `pozycje[]` | `activitiesCopy.lead`, `activities` |
| | `zamkniecieTytul`, `zamkniecieTresc`, `zamkniecieCta` | `activitiesCopy.closing*` |
| warsztaty | `lead`, `pozycje[]` | `workshopsCopy.lead`, `workshops` |
| | `zasadyTytul`, `zasady[]`, `ctaEtykieta` | `workshopsCopy.rulesTitle`, `.rules`, `.ctaLabel` |
| zapisy | wszystkie pola, w tym `krokiTytul` i `kroki[]` — nagłówek + opis | `formCopy` |
| lokalizacja | `lead`, `godzinyTytul`, `godziny[]`, `notatki[]` | `locationCopy.lead`, `.hoursTitle`, `location.hours`, `.notes` |
| | `zapytanieMapy`, `etykietaMapy` | `location.mapsQuery`, `locationCopy.mapsLabel` |
| partnerzy | `lead`, `grupy[]`, `nota` | `partnersCopy.lead`, `partnerGroups`, `partnersCopy.note` |
| faq | `lead`, `pytania[]`, `ctaTytul`, `ctaEtykieta` | `faqCopy.*`, `faq` |
| kontakt | `lead`, `organizator`, `email`, `telefon` | `contact.*`, `contactCopy.lead` |
| | `kanalyTytul`, `kanaly[]` — serwis + adres | `contactCopy.channelsTitle`, `contact.channels` |
| | `nawigacjaTytul`, `powrotNaGore` | `contactCopy.navTitle`, `.backToTop` |
| transmisja | `aktywna`, `adresYouTube` + napisy | `stream` |

Miejsce w sekcji Lokalizacja **nie ma własnego pola** — bierze się z dokumentu
„Wydarzenie”, żeby nie mogło rozjechać się z paskiem faktów i stopką.

### Jedna data i jedno miejsce

Były kiedyś trzy rubryki na datę (zapis słowny, skrócony i maszynowy) i cztery
na adres (nazwa obiektu, jej skrót, ulica, skrót ulicy, kod z miastem). Każde
miejsce na stronie sięgało po inną, więc zmiana terminu znaczyła siedem
poprawek zamiast jednej — a przy pierwszej pominiętej strona zaczynała podawać
dwie różne daty naraz.

Teraz jest jedna rubryka na datę w dowolnym zapisie („25.10.2026”, „24–25
października 2026”) i jedna na miejsce. Strona pokazuje wszędzie dokładnie to,
co redaktor wpisał — nie skraca i nie odmienia. Zniknęły przez to dwie rzeczy:
wiersz „Adres” w stopce i podpisy na rysunkowym planie okolicy. Podpisy brały
skrócone formy, których teraz nie ma, a pełne miejsce nie zawija się w tekście
SVG i wyjechałoby poza plan.

Dwa miejsca potrzebują daty maszynowo: znacznik `startDate` w danych
strukturalnych i rok w stopce. Odczytuje ją z wpisanego tekstu
`src/lib/date.ts` — rozpoznaje zapis z kropkami, słowny z polską nazwą
miesiąca i ISO, a z zakresu bierze dzień pierwszy. Gdy nie da się nic
wyłuskać, znacznik nie powstaje i w stopce zostaje sam organizator.
Zgadywanie byłoby gorsze: zła data w wynikach wyszukiwania to ktoś, kto
przyjechał nie tego dnia.

## Zmiany względem obecnej struktury

Trzy rzeczy celowo różnią się od `fallback.ts`:

1. **`partner.logo` i `partner.adres`** — pola, których jeszcze nie ma. Monogramy są
   rozwiązaniem zastępczym; schemat jest gotowy na prawdziwe logotypy, a kafelek
   stanie się odnośnikiem, gdy pojawi się adres.
2. **`transmisja.adresYouTube`** — pole przyjmuje odnośnik w dowolnej postaci
   (`watch?v=`, `youtu.be/`, `live/`, `shorts/`, `embed/`). Identyfikator wyciąga
   z niego `src/lib/youtube.ts` i składa adres `youtube.com/embed/ID`, bo tylko
   ten działa w ramce. Tekst, w którym nie da się znaleźć identyfikatora, daje
   pole zastępcze zamiast czarnego prostokąta z błędem YouTube'a.
3. **`kanal.adres` jest opcjonalny** — puste pole oznacza tekst zamiast odnośnika.
   Tak działa strona teraz (`href: null`) i schemat to utrwala.

## Jak treść trafia na stronę

```
Sanity (10 dokumentów)
      │  jedno zapytanie GROQ
      ▼
src/lib/sanity/query.ts
      ▼
src/lib/content.ts ──── scala z fallback.ts (zapas pole po polu)
      ▼
src/app/(site)/page.tsx ──── pobiera RAZ
      ▼
sekcje dostają dane propsami
```

Trzy komponenty są klienckie (nagłówek, formularz zapisów, odtwarzacz) i nie mogą
pobierać niczego same — dlatego pobranie siedzi w `page.tsx`, a nie w sekcjach.

**Zapas działa polami, nie całością.** Puste pole albo brakujący dokument oznacza
sięgnięcie do `fallback.ts` dla tej jednej wartości, a nie porzucenie całej sekcji.
Gdy API nie odpowiada, w logu pojawia się ostrzeżenie `[content]`, a strona renderuje
się normalnie — cicha awaria CMS-a byłaby gorsza niż głośna.

Strona odświeża treść co minutę (`revalidate: 60`). Redaktor widzi swoją zmianę
najdalej po minucie, bez wdrażania.

## Dlaczego w schematach nie ma walidacji

**Żadne pole nie jest wymagane. To jest decyzja, nie przeoczenie.**

Przy tej architekturze puste pole nie znaczy „błąd”, tylko „weź z `fallback.ts`”.
Oznaczanie pól jako wymaganych byłoby więc sprzeczne z tym, jak strona działa:
redaktor, który chce poprawić jedno zdanie, musiałby najpierw wypełnić kilkanaście
rubryk, których wcale nie zamierzał ruszać. Panel ma doradzać — od tego są opisy
pod polami — a nie blokować zapis.

Konsekwencję tej decyzji obsługuje warstwa danych, nie panel:

- **Puste wiersze są odsiewane.** Redaktor może kliknąć „dodaj”, rozmyślić się
  i zapisać pusty warsztat. Funkcja `isEmpty()` w `content.ts` odrzuca takie pozycje,
  żeby na stronie nie pojawiła się karta bez treści. Zero i `false` są przy tym
  traktowane jak wartości, nie jak brak — „0 miejsc” to informacja.
- **Lista złożona z samych pustych wierszy** liczy się jako brak treści i sekcja
  wraca do `fallback.ts`, zamiast wyrenderować się pusta.
- **Liczba miejsc jest opcjonalna.** Niewypełniona rubryka znaczy „nie podajemy
  limitu” i plakietka po prostu nie powstaje — a nie „0 miejsc”.

Jedyne, co zostało w schematach z twardych reguł, to listy wyboru (`options.list`)
przy poziomie zaawansowania, kluczu filaru i nazwie serwisu społecznościowego.
One nie blokują zapisu — ograniczają tylko podpowiadane wartości.

## Czego jeszcze nie podpięto

| pole w CMS | dlaczego |
|---|---|
| `partner.logo` | strona pokazuje samą nazwę; obsługa obrazów wymaga `@sanity/image-url` |
| `partner.adres` | kafelki partnerów nie są jeszcze odnośnikami |

`transmisja.aktywna` **jest** podpięta — wyłączenie ukrywa panel na stronie.

## Nazewnictwo w kodzie

Identyfikatory są po angielsku, komentarze i teksty dla redaktora po polsku.

Pola w Sanity nazywają się po polsku i mają tak zostać: ich nazwy to klucze
w bazie, więc zmiana którejkolwiek osierociłaby treść, którą redaktor już
wpisał — a przy braku pól wymaganych wygląda to identycznie jak niewypełniona
rubryka, bez żadnego błędu.

Granicą języków jest **projekcja GROQ** w `src/lib/sanity/query.ts`. Zapis
`"angielska": polska` tłumaczy każdą nazwę jeden raz:

```groq
"groups": grupy[]{
  "partners": partnerzy[]{ "name": nazwa, "href": adres }
}
```

Dzięki temu `content.ts` i cała reszta kodu widzą wyłącznie `label`, `name`,
`href`. Dopisując pole do schematu, dopisz je w zapytaniu w obu postaciach —
pominięcie aliasu przepuszcza polską nazwę do kodu.

Nazwy dokumentów w filtrach (`*[_id == "wydarzenie"]`) zostają polskie, bo to
prawdziwe identyfikatory dokumentów w zbiorze danych. Klucze wyniku są już
angielskie (`"event"`), więc dalej nie widać ich nigdzie poza tym plikiem.
