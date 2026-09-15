import { defineField, defineType } from "sanity";

export const wsparcie = defineType({
  name: "wsparcie",
  title: "Wsparcie",
  type: "document",
  fields: [
    defineField({
      name: "nadkreslenie",
      title: "Mała etykieta nad tytułem",
      type: "string",
      description:
        "Kilka słów wersalikami, na czerwono, nad tytułem banera. Np. „Przekaż nam 1,5%”.",
    }),
    defineField({
      name: "tytul",
      title: "Duży tytuł banera",
      type: "string",
      description:
        "Np. „Wesprzyj nasze stowarzyszenie”. Ostatnie słowo strona sama pokoloruje na czerwono.",
    }),
    defineField({
      name: "tresc",
      title: "Zdanie pod tytułem",
      type: "text",
      rows: 2,
      description:
        "Np. „Ponadto zawsze można nas wesprzeć przelewem o tytule DAROWIZNA”.",
    }),
    defineField({
      name: "ctaEtykieta",
      title: "Napis na przycisku",
      type: "string",
      description:
        "Przycisk po prawej stronie banera. Przewija stronę do danych do przelewu w stopce, np. „Zobacz dane do przelewu”.",
    }),
  ],
  preview: {
    select: { subtitle: "tytul" },
    prepare: ({ subtitle }) => ({ title: "Wsparcie", subtitle }),
  },
});
