import { defineArrayMember, defineField, defineType } from "sanity";

export const zapisy = defineType({
  name: "zapisy",
  title: "Zapisy",
  type: "document",
  groups: [
    { name: "naglowek", title: "Nagłówek sekcji", default: true },
    { name: "formularz", title: "Napisy na przyciskach" },
    { name: "sukces", title: "Podziękowanie po wysłaniu" },
  ],
  fields: [
    defineField({
      name: "nadkreslenie",
      title: "Mała etykieta nad tytułem",
      description:
        "Kilka słów pisanych wersalikami, na czerwono, tuż nad dużym tytułem sekcji. Np. „Zapisy”.",
      type: "string",
      group: "naglowek",
    }),
    defineField({
      name: "tytul",
      title: "Duży tytuł sekcji",
      description:
        "Napis, który widać jako największy tekst tej sekcji. Ostatnie słowo strona sama pokoloruje na czerwono — przy „Zapisz się na warsztaty” czerwone będzie „warsztaty”.",
      type: "string",
      group: "naglowek",
    }),
    defineField({
      name: "lead",
      title: "Akapit pod tytułem",
      type: "text",
      rows: 3,
      group: "naglowek",
      description:
        "Jedno–dwa zdania. Warto tu napisać, że wstęp na festiwal jest wolny, a zapisy dotyczą wyłącznie warsztatów.",
    }),
    defineField({
      name: "krokiTytul",
      title: "Nagłówek nad listą kroków",
      type: "string",
      group: "naglowek",
      description: "Np. „Jak to działa”. Stoi nad ponumerowaną listą niżej.",
    }),
    defineField({
      name: "kroki",
      title: "Kroki — co się dzieje po zgłoszeniu",
      type: "array",
      group: "naglowek",
      description:
        "Lista obok formularza, tłumacząca uczestnikowi przebieg zapisów. Numery 01, 02, 03 strona dopisuje sama — nie wpisuj ich. Trzy kroki działają najlepiej; kolejność przeciągnij myszą.",
      of: [
        defineArrayMember({
          type: "object",
          name: "krok",
          fields: [
            defineField({
              name: "tytul",
              title: "Krok — nagłówek",
              type: "string",
              description:
                "Pogrubiona linijka, np. „Wypełniasz formularz”. Trzymaj jeden tryb czasownika we wszystkich krokach.",
            }),
            defineField({
              name: "opis",
              title: "Krok — wyjaśnienie",
              type: "text",
              rows: 2,
              description: "Jedno–dwa zdania pod nagłówkiem kroku.",
            }),
          ],
          preview: { select: { title: "tytul", subtitle: "opis" } },
        }),
      ],
    }),

    defineField({
      name: "etykietaWyslij",
      title: "Napis na przycisku wysyłki",
      description:
        "Czerwony przycisk pod formularzem, np. „Wyślij zgłoszenie”.",
      type: "string",
      group: "formularz",
    }),
    defineField({
      name: "etykietaWysylanie",
      title: "Napis na przycisku podczas wysyłania",
      type: "string",
      group: "formularz",
      description: "Widoczny przez chwilę po kliknięciu, np. „Wysyłanie…”.",
    }),

    defineField({
      name: "sukcesTytul",
      title: "Po wysłaniu — nagłówek",
      description:
        "Formularz znika, a na jego miejscu pojawia się podziękowanie. To jest jego nagłówek, np. „Zgłoszenie przyjęte”.",
      type: "string",
      group: "sukces",
    }),
    defineField({
      name: "sukcesTresc",
      title: "Po wysłaniu — tekst",
      type: "text",
      rows: 3,
      group: "sukces",
      description:
        "Co się teraz stanie. Obiecuj tylko to, co faktycznie zrobicie — formularz nie ma wyboru warsztatu, więc nie pisz o „wybranym terminie”.",
    }),
    defineField({
      name: "etykietaPonownie",
      title: "Po wysłaniu — napis na przycisku",
      description:
        "Przycisk czyszczący formularz, żeby zgłosić kolejną osobę, np. „Zgłoś kolejną osobę”.",
      type: "string",
      group: "sukces",
    }),
  ],
  preview: {
    prepare: () => ({ title: "Zapisy" }),
  },
});
