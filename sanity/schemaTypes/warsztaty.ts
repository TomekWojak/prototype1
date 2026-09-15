import { defineArrayMember, defineField, defineType } from "sanity";

export const warsztaty = defineType({
  name: "warsztaty",
  title: "Warsztaty",
  type: "document",
  fields: [
    defineField({
      name: "nadkreslenie",
      title: "Mała etykieta nad tytułem",
      type: "string",
      description:
        "Kilka słów pisanych wersalikami, na czerwono, tuż nad dużym tytułem sekcji. Np. „Warsztaty”. Zostaw puste, jeśli nie chcesz jej pokazywać.",
    }),
    defineField({
      name: "tytul",
      title: "Duży tytuł sekcji",
      type: "string",
      description:
        "Napis, który widać jako największy tekst tej sekcji. Ostatnie słowo strona sama pokoloruje na czerwono - przy „Warsztaty z zapisami” czerwone będzie „zapisami”.",
    }),
    defineField({
      name: "lead",
      title: "Akapit pod tytułem",
      description:
        "Jedno–dwa zdania wprowadzające, drukowane szarym tekstem zaraz pod dużym tytułem.",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "pozycje",
      title: "Lista warsztatów",
      type: "array",
      description:
        "Każdy warsztat to jeden wiersz: nazwa, opis i - po prawej - drobne informacje praktyczne. Kolejność przeciągnij myszą.",
      of: [
        defineArrayMember({
          type: "object",
          name: "warsztat",
          fields: [
            defineField({
              name: "tytul",
              title: "Nazwa warsztatu",
              description:
                "Nagłówek wiersza, np. „Kaligrafia: pierwsze pociągnięcie pędzla”.",
              type: "string",
            }),
            defineField({
              name: "opis",
              title: "Opis pod nazwą",
              type: "text",
              rows: 3,
              description:
                "Dwa–trzy zdania: czego uczestnik się nauczy i co ma ze sobą przynieść.",
            }),
            defineField({
              name: "czas",
              title: "Czas trwania",
              type: "string",
              description:
                "Opcjonalny. Drobny napis po prawej stronie wiersza, np. „60 min”. Puste pole = strona nie pokazuje czasu.",
            }),
            defineField({
              name: "poziom",
              title: "Poziom zaawansowania",
              type: "string",
              options: {
                list: [
                  "Bez doświadczenia",
                  "Początkujący",
                  "Dla wszystkich",
                  "Średniozaawansowany",
                  "Zaawansowany",
                ],
              },
              description:
                "Opcjonalny. Drobny napis obok czasu. Wybierz z listy albo zostaw puste.",
            }),
            defineField({
              name: "wiek",
              title: "Od ilu lat",
              type: "string",
              description:
                "Opcjonalne. Drobny napis obok poziomu, np. „7–12 lat”. Wpisuj tylko wtedy, gdy warsztat naprawdę ma ograniczenie.",
            }),
            defineField({
              name: "miejsca",
              title: "Liczba miejsc",
              type: "number",
              description:
                "Opcjonalna. Sama liczba, bez słowa „miejsc” - odmianę („24 miejsca”, „12 miejsc”) strona dopisze sama. Puste pole znaczy „nie podajemy limitu”, a nie „zero miejsc”.",
            }),
          ],
          preview: {
            select: {
              title: "tytul",
              poziom: "poziom",
              czas: "czas",
              miejsca: "miejsca",
            },
            prepare: ({ title, poziom, czas, miejsca }) => ({
              title,
              subtitle: [czas, poziom, miejsca ? `${miejsca} miejsc` : null]
                .filter(Boolean)
                .join(" · "),
            }),
          },
        }),
      ],
    }),
    defineField({
      name: "zasadyTytul",
      title: "Zasady zapisów - nagłówek",
      description: "Nagłówek listy pod warsztatami, np. „Jak działają zapisy”.",
      type: "string",
    }),
    defineField({
      name: "zasady",
      title: "Zasady zapisów - punkty",
      type: "array",
      of: [defineArrayMember({ type: "string" })],
      description:
        "Krótkie zdania, każde w osobnym wierszu, numerowane przez stronę. Trzy działają najlepiej.",
    }),
    defineField({
      name: "ctaEtykieta",
      title: "Napis na przycisku pod zasadami",
      type: "string",
      description: "Przycisk prowadzi do formularza, np. „Przejdź do zapisów”.",
    }),
  ],
  preview: {
    select: { ile: "pozycje" },
    prepare: ({ ile }) => ({
      title: "Warsztaty",
      subtitle: `${Array.isArray(ile) ? ile.length : 0} pozycji`,
    }),
  },
});
