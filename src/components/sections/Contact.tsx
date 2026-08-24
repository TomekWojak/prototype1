import type { ComponentType } from "react";

import { CloudBand, PlumBranch, SealStamp } from "@/components/ornaments";
import {
  CjkGlyph,
  Container,
  cx,
  Eyebrow,
  GoldRule,
  Section,
  SectionHeading,
} from "@/components/ui";
import { contact, contactCopy, event, navLinks } from "@/lib/content";

/* ============================================================
   IKONY — rysowane ręcznie, bez plików i bez bibliotek.
   Wszystkie dziedziczą kolor przez `currentColor`, więc jeden
   zestaw obsługuje stan spoczynku i stan hover rodzica.
   ============================================================ */

type IconProps = { className?: string };

function EnvelopeIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      aria-hidden="true"
      focusable="false"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="2.6" y="5.2" width="18.8" height="13.6" rx="2.2" />
      <path d="M3.4 6.6 12 12.9l8.6-6.3" />
    </svg>
  );
}

function PhoneIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      aria-hidden="true"
      focusable="false"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M6.6 3.4h2.7l1.4 3.6-1.9 1.3a11.6 11.6 0 0 0 6 6l1.3-1.9 3.6 1.4v2.7a1.9 1.9 0 0 1-2 1.9C10.3 18 6 13.7 4.7 5.4a1.9 1.9 0 0 1 1.9-2Z" />
    </svg>
  );
}

function ArrowUpIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      aria-hidden="true"
      focusable="false"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 19.5V4.8" />
      <path d="M5.8 11 12 4.8l6.2 6.2" />
    </svg>
  );
}

/* Litera „f” w okręgu — kreślona pociągnięciami, nie glifem fontu. */
function FacebookIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      aria-hidden="true"
      focusable="false"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="9" />
      <path d="M14.6 7.7h-1.4c-1.2 0-2 .8-2 2v6.7" />
      <path d="M9.4 11.9h4.3" />
    </svg>
  );
}

function InstagramIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      aria-hidden="true"
      focusable="false"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="3.6" y="3.6" width="16.8" height="16.8" rx="4.8" />
      <circle cx="12" cy="12" r="3.9" />
      <circle cx="16.7" cy="7.3" r="1.05" fill="currentColor" stroke="none" />
    </svg>
  );
}

function YouTubeIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      aria-hidden="true"
      focusable="false"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="2.5" y="5.4" width="19" height="13.2" rx="3.6" />
      <path d="M10.4 9.2 15.7 12l-5.3 2.8Z" fill="currentColor" stroke="none" />
    </svg>
  );
}

/* Klucz to `label` z content.ts — Record wymusza kompletność zestawu,
   więc dodanie kanału bez ikony nie przejdzie kompilacji. */
type ChannelLabel = (typeof contact.channels)[number]["label"];

const channelIcons: Record<ChannelLabel, ComponentType<IconProps>> = {
  Facebook: FacebookIcon,
  Instagram: InstagramIcon,
  YouTube: YouTubeIcon,
};

/* Etykiety są opisem interfejsu, wartości pochodzą wyłącznie z treści. */
const facts = [
  { label: "Termin", value: event.dateLabel },
  { label: "Miejsce", value: event.venue },
  { label: "Adres", value: event.street },
  { label: "Wstęp", value: event.admission },
];

/* Jeden idiom linku na całą stopkę. Wcześniej mieszały się tutaj trzy:
   `hover:underline` bez zmiany koloru (czyli `transition-colors`, które
   nie miało czego animować), przejście na jaśniejsze złoto i przejście
   na ciemniejsze. Kolor spoczynkowy jest teraz wspólny, więc hover
   zawsze rozjaśnia — nigdy odwrotnie. */
const footerLink =
  "text-paper/80 underline-offset-4 transition-colors duration-200 hover:text-gold-light hover:underline";

/* ============================================================
   KONTAKT I STOPKA
   ============================================================ */

