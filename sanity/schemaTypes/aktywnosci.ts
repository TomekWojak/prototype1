import { defineArrayMember, defineField, defineType } from "sanity";

export const aktywnosci = defineType({
  name: "aktywnosci",
  title: "Aktywności",
  type: "document",
  fields: [
    defineField({
      name: "nadkreslenie",
      title: "Mała etykieta nad tytułem",
      type: "string",
      description:
        "Kilka słów pisanych wersalikami, na czerwono, tuż nad dużym tytułem sekcji. Np. „Program główny”. Zostaw puste, jeśli nie chcesz jej pokazywać.",
    }),
    defineField({
      name: "tytul",
      title: "Duży tytuł sekcji",
      type: "string",
      description:
        "Napis, który widać jako największy tekst tej sekcji. Ostatnie słowo strona sama pokoloruje na czerwono — przy „Aktywności festiwalu” czerwone będzie „festiwalu”.",
    }),
    defineField({
      name: "lead",
      title: "Akapit pod tytułem",
      type: "text",
      rows: 3,
      description:
        "Jedno–dwa zdania wprowadzające, drukowane szarym tekstem zaraz pod dużym tytułem.",
    }),
    defineField({
      name: "pozycje",
      title: "Kafelki z aktywnościami",
      type: "array",
      description:
        "Każdy kafelek to jedna atrakcja: nazwa, opis i chiński znak, który strona dokłada sama — masz do wpisania tylko nazwę i opis. Znaki są ogólne („sztuka”, „święto”, „harmonia”) i idą po kolei, więc dopisanie kafelka w środku listy przesunie je na kolejnych. Układają się w dwie kolumny; kolejność przeciągnij myszą.",
      of: [
        defineArrayMember({
          type: "object",
          name: "aktywnosc",
          fields: [
            defineField({
              name: "tytul",
              title: "Nazwa aktywności",
              type: "string",
              description: "Nagłówek kafelka, np. „Taniec smoka”.",
            }),
            defineField({
              name: "opis",
              title: "Opis pod nazwą",
              type: "text",
              rows: 8,
              description:
                "Tekst kafelka. Jeśli chcesz listę punktów, wpisz je jeden pod drugim (Enter po każdym) — strona zachowa ten podział.",
            }),
          ],
          preview: {
            select: { title: "tytul", subtitle: "opis" },
          },
        }),
      ],
    }),
    defineField({
      name: "zamkniecieTytul",
      title: "Notka na końcu sekcji — nagłówek",
      type: "string",
      description:
        "Krótki blok pod kafelkami, oddzielony odstępem. Miejsce na jedną ważną uwagę o programie, np. „Pokazy główne powtarzamy w oba dni”. Zostaw puste pola, jeśli notka nie jest potrzebna.",
    }),
    defineField({
      name: "zamkniecieTresc",
      title: "Notka na końcu sekcji — tekst",
      description: "Akapit pod nagłówkiem notki.",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "zamkniecieCta",
      title: "Notka na końcu sekcji — napis na przycisku",
      type: "string",
      description:
        "Przycisk pod notką. Prowadzi do sekcji Warsztaty, np. „Zobacz warsztaty z zapisami”.",
    }),
  ],
  preview: {
    select: { ile: "pozycje" },
    prepare: ({ ile }) => ({
      title: "Aktywności",
      subtitle: `${Array.isArray(ile) ? ile.length : 0} pozycji`,
    }),
  },
});
