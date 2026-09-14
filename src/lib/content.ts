import * as fallback from "@/lib/fallback";
import { sanityClient } from "@/lib/sanity/client";
import { toIsoDate } from "@/lib/date";
import { youtubeEmbedUrl } from "@/lib/youtube";
import { CONTENT_QUERY } from "@/lib/sanity/query";

export type FestivalEvent = {
  name: string;
  nameCjk: string;
  subtitle: string;
  kicker: string;
  date: string;
  dateIso: string;
  venue: string;
  admission: string;
  ctaPrimary: string;
  ctaSecondary: string;
  ctaHeader: string;
  tagline: string;
  lead: string;
  facts: readonly string[];
};

export type Pillar = {
  key: string;
  cjk: string;
  pinyin: string;
  name: string;
  role: string;
  description: string;
  traits: readonly string[];
};

export type Audience = { title: string; description: string };
export type Quote = { text: string; note: string };

export type Activity = {
  title: string;
  description: string;
  cjk: string;
};

export type Workshop = {
  title: string;
  duration?: string;
  level?: string;
  age?: string;
  seats?: number;
  description: string;
};

export type OpeningHours = { day: string; time: string };
export type TravelNote = { title: string; body: string };
export type Partner = { name: string; href?: string | null };
export type PartnerGroup = { label: string; partners: readonly Partner[] };
export type Question = { q: string; a: string };

export type Channel = { label: string; href: string };

export type SectionCopy = { eyebrow: string; title: string };

export type FormStep = { title: string; description: string };

export type Content = {
  event: FestivalEvent;
  pillars: readonly Pillar[];
  aboutCopy: SectionCopy;
  aboutQuote: Quote;
  modernCreed: readonly string[];
  modernCreedClosing: string;
  audiencesTitle: string;
  audiences: readonly Audience[];
  activities: readonly Activity[];
  activitiesCopy: SectionCopy & {
    lead: string;
    closingTitle: string;
    closingBody: string;
    closingCta: string;
  };
  workshops: readonly Workshop[];
  workshopsCopy: SectionCopy & {
    lead: string;
    rulesTitle: string;
    rules: readonly string[];
    ctaLabel: string;
  };
  formCopy: {
    eyebrow: string;
    title: string;
    lead: string;
    stepsTitle: string;
    steps: readonly FormStep[];
    submit: string;
    submitting: string;
    successTitle: string;
    successBody: string;
    againLabel: string;
  };
  location: {
    venue: string;
    hours: readonly OpeningHours[];
    notes: readonly TravelNote[];
    mapsQuery: string;
  };
  locationCopy: SectionCopy & {
    lead: string;
    mapsLabel: string;
    hoursTitle: string;
  };
  partnerGroups: readonly PartnerGroup[];
  partnersCopy: SectionCopy & { lead: string };
  faq: readonly Question[];
  faqCopy: SectionCopy & { lead: string; ctaTitle: string; ctaLabel: string };
  contact: {
    organiser: string;
    email: string;
    phone: string;
    phoneHref: string;
    channels: readonly Channel[];
  };
  contactCopy: SectionCopy & {
    lead: string;
    channelsTitle: string;
    navTitle: string;
    backToTop: string;
  };
  stream: {
    live: string;
    title: string;
    placeholder: string;
    showLabel: string;
    hideLabel: string;
    active: boolean;
    embedUrl: string | null;
  };
};

function text(value: string | null | undefined, fallbackValue: string): string {
  const trimmed = value?.trim();
  return trimmed ? trimmed : fallbackValue;
}

/* `NoInfer` wygląda na zbędne, ale bez niego TypeScript wnioskuje typ wyniku
   z literałów `as const` w `fallback.ts` i zwykły `string` z CMS-a przestaje
   do niego pasować. */
function list<T, Z>(
  items: readonly T[] | null | undefined,
  fallbackValue: readonly NoInfer<Z>[],
  mapItem: (item: T, index: number) => Z,
): readonly Z[] {
  if (!items || items.length === 0) return fallbackValue;

  const filled = items
    .map((item, index) => ({ item, index }))
    .filter(({ item }) => !isEmpty(item))
    .map(({ item, index }) => mapItem(item, index));

  return filled.length > 0 ? filled : fallbackValue;
}

