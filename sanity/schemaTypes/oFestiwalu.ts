import { defineArrayMember, defineField, defineType } from "sanity";

export const oFestiwalu = defineType({
  name: "oFestiwalu",
  title: "O festiwalu",
  type: "document",
  groups: [
    { name: "naglowek", title: "Nagłówek sekcji", default: true },
    { name: "filary", title: "Filary Wen i Wu" },
    { name: "cytat", title: "Cytat i credo" },
    { name: "odbiorcy", title: "Dla kogo" },
  ],
  fields: [
    defineField({
      name: "nadkreslenie",
      title: "Mała etykieta nad tytułem",
      type: "string",
      group: "naglowek",
      description:
        "Kilka słów pisanych wersalikami, na czerwono, tuż nad dużym tytułem sekcji. Np. „O festiwalu”. Zostaw puste, jeśli nie chcesz jej pokazywać.",
    }),
    defineField({
      name: "tytul",
      title: "Duży tytuł sekcji",
      type: "string",
      group: "naglowek",
      description:
        "Napis, który widać jako największy tekst tej sekcji. Ostatnie słowo strona sama pokoloruje na czerwono — przy „Dwa filary chińskiej kultury” czerwone będzie „kultury”.",
    }),
    defineField({
      name: "filary",
      title: "Dwie kolumny: Wen i Wu",
      type: "array",
      group: "filary",
      description:
        "Zawsze dwie i zawsze w tej kolejności: najpierw Wen (lewa kolumna), potem Wu (prawa). Chiński znak, zapis wymowy i wiersz cech pod opisem strona dokłada sama — nie ma ich tu do wpisania.",
      of: [
        defineArrayMember({
          type: "object",
          name: "filar",
          fields: [
            defineField({
              name: "nazwa",
              title: "Nazwa filaru",
              type: "string",
              description: "Duży nagłówek kolumny, np. „Wen”.",
            }),
            defineField({
              name: "rola",
              title: "Podtytuł (czerwony)",
              type: "string",
              description:
                "Krótkie określenie pod nazwą, drukowane wersalikami na czerwono, np. „Człowiek i kultura”.",
            }),
            defineField({
              name: "opis",
              title: "Opis filaru",
              description: "Dwa–trzy zdania pod podtytułem.",
              type: "text",
              rows: 3,
            }),
          ],
          preview: {
            select: { title: "nazwa", subtitle: "rola" },
          },
        }),
      ],
    }),

    defineField({
      name: "cytatTekst",
      title: "Cytat",
      type: "text",
      rows: 2,
      group: "cytat",
      description:
        "Największy tekst w tej sekcji, składany szeryfem w cudzysłowie. Trzymaj go krótkim — najlepiej dwa zdania.",
    }),
    defineField({
      name: "cytatNota",
      title: "Komentarz pod cytatem",
      description:
        "Mniejszy akapit tuż pod cytatem, wyjaśniający, skąd ta myśl.",
      type: "text",
      rows: 3,
      group: "cytat",
    }),
    defineField({
      name: "credo",
      title: "Trzy hasła jedno pod drugim",
      type: "array",
      group: "cytat",
      of: [defineArrayMember({ type: "string" })],
      description:
        "Krótkie zdania w trybie rozkazującym („Rozwijaj umysł.”), każde w osobnym wierszu. Strona stawia przed nimi chińskie cyfry 一 二 三. Trzy działają najlepiej.",
    }),
    defineField({
      name: "credoZamkniecie",
      title: "Zdanie pod hasłami",
      type: "string",
      group: "cytat",
      description:
        "Jedno zdanie pod listą, drukowane na czerwono, np. „Prawdziwa siła rodzi się z harmonii”.",
    }),

    defineField({
      name: "odbiorcyTytul",
      title: "Nagłówek nad grupami odbiorców",
      description:
        "Np. „Dla kogo jest ten festiwal”. Stoi nad kafelkami niżej.",
      type: "string",
      group: "odbiorcy",
    }),
    defineField({
      name: "odbiorcy",
      title: "Kafelki „dla kogo”",
      type: "array",
      group: "odbiorcy",
      description:
        "Układają się w dwie kolumny, więc parzysta liczba wygląda najlepiej. Cztery to komplet.",
      of: [
        defineArrayMember({
          type: "object",
          name: "odbiorca",
          fields: [
            defineField({
              name: "tytul",
              title: "Nazwa grupy odbiorców",
              type: "string",
              description: "Nagłówek kafelka, np. „Rodziny z dziećmi”.",
            }),
            defineField({
              name: "opis",
              title: "Co ta grupa znajdzie",
              type: "text",
              rows: 3,
              description:
                "Dwa–trzy zdania mówiące tej grupie, co konkretnie jest dla niej.",
            }),
          ],
          preview: {
            select: { title: "tytul", subtitle: "opis" },
          },
        }),
      ],
    }),
  ],
  preview: {
    prepare: () => ({ title: "O festiwalu" }),
  },
});
