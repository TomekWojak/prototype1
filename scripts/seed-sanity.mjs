/* Przepisuje treści zapasowe z `src/lib/fallback.ts` do Sanity, żeby panel
   pokazywał to samo, co strona. Uzupełnia wyłącznie puste pola - wartości już
   wpisane przez klienta zostają nietknięte.

   Uruchomienie:
     node scripts/seed-sanity.mjs          - tylko pokazuje, co by zrobił
     node scripts/seed-sanity.mjs --apply  - zapisuje zmiany

   Wymaga zmiennej SANITY_API_WRITE_TOKEN w `.env.local` (token z rolą Editor,
   do wygenerowania w sanity.io/manage → API → Tokens). Po wykonaniu zadania
   token można skasować - do niczego innego nie jest potrzebny. */

import { readFileSync } from "node:fs";
import { join } from "node:path";
import { createClient } from "@sanity/client";
import * as fallback from "../src/lib/fallback.ts";

const APPLY = process.argv.includes("--apply");

/* Ścieżka liczona od położenia tego pliku, a nie od katalogu, w którym stoi
   terminal - inaczej skrypt działa tylko wtedy, gdy uruchomi się go z katalogu
   projektu, a uruchomiony z innego miejsca przewraca się na braku `.env.local`. */
const ENV_FILE = join(import.meta.dirname, "..", ".env.local");

/* Własny parser zamiast `--env-file`: klucz prywatny Google w `.env.local`
   zawiera cudzysłowy i sekwencje `\n`, na których wbudowany parser potrafi się
   wyłożyć. Tutaj czytamy tylko trzy potrzebne wartości. */
