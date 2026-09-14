import { defineArrayMember, defineField, defineType } from "sanity";

export const kontakt = defineType({
  name: "kontakt",
  title: "Kontakt",
  type: "document",
  groups: [
    { name: "dane", title: "Dane kontaktowe", default: true },
    { name: "kanaly", title: "Media społecznościowe" },
    { name: "stopka", title: "Stopka" },
  ],
  fields: [
    defineField({
      name: "nadkreslenie",
      title: "Mała etykieta nad tytułem",
      type: "string",
      group: "dane",
      description:
        "Kilka słów pisanych wersalikami, na czerwono, tuż nad dużym tytułem sekcji. Np. „Kontakt”. Zostaw puste, jeśli nie chcesz jej pokazywać.",
    }),
    defineField({
      name: "tytul",
      title: "Duży tytuł sekcji",
      type: "string",
      group: "dane",
      description:
        "Napis, który widać jako największy tekst tej sekcji. Ostatnie słowo strona sama pokoloruje na czerwono — przy „Napisz do nas” czerwone będzie „nas”.",
    }),
    defineField({
      name: "lead",
      title: "Akapit pod tytułem",
      description:
        "Jedno–dwa zdania wprowadzające, drukowane szarym tekstem zaraz pod dużym tytułem.",
      type: "text",
      rows: 2,
      group: "dane",
    }),
    defineField({
      name: "organizator",
      title: "Nazwa organizatora",
      type: "string",
      group: "dane",
      description:
        "Podmiot odpowiedzialny za festiwal. Widać go w sekcji Kontakt i w notce o prawach autorskich na samym dole strony.",
    }),
    defineField({
      name: "email",
      title: "Adres e-mail",
      type: "string",
      group: "dane",
      description:
        "Widoczny w sekcji Kontakt. Kliknięcie otwiera program pocztowy.",
    }),
    defineField({
      name: "telefon",
      title: "Numer telefonu",
      type: "string",
      group: "dane",
      description:
        "Tak, jak ma się wyświetlać, np. „+48 17 000 00 00”. Na telefonie kliknięcie od razu dzwoni — wersję bez spacji strona składa sama.",
    }),

    defineField({
      name: "kanalyTytul",
      title: "Nagłówek nad linkami do social mediów",
      description: "Mała etykieta nad listą, np. „Śledź festiwal”.",
      type: "string",
      group: "kanaly",
    }),
    defineField({
      name: "kanaly",
      title: "Linki do social mediów",
      description:
        "Każda pozycja to ikona i nazwa serwisu, klikalne. Kanał, dla którego nie ma ani własnego, ani zapasowego adresu, w ogóle się nie pojawi.",
      type: "array",
      group: "kanaly",
      of: [
        defineArrayMember({
          type: "object",
          name: "kanal",
          fields: [
            defineField({
              name: "nazwa",
              title: "Który serwis",
              description:
                "Wybór z listy decyduje, jaka ikona stanie obok nazwy.",
              type: "string",
              options: {
                list: ["Facebook", "Instagram", "YouTube", "TikTok"],
              },
            }),
            defineField({
              name: "adres",
              title: "Link do profilu",
              type: "url",
              description:
                "Opcjonalny. Puste pole = pozycja prowadzi na kanał organizatora: Facebook i Instagram Chen Taijiquan Rzeszów, a przy YouTube na stronę główną serwisu. TikTok bez adresu nie pojawi się w ogóle.",
            }),
          ],
          preview: {
            select: { title: "nazwa", adres: "adres" },
            prepare: ({ title, adres }) => ({
              title,
              subtitle: adres ?? "kanał organizatora",
            }),
          },
        }),
      ],
    }),

    defineField({
      name: "nawigacjaTytul",
      title: "Nagłówek nad spisem sekcji",
      type: "string",
      group: "stopka",
      description:
        "Na dole strony stoi spis wszystkich sekcji. To jest nagłówek nad nim, np. „Na tej stronie”. Samą listę strona generuje automatycznie.",
    }),
    defineField({
      name: "powrotNaGore",
      title: "Napis na odnośniku „na górę”",
      description:
        "Odnośnik ze strzałką w prawym dolnym rogu stopki, np. „Wróć na początek”.",
      type: "string",
      group: "stopka",
    }),
  ],
  preview: {
    select: { subtitle: "organizator" },
    prepare: ({ subtitle }) => ({ title: "Kontakt", subtitle }),
  },
});
