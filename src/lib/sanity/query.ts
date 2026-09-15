import { defineQuery } from "next-sanity";

/* Zapis `"angielska": polska` tłumaczy nazwy pól z Sanity na angielskie.
   Dopisując pole do schematu, dopisz je tu w obu postaciach — bez aliasu
   polska nazwa przecieknie do `content.ts`, a kompilator tego nie wyłapie. */
export const CONTENT_QUERY = defineQuery(`{
  "event": *[_id == "wydarzenie"][0]{
    "name": nazwa,
    "subtitle": podtytul,
    "kicker": nadkreslenie,
    tagline,
    lead,
    "facts": fakty,
    "date": data,
    "admission": wstep,
    "venue": miejsce,
    "ctaPrimary": przyciskGlowny,
    "ctaSecondary": przyciskDrugi,
    "ctaHeader": przyciskWPasku
  },
  "about": *[_id == "oFestiwalu"][0]{
    "eyebrow": nadkreslenie,
    "title": tytul,
    "pillars": filary[]{
      "name": nazwa,
      "role": rola,
      "description": opis
    },
    "quoteText": cytatTekst,
    "quoteNote": cytatNota,
    "creed": credo,
    "creedClosing": credoZamkniecie,
    "audiencesTitle": odbiorcyTytul,
    "audiences": odbiorcy[]{
      "title": tytul,
      "description": opis
    }
  },
  "activities": *[_id == "aktywnosci"][0]{
    "eyebrow": nadkreslenie,
    "title": tytul,
    lead,
    "items": pozycje[]{
      "title": tytul,
      "description": opis
    },
    "closingTitle": zamkniecieTytul,
    "closingBody": zamkniecieTresc,
    "closingCta": zamkniecieCta
  },
  "workshops": *[_id == "warsztaty"][0]{
    "eyebrow": nadkreslenie,
    "title": tytul,
    lead,
    "items": pozycje[]{
      "title": tytul,
      "description": opis,
      "duration": czas,
      "level": poziom,
      "age": wiek,
      "seats": miejsca
    },
    "rulesTitle": zasadyTytul,
    "rules": zasady,
    "ctaLabel": ctaEtykieta
  },
  "registration": *[_id == "zapisy"][0]{
    "eyebrow": nadkreslenie,
    "title": tytul,
    lead,
    "stepsTitle": krokiTytul,
    "steps": kroki[]{
      "title": tytul,
      "description": opis
    },
    "submitLabel": etykietaWyslij,
    "submittingLabel": etykietaWysylanie,
    "successTitle": sukcesTytul,
    "successBody": sukcesTresc,
    "againLabel": etykietaPonownie,
    "consentLabel": zgodaTresc,
    "consentLinkLabel": zgodaLinkTekst,
    "consentUrl": zgodaAdres
  },
  "location": *[_id == "lokalizacja"][0]{
    "eyebrow": nadkreslenie,
    "title": tytul,
    lead,
    "hoursTitle": godzinyTytul,
    "hours": godziny[]{
      "day": dzien,
      "time": godziny
    },
    "notes": notatki[]{
      "title": tytul,
      "body": tresc
    },
    "mapsQuery": zapytanieMapy,
    "mapsLabel": etykietaMapy
  },
  "partners": *[_id == "partnerzy"][0]{
    "eyebrow": nadkreslenie,
    "title": tytul,
    lead,
    "groups": grupy[]{
      "label": etykieta,
      "partners": partnerzy[]{
        "name": nazwa,
        "logo": logo{
          "url": asset->url,
          alt,
          "width": asset->metadata.dimensions.width,
          "height": asset->metadata.dimensions.height
        }
      }
    },
    "note": nota
  },
  "support": *[_id == "wsparcie"][0]{
    "eyebrow": nadkreslenie,
    "title": tytul,
    "body": tresc,
    "ctaLabel": ctaEtykieta
  },
  "faq": *[_id == "faq"][0]{
    "eyebrow": nadkreslenie,
    "title": tytul,
    lead,
    "questions": pytania[]{
      "q": pytanie,
      "a": odpowiedz
    },
    "ctaTitle": ctaTytul,
    "ctaLabel": ctaEtykieta
  },
  "contact": *[_id == "kontakt"][0]{
    "eyebrow": nadkreslenie,
    "title": tytul,
    lead,
    "organiser": organizator,
    email,
    "phone": telefon,
    "transferTitle": daneTytul,
    "taxId": nip,
    "courtRegister": krs,
    "statisticalId": regon,
    "bankAccount": konto,
    "channelsTitle": kanalyTytul,
    "channels": kanaly[]{
      "label": nazwa,
      "href": adres
    },
    "navTitle": nawigacjaTytul,
    "backToTop": powrotNaGore
  },
  "stream": *[_id == "transmisja"][0]{
    "active": aktywna,
    "youtubeUrl": adresYouTube,
    "live": naZywo,
    "title": tytul,
    "placeholder": polePlaceholder,
    "showLabel": etykietaPokaz,
    "hideLabel": etykietaUkryj
  }
}`);
