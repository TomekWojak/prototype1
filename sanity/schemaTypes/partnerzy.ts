import { defineArrayMember, defineField, defineType } from "sanity";

export const partnerzy = defineType({
  name: "partnerzy",
  title: "Partnerzy",
  type: "document",
  fields: [
    defineField({
      name: "nadkreslenie",
      title: "Mała etykieta nad tytułem",
      type: "string",
      description:
        "Kilka słów pisanych wersalikami, na czerwono, tuż nad dużym tytułem sekcji. Np. „Partnerzy”. Zostaw puste, jeśli nie chcesz jej pokazywać.",
    }),
    defineField({
      name: "tytul",
      title: "Duży tytuł sekcji",
      type: "string",
      description:
        "Napis, który widać jako największy tekst tej sekcji. Ostatnie słowo strona sama pokoloruje na czerwono - przy „Kto tworzy festiwal” czerwone będzie „festiwal”.",
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
      name: "grupy",
      title: "Grupy partnerów",
      type: "array",
      description:
        "Partnerzy stoją na stronie w grupach, jedna pod drugą - np. „Patronat i wsparcie”, potem „Organizatorzy”. Kolejność grup i kolejność nazw w grupie przeciągnij myszą.",
      of: [
        defineArrayMember({
          type: "object",
          name: "grupa",
          fields: [
            defineField({
              name: "etykieta",
              title: "Nagłówek grupy",
              description:
                "Mała etykieta wersalikami nad nazwami, np. „Patronat i wsparcie”.",
              type: "string",
            }),
            defineField({
              name: "partnerzy",
              title: "Nazwy w tej grupie",
              type: "array",
              of: [
                defineArrayMember({
                  type: "object",
                  name: "partner",
                  fields: [
                    defineField({
                      name: "nazwa",
                      title: "Nazwa partnera",
                      type: "string",
                      description:
                        "Tak, jak partner chce być podpisany. Nazwa jest zawsze widoczna na stronie - pod logotypem, jeśli go wgrasz, a samodzielnie, jeśli nie.",
                    }),
                    defineField({
                      name: "logo",
                      title: "Logotyp",
                      description:
                        "Najlepiej SVG albo PNG na przezroczystym tle. Strona sama zmniejszy plik do właściwej wysokości, więc nie musisz go przycinać. Bez wgranego pliku zostanie sama nazwa partnera.",
                      type: "image",
                      options: { hotspot: false },
                      fields: [
                        defineField({
                          name: "alt",
                          title: "Opis logotypu dla czytników ekranu",
                          type: "string",
                          description:
                            "Prawie zawsze zostaw puste: nazwa partnera stoi pod logotypem, więc czytnik ekranu i tak ją przeczyta, a powtórzenie tylko przeszkadza. Wypełnij jedynie wtedy, gdy w samym logotypie jest napis, którego nie ma w nazwie.",
                        }),
                      ],
                    }),
                  ],
                  preview: {
                    select: {
                      title: "nazwa",
                      media: "logo",
                    },
                  },
                }),
              ],
            }),
          ],
          preview: {
            select: { title: "etykieta", lista: "partnerzy" },
            prepare: ({ title, lista }) => ({
              title,
              subtitle: `${Array.isArray(lista) ? lista.length : 0} partnerów`,
            }),
          },
        }),
      ],
    }),
  ],
  preview: {
    prepare: () => ({ title: "Partnerzy" }),
  },
});