export default function Contact() {
  /* Dopóki którykolwiek kanał czeka na prawdziwy adres, mówimy o tym raz —
     pod listą, a nie przy każdej pozycji z osobna. */
  const channelsPending = contact.channels.some((channel) => !channel.href);

  return (
    <Section
      id="kontakt"
      tone="lacquer"
      as="footer"
      labelledBy="kontakt-tytul"
    >
      <CloudBand className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-8 w-full text-gold opacity-25" />

      {/* Kwiaty mają własny kolor: domyślny cynober na lace zlewa się z tłem. */}
      <PlumBranch
        blossomClassName="text-gold-light"
        className="pointer-events-none absolute bottom-0 -left-10 -z-10 hidden h-44 w-60 text-gold opacity-[0.14] md:block"
      />

      <CjkGlyph className="pointer-events-none absolute -bottom-16 right-4 -z-10 hidden text-[16rem] leading-none text-gold opacity-[0.06] select-none lg:block">
        文武
      </CjkGlyph>

      <Container className="relative">
        <SectionHeading
          id="kontakt-tytul"
          eyebrow="Kontakt"
          cjk="聯絡"
          tone="lacquer"
          title={
            <>
              Napisz do <span className="text-gold">nas</span>
            </>
          }
          lead={contactCopy.lead}
        />

        <div className="mt-14 grid gap-12 sm:mt-16 lg:grid-cols-3">
          {/* ── Dane kontaktowe ───────────────────────────── */}
          <div>
            <Eyebrow tone="lacquer">Organizator</Eyebrow>

            <p className="mt-3 font-display text-xl leading-snug text-paper">
              {contact.organiser}
            </p>

            <ul className="mt-6 space-y-1">
              <li>
                <a
                  href={`mailto:${contact.email}`}
                  className={cx(
                    "inline-flex min-h-11 items-center gap-3 py-1",
                    footerLink,
                  )}
                >
                  <EnvelopeIcon className="h-4 w-4 shrink-0" />
                  <span className="break-all">{contact.email}</span>
                </a>
              </li>
              <li>
                <a
                  href={`tel:${contact.phoneHref}`}
                  className={cx(
                    "inline-flex min-h-11 items-center gap-3 py-1",
                    footerLink,
                  )}
                >
                  <PhoneIcon className="h-4 w-4 shrink-0" />
                  <span>{contact.phone}</span>
                </a>
              </li>
            </ul>

            <div className="mt-6 border-t border-gold/15 pt-5">
              <p className="text-[0.62rem] font-semibold uppercase tracking-[0.24em] text-paper/72">
                Media i patronaty
              </p>
              <a
                href={`mailto:${contact.pressEmail}`}
                className={cx(
                  "mt-1 inline-flex min-h-11 items-center gap-3 py-1",
                  footerLink,
                )}
              >
                <EnvelopeIcon className="h-4 w-4 shrink-0" />
                <span className="break-all">{contact.pressEmail}</span>
              </a>
            </div>
          </div>

          {/* ── Kanały ────────────────────────────────────── */}
          <div className="lg:border-l lg:border-gold/15 lg:pl-10">
            <Eyebrow tone="lacquer">{contactCopy.channelsTitle}</Eyebrow>

            <ul className="mt-5 space-y-2">
              {contact.channels.map((channel) => {
                const Icon = channelIcons[channel.label];
                const href = channel.href;

                /* Ta sama zawartość w obu wariantach — różni je wyłącznie to,
                   czy jest tu cokolwiek do kliknięcia. */
                const body = (
                  <>
                    <span
                      className={cx(
                        "flex h-11 w-11 shrink-0 items-center justify-center rounded-sm border border-gold/25 bg-lacquer-deep/40 text-gold-light/80",
                        href &&
                          "transition-colors duration-200 group-hover:border-gold/60 group-hover:bg-lacquer-deep/70 group-hover:text-gold-light",
                      )}
                    >
                      <Icon className="h-5 w-5" />
                    </span>
                    <span className="flex min-w-0 flex-col leading-tight">
                      <span className="text-sm font-semibold">
                        {channel.label}
                      </span>
                      <span className="truncate text-xs text-paper/72">
                        {channel.handle}
                      </span>
                    </span>
                  </>
                );

                return (
                  <li key={channel.label}>
                    {href ? (
                      <a
                        href={href}
                        className={cx(
                          "group flex items-center gap-4 rounded-sm py-1",
                          footerLink,
                        )}
                      >
                        {body}
                      </a>
                    ) : (
                      <span className="flex items-center gap-4 rounded-sm py-1 text-paper/80">
                        {body}
                      </span>
                    )}
                  </li>
                );
              })}
            </ul>

            {channelsPending && (
              <p className="mt-4 text-xs text-paper/65">
                {contact.channelsPending}
              </p>
            )}
          </div>

          {/* ── Skrót nawigacyjny i fakty ─────────────────── */}
          <div className="lg:border-l lg:border-gold/15 lg:pl-10">
            <Eyebrow tone="lacquer">{contactCopy.navTitle}</Eyebrow>

            <ul className="mt-5 grid grid-cols-2 gap-x-4">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className={cx(
                      "inline-flex min-h-9 items-center py-1 text-sm",
                      footerLink,
                    )}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>

            <dl className="mt-7 grid gap-3.5 rounded-sm border border-gold/20 bg-lacquer-deep/35 p-5">
              {facts.map((fact) => (
                <div key={fact.label}>
                  <dt className="text-[0.62rem] font-semibold uppercase tracking-[0.24em] text-gold-light/85">
                    {fact.label}
                  </dt>
                  <dd className="mt-0.5 text-sm text-paper/80">{fact.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>

        {/* ── Dolny pasek ─────────────────────────────────── */}
        <GoldRule className="mt-14 sm:mt-16" />

        <div className="flex flex-col gap-4 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <SealStamp glyph="文武" className="h-9 w-9 shrink-0 text-gold" />
            <span className="flex flex-col">
              <span className="text-sm text-paper/75">
                {event.name} · {event.subtitle}
              </span>
              {/* Rok bierzemy z daty wydarzenia, nie z zegara przeglądarki —
                  `new Date()` rozjechałoby render serwera z klientem. */}
              <span className="text-xs text-paper/65">
                © {event.dateIso.slice(0, 4)} {contact.organiser}
              </span>
            </span>
          </div>

          <div className="flex flex-col gap-3 sm:items-end">
            <p className="max-w-md text-xs italic text-paper/65">
              {contact.prototypeNote}
            </p>
            <a
              href="#hero"
              className={cx(
                "inline-flex min-h-11 items-center gap-2 py-1 text-xs uppercase tracking-widest",
                footerLink,
              )}
            >
              <ArrowUpIcon className="h-4 w-4 shrink-0" />
              <span>{contactCopy.backToTop}</span>
            </a>
          </div>
        </div>
      </Container>
    </Section>
  );
}
