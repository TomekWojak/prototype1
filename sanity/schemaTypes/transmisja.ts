import { defineField, defineType } from "sanity";

export const transmisja = defineType({
  name: "transmisja",
  title: "Transmisja",
  type: "document",
  fields: [
    defineField({
      name: "aktywna",
      title: "Pokazuj panel transmisji",
      type: "boolean",
      initialValue: true,
      description:
        "Panel wysuwany z prawego dolnego rogu strony. Wyłącz, gdy nie ma czego transmitować - zniknie wtedy razem z przyciskiem.",
    }),
    defineField({
      name: "adresYouTube",
      title: "Link do transmisji na YouTube",
      type: "url",
      description:
        "Wklej odnośnik w dowolnej postaci - z paska adresu, z przycisku „Udostępnij”, ze strony transmisji na żywo. Strona sama wyciągnie z niego film. Puste pole = w panelu zostaje pole zastępcze z informacją, że transmisja jeszcze nie ruszyła.",
    }),
    defineField({
      name: "naZywo",
      title: "Napis obok pulsującej kropki",
      type: "string",
      description:
        "Widoczny w pasku panelu, wersalikami na czerwono, obok pulsującej kropki. Np. „Na żywo”.",
    }),
    defineField({
      name: "polePlaceholder",
      title: "Napis w miejscu odtwarzacza",
      type: "string",
      description: "Widoczny w pustej ramce, dopóki nie ma podpiętego filmu.",
    }),
    defineField({
      name: "etykietaPokaz",
      title: "Napis na przycisku, gdy panel jest zwinięty",
      type: "string",
      description: "Np. „Pokaż transmisję”",
    }),
    defineField({
      name: "etykietaUkryj",
      title: "Napis na przycisku, gdy panel jest rozwinięty",
      type: "string",
      description: "Np. „Ukryj transmisję”.",
    }),
  ],
  preview: {
    select: { aktywna: "aktywna", id: "adresYouTube" },
    prepare: ({ aktywna, id }) => ({
      title: "Transmisja",
      subtitle: !aktywna
        ? "Panel ukryty"
        : id
          ? `Film ${id}`
          : "Pole zastępcze - brak filmu",
    }),
  },
});