function readEnv() {
  const out = {};
  for (const line of readFileSync(ENV_FILE, "utf8").split(/\r?\n/)) {
    const match = /^([A-Z0-9_]+)=(.*)$/.exec(line);
    if (match) out[match[1]] = match[2].trim().replace(/^["']|["']$/g, "");
  }
  return out;
}

const env = readEnv();
const token = env.SANITY_API_WRITE_TOKEN;

/* Podgląd tylko czyta, więc działa bez tokenu - token jest potrzebny dopiero
   przy zapisie. Dzięki temu można obejrzeć plan, zanim cokolwiek się wygeneruje. */
if (APPLY && !token) {
  console.error(
    "Brak SANITY_API_WRITE_TOKEN w .env.local.\n" +
      "Wygeneruj token z rolą Editor: sanity.io/manage → projekt → API → Tokens.",
  );
  process.exit(1);
}

const client = createClient({
  projectId: env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: env.NEXT_PUBLIC_SANITY_API_VERSION ?? "2026-09-06",
  token: token || undefined,
  useCdn: false,
});

/* Elementy tablic w Sanity muszą mieć `_key`, inaczej Studio nie potrafi ich
   przestawiać ani usuwać, a `_type` musi zgadzać się z nazwą z `defineArrayMember`. */
function items(type, list, mapItem) {
  return list.map((item, index) => ({
    _type: type,
    _key: `seed-${index}`,
    ...mapItem(item),
  }));
}

const { event, contact, location, stream } = fallback;

/* Mapowanie w drugą stronę niż `query.ts`: angielskie nazwy z kodu na polskie
   nazwy pól w panelu. Pominięte są pola wyliczane po stronie kodu - znaki
   chińskie, pinyin i cechy filarów nie mają odpowiedników w schemacie. */
const DOCUMENTS = {
  wydarzenie: {
    nazwa: event.name,
    podtytul: event.subtitle,
    nadkreslenie: event.kicker,
    tagline: event.tagline,
    lead: event.lead,
    fakty: [...event.facts],
    data: event.date,
    wstep: event.admission,
    miejsce: event.venue,
    przyciskGlowny: event.ctaPrimary,
    przyciskDrugi: event.ctaSecondary,
    przyciskWPasku: event.ctaHeader,
  },

  oFestiwalu: {
    nadkreslenie: fallback.aboutCopy.eyebrow,
    tytul: fallback.aboutCopy.title,
    filary: items("filar", fallback.pillars, (p) => ({
      nazwa: p.name,
      rola: p.role,
      opis: p.description,
    })),
    cytatTekst: fallback.aboutQuote.text,
    cytatNota: fallback.aboutQuote.note,
    credo: [...fallback.modernCreed],
    credoZamkniecie: fallback.modernCreedClosing,
    odbiorcyTytul: fallback.aboutCopy.audiencesTitle,
    odbiorcy: items("odbiorca", fallback.audiences, (a) => ({
      tytul: a.title,
      opis: a.description,
    })),
  },

  aktywnosci: {
    nadkreslenie: fallback.activitiesCopy.eyebrow,
    tytul: fallback.activitiesCopy.title,
    lead: fallback.activitiesCopy.lead,
    pozycje: items("aktywnosc", fallback.activities, (a) => ({
      tytul: a.title,
      opis: a.description,
    })),
    zamkniecieTytul: fallback.activitiesCopy.closingTitle,
    zamkniecieTresc: fallback.activitiesCopy.closingBody,
    zamkniecieCta: fallback.activitiesCopy.closingCta,
  },

  warsztaty: {
    nadkreslenie: fallback.workshopsCopy.eyebrow,
    tytul: fallback.workshopsCopy.title,
    lead: fallback.workshopsCopy.lead,
    pozycje: items("warsztat", fallback.workshops, (w) => ({
      tytul: w.title,
      opis: w.description,
      czas: w.duration,
      poziom: w.level,
      miejsca: w.seats,
    })),
    zasadyTytul: fallback.workshopsCopy.rulesTitle,
    zasady: [...fallback.workshopsCopy.rules],
    ctaEtykieta: fallback.workshopsCopy.ctaLabel,
  },

  zapisy: {
    nadkreslenie: fallback.formCopy.eyebrow,
    tytul: fallback.formCopy.title,
    lead: fallback.formCopy.lead,
    krokiTytul: fallback.formCopy.stepsTitle,
    kroki: items("krok", fallback.formCopy.steps, (s) => ({
      tytul: s.title,
      opis: s.description,
    })),
    etykietaWyslij: fallback.formCopy.submit,
    etykietaWysylanie: fallback.formCopy.submitting,
    sukcesTytul: fallback.formCopy.successTitle,
    sukcesTresc: fallback.formCopy.successBody,
    etykietaPonownie: fallback.formCopy.againLabel,
    zgodaTresc: fallback.formCopy.consentLabel,
    zgodaLinkTekst: fallback.formCopy.consentLinkLabel,
    zgodaAdres: fallback.formCopy.consentUrl,
  },

  /* `godziny` zostają puste celowo - godziny otwarcia mają się pojawić dopiero
     wtedy, gdy klient sam je wpisze. */
  lokalizacja: {
    nadkreslenie: fallback.locationCopy.eyebrow,
    tytul: fallback.locationCopy.title,
    lead: fallback.locationCopy.lead,
    godzinyTytul: fallback.locationCopy.hoursTitle,
    notatki: items("notatka", location.notes, (n) => ({
      tytul: n.title,
      tresc: n.body,
    })),
    zapytanieMapy: location.mapsQuery,
    etykietaMapy: fallback.locationCopy.mapsLabel,
  },

  partnerzy: {
    nadkreslenie: fallback.partnersCopy.eyebrow,
    tytul: fallback.partnersCopy.title,
    lead: fallback.partnersCopy.lead,
    grupy: items("grupa", fallback.partnerGroups, (g) => ({
      etykieta: g.label,
      partnerzy: items("partner", g.partners, (p) => ({ nazwa: p.name })),
    })),
  },

  faq: {
    nadkreslenie: fallback.faqCopy.eyebrow,
    tytul: fallback.faqCopy.title,
    lead: fallback.faqCopy.lead,
    pytania: items("pytanie", fallback.faq, (q) => ({
      pytanie: q.q,
      odpowiedz: q.a,
    })),
    ctaTytul: fallback.faqCopy.ctaTitle,
    ctaEtykieta: fallback.faqCopy.ctaLabel,
  },

  /* Adresy kanałów zostają puste - bez nich strona otwiera profile szkoły
     zapisane w kodzie, a wpisany adres je nadpisuje.

     Telefonu i adresu e-mail celowo tu nie ma. W treściach zapasowych są
     wypełniaczami z etapu prototypu - numer jest zmyślony, a adres wskazuje na
     domenę, której nikt nie zarejestrował. Wpisane do panelu wyglądałyby jak
     prawdziwe dane klienta i nikt by ich już nie zweryfikował. Te dwa pola
     wypełnia się ręcznie, wartościami potwierdzonymi przez klienta. */
  kontakt: {
    nadkreslenie: fallback.contactCopy.eyebrow,
    tytul: fallback.contactCopy.title,
    lead: fallback.contactCopy.lead,
    organizator: contact.organiser,
    kanalyTytul: fallback.contactCopy.channelsTitle,
    kanaly: items("kanal", contact.channels, (c) => ({ nazwa: c.label })),
    nawigacjaTytul: fallback.contactCopy.navTitle,
    powrotNaGore: fallback.contactCopy.backToTop,
  },

  /* `aktywna` i `adresYouTube` należą wyłącznie do panelu - włączenie
     transmisji jest decyzją klienta, nie treścią zapasową. */
  transmisja: {
    naZywo: stream.live,
    tytul: stream.title,
    polePlaceholder: stream.placeholder,
    etykietaPokaz: stream.showLabel,
    etykietaUkryj: stream.hideLabel,
  },
};

function isBlank(value) {
  if (value === null || value === undefined) return true;
  if (typeof value === "string") return value.trim() === "";
  if (Array.isArray(value)) return value.length === 0;
  return false;
}

/* Najczęstsze potknięcie przy pierwszym uruchomieniu to token wygenerowany
   w innym projekcie. Sanity zwraca wtedy „project user not found”, co bez
   tłumaczenia brzmi jak awaria, a jest zwykłą pomyłką przy zakładaniu tokenu. */
async function fetchOrExplain(query, params) {
  try {
    return await client.fetch(query, params);
  } catch (err) {
    if (String(err?.message).includes("project user not found")) {
      console.error(
        `Token nie należy do projektu ${env.NEXT_PUBLIC_SANITY_PROJECT_ID}.\n` +
          "Wygeneruj go pod adresem:\n" +
          `https://www.sanity.io/manage/project/${env.NEXT_PUBLIC_SANITY_PROJECT_ID}/api`,
      );
      process.exit(1);
    }
    throw err;
  }
}

const ids = Object.keys(DOCUMENTS);
const existing = await fetchOrExplain(`*[_id in $ids]`, { ids });
const drafts = await fetchOrExplain(`*[_id in $ids]._id`, {
  ids: ids.map((id) => `drafts.${id}`),
});
const byId = new Map(existing.map((doc) => [doc._id, doc]));

let willWrite = 0;
const plan = [];

for (const [id, fields] of Object.entries(DOCUMENTS)) {
  const current = byId.get(id);
  const missing = {};

  for (const [field, value] of Object.entries(fields)) {
    if (isBlank(value)) continue;
    if (isBlank(current?.[field])) missing[field] = value;
  }

  const keep = Object.keys(fields).filter(
    (field) => !(field in missing) && !isBlank(current?.[field]),
  );

  plan.push({ id, missing, keep, exists: Boolean(current) });
  willWrite += Object.keys(missing).length;
}

console.log(APPLY ? "ZAPIS\n" : "PODGLĄD (bez zapisu)\n");

for (const { id, missing, keep, exists } of plan) {
  const fill = Object.keys(missing);
  console.log(`${id}${exists ? "" : "  (dokument jeszcze nie istnieje)"}`);
  console.log(`   uzupełni: ${fill.length ? fill.join(", ") : "nic, komplet"}`);
  if (keep.length) console.log(`   zostawi:  ${keep.join(", ")}`);
  console.log();
}

if (drafts.length) {
  console.log(
    `UWAGA: w panelu są niezapisane wersje robocze: ${drafts.join(", ")}.\n` +
      "Skrypt ich nie dotyka, więc w Studio nadal zobaczysz wersję roboczą.\n" +
      "Opublikuj je albo odrzuć przed uruchomieniem z --apply.\n",
  );
}

if (!willWrite) {
  console.log("Nie ma czego uzupełniać.");
  process.exit(0);
}

if (!APPLY) {
  console.log(
    `Do uzupełnienia: ${willWrite} pól. Uruchom ponownie z --apply, żeby zapisać.`,
  );
  process.exit(0);
}

for (const { id, missing } of plan) {
  if (!Object.keys(missing).length) continue;
  await client.createIfNotExists({ _id: id, _type: id });
  await client.patch(id).setIfMissing(missing).commit();
  console.log(`zapisano ${id}`);
}

console.log(`\nGotowe. Uzupełniono ${willWrite} pól.`);