function isEmpty(value: unknown): boolean {
  if (value === null || value === undefined) return true;
  if (typeof value === "string") return value.trim() === "";
  if (typeof value === "number" || typeof value === "boolean") return false;
  if (Array.isArray(value)) return value.every(isEmpty);
  if (typeof value === "object") return Object.values(value).every(isEmpty);
  return false;
}

function channel(label: string, own: string | null | undefined): Channel {
  const entered = own?.trim() ?? "";
  return { label, href: entered || fallback.defaultChannelUrl(label) || "" };
}

function dialable(phone: string): string {
  return phone.replace(/[^\d+]/g, "");
}

type SanityResponse = Awaited<
  ReturnType<NonNullable<typeof sanityClient>["fetch"]>
>;

async function fetchFromSanity(): Promise<SanityResponse | null> {
  if (!sanityClient) return null;

  try {
    return await sanityClient.fetch(
      CONTENT_QUERY,
      {},
      { next: { revalidate: 30 } },
    );
  } catch (err) {
    console.warn(
      "[content] Nie udało się pobrać treści z Sanity — używam treści z fallback.ts.",
      err,
    );
    return null;
  }
}

export async function getContent(): Promise<Content> {
  const data = (await fetchFromSanity()) as Record<
    string,
    Record<string, unknown> | null
  > | null;

  const field = <T>(doc: string, name: string): T | undefined =>
    (data?.[doc]?.[name] as T | undefined) ?? undefined;

  const date = text(field<string>("event", "date"), fallback.event.date);

  const event: FestivalEvent = {
    nameCjk: fallback.event.nameCjk,
    name: text(field<string>("event", "name"), fallback.event.name),
    subtitle: text(field<string>("event", "subtitle"), fallback.event.subtitle),
    kicker: text(field<string>("event", "kicker"), fallback.event.kicker),
    tagline: text(field<string>("event", "tagline"), fallback.event.tagline),
    lead: text(field<string>("event", "lead"), fallback.event.lead),
    date,
    dateIso: toIsoDate(date),
    admission: text(
      field<string>("event", "admission"),
      fallback.event.admission,
    ),
    venue: text(field<string>("event", "venue"), fallback.event.venue),
    ctaPrimary: text(
      field<string>("event", "ctaPrimary"),
      fallback.event.ctaPrimary,
    ),
    ctaSecondary: text(
      field<string>("event", "ctaSecondary"),
      fallback.event.ctaSecondary,
    ),
    ctaHeader: text(
      field<string>("event", "ctaHeader"),
      fallback.event.ctaHeader,
    ),

    facts: list(
      field<string[]>("event", "facts"),
      fallback.event.facts,
      (s) => s,
    ).slice(0, 3),
  };

  const phone = text(field<string>("contact", "phone"), fallback.contact.phone);

  return {
    event,

    pillars: list(
      field<Array<{ name?: string; role?: string; description?: string }>>(
        "about",
        "pillars",
      ),
      fallback.pillars,
      (f, index): Pillar => {
        const decoration = fallback.pillarDecoration(index);
        return {
          key: decoration.key,
          cjk: decoration.cjk,
          pinyin: decoration.pinyin,
          traits: decoration.traits,
          name: f.name ?? "",
          role: f.role ?? "",
          description: f.description ?? "",
        };
      },
    ),

    aboutCopy: {
      eyebrow: text(
        field<string>("about", "eyebrow"),
        fallback.aboutCopy.eyebrow,
      ),
      title: text(field<string>("about", "title"), fallback.aboutCopy.title),
    },
    aboutQuote: {
      text: text(field<string>("about", "quoteText"), fallback.aboutQuote.text),
      note: text(field<string>("about", "quoteNote"), fallback.aboutQuote.note),
    },
    modernCreed: list(
      field<string[]>("about", "creed"),
      fallback.modernCreed,
      (s) => s,
    ),
    modernCreedClosing: text(
      field<string>("about", "creedClosing"),
      fallback.modernCreedClosing,
    ),
    audiencesTitle: text(
      field<string>("about", "audiencesTitle"),
      "Dla kogo jest ten festiwal",
    ),
    audiences: list(
      field<Array<{ title?: string; description?: string }>>(
        "about",
        "audiences",
      ),
      fallback.audiences,
      (o): Audience => ({
        title: o.title ?? "",
        description: o.description ?? "",
      }),
    ),

    activities: list(
      field<Array<{ title?: string; description?: string }>>(
        "activities",
        "items",
      ),
      fallback.activities,
      (a) => ({ title: a.title ?? "", description: a.description ?? "" }),
    ).map((a, index): Activity => ({
      ...a,
      cjk: fallback.activityGlyph(index),
    })),
    activitiesCopy: {
      eyebrow: text(
        field<string>("activities", "eyebrow"),
        fallback.activitiesCopy.eyebrow,
      ),
      title: text(
        field<string>("activities", "title"),
        fallback.activitiesCopy.title,
      ),
      lead: text(
        field<string>("activities", "lead"),
        fallback.activitiesCopy.lead,
      ),
      closingTitle: text(
        field<string>("activities", "closingTitle"),
        fallback.activitiesCopy.closingTitle,
      ),
      closingBody: text(
        field<string>("activities", "closingBody"),
        fallback.activitiesCopy.closingBody,
      ),
      closingCta: text(
        field<string>("activities", "closingCta"),
        fallback.activitiesCopy.closingCta,
      ),
    },

    workshops: list(
      field<
        Array<{
          title?: string;
          description?: string;
          duration?: string;
          level?: string;
          age?: string;
          seats?: number;
        }>
      >("workshops", "items"),
      fallback.workshops,
      (w): Workshop => ({
        title: w.title ?? "",
        description: w.description ?? "",
        duration: w.duration ?? "",
        level: w.level ?? "",
        ...(w.age ? { age: w.age } : {}),

        ...(typeof w.seats === "number" ? { seats: w.seats } : {}),
      }),
    ),
    workshopsCopy: {
      eyebrow: text(
        field<string>("workshops", "eyebrow"),
        fallback.workshopsCopy.eyebrow,
      ),
      title: text(
        field<string>("workshops", "title"),
        fallback.workshopsCopy.title,
      ),
      lead: text(
        field<string>("workshops", "lead"),
        fallback.workshopsCopy.lead,
      ),
      rulesTitle: text(
        field<string>("workshops", "rulesTitle"),
        fallback.workshopsCopy.rulesTitle,
      ),
      rules: list(
        field<string[]>("workshops", "rules"),
        fallback.workshopsCopy.rules,
        (s) => s,
      ),
      ctaLabel: text(
        field<string>("workshops", "ctaLabel"),
        fallback.workshopsCopy.ctaLabel,
      ),
    },

    formCopy: {
      eyebrow: text(
        field<string>("registration", "eyebrow"),
        fallback.formCopy.eyebrow,
      ),
      title: text(
        field<string>("registration", "title"),
        fallback.formCopy.title,
      ),
      lead: text(field<string>("registration", "lead"), fallback.formCopy.lead),
      stepsTitle: text(
        field<string>("registration", "stepsTitle"),
        fallback.formCopy.stepsTitle,
      ),
      steps: list(
        field<Array<{ title?: string; description?: string }>>(
          "registration",
          "steps",
        ),
        fallback.formCopy.steps,
        (k): FormStep => ({
          title: k.title ?? "",
          description: k.description ?? "",
        }),
      ),
      submit: text(
        field<string>("registration", "submitLabel"),
        fallback.formCopy.submit,
      ),
      submitting: text(
        field<string>("registration", "submittingLabel"),
        fallback.formCopy.submitting,
      ),
      successTitle: text(
        field<string>("registration", "successTitle"),
        fallback.formCopy.successTitle,
      ),
      successBody: text(
        field<string>("registration", "successBody"),
        fallback.formCopy.successBody,
      ),
      againLabel: text(
        field<string>("registration", "againLabel"),
        fallback.formCopy.againLabel,
      ),
    },

    location: {
      venue: event.venue,
      hours: list(
        field<Array<{ day?: string; time?: string }>>("location", "hours"),
        fallback.location.hours,
        (g): OpeningHours => ({ day: g.day ?? "", time: g.time ?? "" }),
      ),
      notes: list(
        field<Array<{ title?: string; body?: string }>>("location", "notes"),
        fallback.location.notes,
        (n): TravelNote => ({ title: n.title ?? "", body: n.body ?? "" }),
      ),
      mapsQuery: text(
        field<string>("location", "mapsQuery"),
        fallback.location.mapsQuery,
      ),
    },
    locationCopy: {
      eyebrow: text(
        field<string>("location", "eyebrow"),
        fallback.locationCopy.eyebrow,
      ),
      title: text(
        field<string>("location", "title"),
        fallback.locationCopy.title,
      ),
      lead: text(field<string>("location", "lead"), fallback.locationCopy.lead),
      mapsLabel: text(
        field<string>("location", "mapsLabel"),
        fallback.locationCopy.mapsLabel,
      ),
      hoursTitle: text(
        field<string>("location", "hoursTitle"),
        fallback.locationCopy.hoursTitle,
      ),
    },

    partnerGroups: list(
      field<
        Array<{
          label?: string;
          partners?: Array<{ name?: string; href?: string }>;
        }>
      >("partners", "groups"),
      fallback.partnerGroups,
      (g): PartnerGroup => ({
        label: g.label ?? "",
        partners: (g.partners ?? []).map((p) => ({
          name: p.name ?? "",
          href: p.href ?? null,
        })),
      }),
    ),
    partnersCopy: {
      eyebrow: text(
        field<string>("partners", "eyebrow"),
        fallback.partnersCopy.eyebrow,
      ),
      title: text(
        field<string>("partners", "title"),
        fallback.partnersCopy.title,
      ),
      lead: text(field<string>("partners", "lead"), fallback.partnersCopy.lead),
    },

    faq: list(
      field<Array<{ q?: string; a?: string }>>("faq", "questions"),
      fallback.faq,
      (p): Question => ({ q: p.q ?? "", a: p.a ?? "" }),
    ),
    faqCopy: {
      eyebrow: text(field<string>("faq", "eyebrow"), fallback.faqCopy.eyebrow),
      title: text(field<string>("faq", "title"), fallback.faqCopy.title),
      lead: text(field<string>("faq", "lead"), fallback.faqCopy.lead),
      ctaTitle: text(
        field<string>("faq", "ctaTitle"),
        fallback.faqCopy.ctaTitle,
      ),
      ctaLabel: text(
        field<string>("faq", "ctaLabel"),
        fallback.faqCopy.ctaLabel,
      ),
    },

    contact: {
      organiser: text(
        field<string>("contact", "organiser"),
        fallback.contact.organiser,
      ),
      email: text(field<string>("contact", "email"), fallback.contact.email),
      phone,
      phoneHref: dialable(phone),
      channels: list(
        field<Array<{ label?: string; href?: string }>>("contact", "channels"),
        fallback.contact.channels.map((c) => channel(c.label, c.href)),
        (k) => channel(k.label ?? "", k.href),
      ).filter((c) => c.href !== ""),
    },
    contactCopy: {
      eyebrow: text(
        field<string>("contact", "eyebrow"),
        fallback.contactCopy.eyebrow,
      ),
      title: text(
        field<string>("contact", "title"),
        fallback.contactCopy.title,
      ),
      lead: text(field<string>("contact", "lead"), fallback.contactCopy.lead),
      channelsTitle: text(
        field<string>("contact", "channelsTitle"),
        fallback.contactCopy.channelsTitle,
      ),
      navTitle: text(
        field<string>("contact", "navTitle"),
        fallback.contactCopy.navTitle,
      ),
      backToTop: text(
        field<string>("contact", "backToTop"),
        fallback.contactCopy.backToTop,
      ),
    },

    stream: {
      live: text(field<string>("stream", "live"), fallback.stream.live),
      title: text(field<string>("stream", "title"), fallback.stream.title),
      placeholder: text(
        field<string>("stream", "placeholder"),
        fallback.stream.placeholder,
      ),
      showLabel: text(
        field<string>("stream", "showLabel"),
        fallback.stream.showLabel,
      ),
      hideLabel: text(
        field<string>("stream", "hideLabel"),
        fallback.stream.hideLabel,
      ),

      active: field<boolean>("stream", "active") ?? true,
      embedUrl: youtubeEmbedUrl(field<string>("stream", "youtubeUrl")),
    },
  };
}
