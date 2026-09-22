import type { StructureResolver } from "sanity/structure";

const SECTIONS: Array<{ id: string; title: string }> = [
  { id: "wydarzenie", title: "1. Góra strony — nazwa, data, miejsce" },
  { id: "oFestiwalu", title: "2. O festiwalu" },
  { id: "aktywnosci", title: "3. Aktywności" },
  { id: "warsztaty", title: "4. Warsztaty" },
  { id: "zapisy", title: "5. Zapisy" },
  { id: "lokalizacja", title: "6. Lokalizacja" },
  { id: "partnerzy", title: "7. Partnerzy" },
  { id: "faq", title: "8. Najczęstsze pytania" },
  { id: "kontakt", title: "9. Kontakt i stopka" },
  { id: "transmisja", title: "Panel transmisji (róg strony)" },
];

export const structure: StructureResolver = (S) =>
  S.list()
    .title("Treść strony")
    .items(
      SECTIONS.map(({ id, title }) =>
        S.listItem()
          .title(title)
          .id(id)
          .child(S.document().schemaType(id).documentId(id).title(title)),
      ),
    );
