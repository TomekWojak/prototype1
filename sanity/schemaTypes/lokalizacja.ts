import { defineArrayMember, defineField, defineType } from "sanity";

export const lokalizacja = defineType({
  name: "lokalizacja",
  title: "Lokalizacja",
  type: "document",
  fields: [
    defineField({
      name: "nadkreslenie",
      title: "Mała etykieta nad tytułem",
      type: "string",
      description:
        "Kilka słów pisanych wersalikami, na czerwono, tuż nad dużym tytułem sekcji. Np. „Lokalizacja”. Zostaw puste, jeśli nie chcesz jej pokazywać.",
    }),
    defineField({
      name: "tytul",
      title: "Duży tytuł sekcji",
      type: "string",
      description:
        "Napis, który widać jako największy tekst tej sekcji. Ostatnie słowo strona sama pokoloruje na czerwono — przy „Gdzie i kiedy” czerwone będzie „kiedy”.",
    }),
    defineField({
      name: "lead",
      title: "Akapit pod tytułem",
      description:
        "Jedno–dwa zdania wprowadzające, drukowane szarym tekstem zaraz pod dużym tytułem.",
      type: "text",
      rows: 2,
    }),
    defineField({
      name: "godzinyTytul",
      title: "Nagłówek nad godzinami",
      description:
        "Mała etykieta nad tabelką z godzinami, np. „Godziny otwarcia”.",
      type: "string",
    }),
    defineField({
      name: "godziny",
      title: "Godziny otwarcia — dni",
      type: "array",
      description:
        "Opcjonalne. Jeśli nic tu nie wpiszesz, cała tabelka razem z nagłówkiem NIE pojawi się na stronie.",
      of: [
        defineArrayMember({
          type: "object",
          name: "dzien",
          fields: [
            defineField({
              name: "dzien",
              title: "Dzień",
              type: "string",
              description:
                "Lewa kolumna wiersza, np. „Sobota, 24 października”.",
            }),
            defineField({
              name: "godziny",
              title: "Godziny",
              type: "string",
              description:
                "Prawa kolumna wiersza. Zakres półpauzą, bez spacji: „10:00–19:00”.",
            }),
          ],
          preview: {
            select: { title: "dzien", subtitle: "godziny" },
          },
        }),
      ],
    }),
    defineField({
      name: "notatki",
      title: "Wskazówki praktyczne",
      type: "array",
      description:
        "Kafelki pod godzinami. Dostępność, dojazd, parking, ile czasu zająć na zwiedzanie — pytania, które uczestnik i tak zada.",
      of: [
        defineArrayMember({
          type: "object",
          name: "notatka",
          fields: [
            defineField({
              name: "tytul",
              title: "Nagłówek wskazówki",
              description: "Np. „Dojazd i parking”.",
              type: "string",
            }),
            defineField({
              name: "tresc",
              title: "Treść wskazówki",
              description: "Dwa–trzy zdania konkretów.",
              type: "text",
              rows: 3,
            }),
          ],
          preview: { select: { title: "tytul", subtitle: "tresc" } },
        }),
      ],
    }),
    defineField({
      name: "zapytanieMapy",
      title: "Adres do wyszukania w Mapach",
      type: "string",
      description:
        "Po kliknięciu przycisku Mapy Google wyszukają dokładnie ten tekst. Wklej pełny adres i sprawdź w Mapach, czy trafia w to miejsce.",
    }),
    defineField({
      name: "etykietaMapy",
      title: "Napis na przycisku do Map",
      description:
        "Np. „Otwórz w Mapach Google”. Przycisk otwiera się w nowej karcie.",
      type: "string",
    }),
  ],
  preview: {
    prepare: () => ({ title: "Lokalizacja" }),
  },
});
