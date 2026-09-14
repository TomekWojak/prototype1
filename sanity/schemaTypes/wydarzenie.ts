import { defineArrayMember, defineField, defineType } from "sanity";

export const wydarzenie = defineType({
  name: "wydarzenie",
  title: "Wydarzenie",
  type: "document",
  groups: [
    { name: "nazwa", title: "Nazwa i hasła", default: true },
    { name: "termin", title: "Termin" },
    { name: "miejsce", title: "Miejsce" },
    { name: "przyciski", title: "Przyciski" },
  ],
  fields: [
    defineField({
      name: "nazwa",
      title: "Nazwa festiwalu",
      type: "string",
      group: "nazwa",
      description:
        "Np. „Księga i Miecz”. Stąd bierze się i logo w pasku na górze, i wielki napis otwierający stronę. W tym napisie każde słowo staje w osobnym wierszu, a krótkie słowo między dłuższymi („i”, „&”) strona składa mniejszą czcionką na czerwono.",
    }),
    defineField({
      name: "podtytul",
      title: "Podtytuł przy nazwie",
      type: "string",
      group: "nazwa",
      description:
        "Mały napis pod nazwą w pasku na górze i w stopce, np. „Wen & Wu”.",
    }),
    defineField({
      name: "nadkreslenie",
      title: "Mała etykieta nad wielkim napisem",
      type: "string",
      group: "nazwa",
      description:
        "Kilka słów wersalikami, na czerwono, nad nazwą festiwalu na samej górze strony. Np. „Festiwal Kultury Chińskiej”.",
    }),
    defineField({
      name: "tagline",
      title: "Hasło pod nazwą",
      type: "string",
      group: "nazwa",
      description:
        "Jedno zdanie tuż pod wielkim napisem, np. „Poznaj bliżej kulturę i tradycję Chin”.",
    }),
    defineField({
      name: "lead",
      title: "Dłuższy akapit o festiwalu",
      type: "text",
      rows: 4,
      group: "nazwa",
      description:
        "Kilka zdań. Widać je w sekcji „O festiwalu”, a poza tym używa ich Google jako opisu strony w wynikach wyszukiwania.",
    }),
    defineField({
      name: "fakty",
      title: "Trzy krótkie informacje pod hasłem",
      type: "array",
      group: "nazwa",
      of: [defineArrayMember({ type: "string" })],
      description:
        "Wyświetlają się w jednej linii, rozdzielone pionowymi kreskami — np. data, miejsce, „Wstęp wolny”. NAJWYŻEJ TRZY: czwarta i kolejne się nie pokażą, bo pasek przestaje mieścić się w linii. Każdy wpis to kilka słów, nie zdanie.",
    }),

    defineField({
      name: "data",
      title: "Data festiwalu",
      type: "string",
      group: "termin",
      description:
        "W dowolnym zapisie — „25.10.2026”, „24–25 października 2026”, jak wolisz. Strona pokazuje dokładnie to, co tu wpiszesz, i w każdym miejscu to samo: na górze strony, przy formularzu, w menu na telefonie i w stopce.",
    }),
    defineField({
      name: "wstep",
      title: "Informacja o wstępie",
      type: "string",
      group: "termin",
      description:
        "Krótka fraza, np. „Wstęp wolny”. Możesz jej użyć w pasku faktów wyżej.",
    }),

    defineField({
      name: "miejsce",
      title: "Miejsce festiwalu",
      type: "string",
      group: "miejsce",
      description:
        "Jedno pole na całą stronę. Sama nazwa obiektu („Sala Sportowa SP nr 18”) albo nazwa z adresem („Sala Sportowa SP nr 18, ul. Bł. Karoliny 21”) — jeśli adres ma być widoczny, dopisz go tutaj. Wskazówki dojazdu i przycisk do Map Google mają własne pola w sekcji „Lokalizacja”.",
    }),

    defineField({
      name: "przyciskGlowny",
      title: "Napis na czerwonym przycisku",
      type: "string",
      group: "przyciski",
      description:
        "Pierwszy przycisk na samej górze strony. Przewija do formularza zapisów, np. „Zapisz się na warsztaty”.",
    }),
    defineField({
      name: "przyciskDrugi",
      title: "Napis na przycisku z obwódką",
      type: "string",
      group: "przyciski",
      description:
        "Drugi przycisk obok czerwonego. Przewija do sekcji Aktywności, np. „Zobacz program”.",
    }),
    defineField({
      name: "przyciskWPasku",
      title: "Napis na przycisku w pasku na górze",
      type: "string",
      group: "przyciski",
      description:
        "Widoczny przez cały czas, więc musi być krótki — np. „Zapisz się”. Prowadzi tam, gdzie przycisk czerwony.",
    }),
  ],
  preview: {
    select: { title: "nazwa", subtitle: "data" },
    prepare: ({ title, subtitle }) => ({
      title: title ?? "Wydarzenie",
      subtitle: subtitle ?? "Brak daty",
    }),
  },
});
