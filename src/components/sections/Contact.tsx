import type { ComponentType } from "react";

import { SealStamp } from "@/components/ornaments";
import {
  Container,
  cx,
  Eyebrow,
  InkRule,
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
      strokeWidth="1.5"
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
      strokeWidth="1.5"
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
      strokeWidth="1.6"
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
      strokeWidth="1.5"
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
      strokeWidth="1.5"
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
      strokeWidth="1.5"
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

/* Jeden idiom linku na całą stopkę: kolor spoczynkowy dobiera miejsce,
   ale reakcja na kursor jest wszędzie ta sama — czerwień pieczęci
   i podkreślenie. Wcześniej mieszały się tutaj trzy różne wzorce. */
const footerLink =
  "underline-offset-4 transition-colors duration-200 hover:text-seal hover:underline";

/* Etykieta nad małym blokiem informacji — kapitaliki, szarość, rozstrzelenie.
   Powtarza się w trzech miejscach, więc stoi w jednym. */
const microLabel = "text-xs uppercase tracking-[0.18em] text-ink-faint";

/* ============================================================
   KONTAKT I STOPKA

   Sekcja była wcześniej ciemną laką ze złotem — jedyną taką na stronie.
   Domknięcie serwisu czarnym pasem to odruch z szablonów; tutaj stopka
   jest tym samym białym papierem co reszta, a od treści oddziela ją
   wyłącznie cienka kreska.
   ============================================================ */

export default function Contact() {
  return (
    <Section id="kontakt" tone="paper" as="footer" labelledBy="kontakt-tytul">
      <Container>
        <SectionHeading
          id="kontakt-tytul"
          eyebrow="Kontakt"
          title={
            <>
              Napisz do <span className="text-seal">nas</span>
            </>
          }
          lead={contactCopy.lead}
        />

        <div className="mt-20 grid gap-14 lg:grid-cols-3">
          {/* ── Dane kontaktowe ───────────────────────────── */}
          <div>
            <Eyebrow>Organizator</Eyebrow>

            <p className="mt-5 font-display text-xl text-ink">
              {contact.organiser}
            </p>

            <ul className="mt-6 space-y-1">
              <li>
                <a
                  href={`mailto:${contact.email}`}
                  className={cx(
                    "inline-flex min-h-11 items-center gap-3 text-base text-ink-soft",
                    footerLink,
                  )}
                >
                  <EnvelopeIcon className="h-5 w-5 shrink-0 text-ink-faint" />
                  <span className="break-all">{contact.email}</span>
                </a>
              </li>
              <li>
                <a
                  href={`tel:${contact.phoneHref}`}
                  className={cx(
                    "inline-flex min-h-11 items-center gap-3 text-base text-ink-soft",
                    footerLink,
                  )}
                >
                  <PhoneIcon className="h-5 w-5 shrink-0 text-ink-faint" />
                  <span>{contact.phone}</span>
                </a>
              </li>
            </ul>

            <div className="mt-10">
              <p className={microLabel}>Media i patronaty</p>
              <a
                href={`mailto:${contact.pressEmail}`}
                className={cx(
                  "mt-1 inline-flex min-h-11 items-center gap-3 text-base text-ink-soft",
                  footerLink,
                )}
              >
                <EnvelopeIcon className="h-5 w-5 shrink-0 text-ink-faint" />
                <span className="break-all">{contact.pressEmail}</span>
              </a>
            </div>
          </div>

          {/* ── Kanały ────────────────────────────────────────
              Adresy profili jeszcze nie istnieją (`href: null`), więc pozycje
              są tekstem, a nie linkami prowadzącymi donikąd. Powód mówimy raz,
              pod listą — nie przy każdej pozycji z osobna. */}
          <div>
            <Eyebrow>{contactCopy.channelsTitle}</Eyebrow>

            <ul className="mt-6 space-y-4">
              {contact.channels.map((channel) => {
                const Icon = channelIcons[channel.label];

                return (
                  <li key={channel.label} className="flex items-center gap-4">
                    <Icon className="h-5 w-5 shrink-0 text-ink-faint" />
                    <span className="text-base text-ink-soft">
                      {channel.label}
                    </span>
                    <span className="truncate text-xs text-ink-faint">
                      {channel.handle}
                    </span>
                  </li>
                );
              })}
            </ul>

            <p className="mt-6 text-xs text-ink-faint">
              {contact.channelsPending}
            </p>
          </div>

          {/* ── Skrót nawigacyjny i fakty ─────────────────── */}
          <div>
            <Eyebrow>{contactCopy.navTitle}</Eyebrow>

            <ul className="mt-6 space-y-2">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className={cx("text-base text-ink-muted", footerLink)}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>

            <dl className="mt-10 space-y-5">
              {facts.map((fact) => (
                <div key={fact.label}>
                  <dt className={microLabel}>{fact.label}</dt>
                  <dd className="mt-1 text-base text-ink-soft">{fact.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>

        {/* ── Dolny pasek ─────────────────────────────────── */}
        <InkRule className="mt-20" />

        <div className="flex flex-col gap-4 pt-10 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <SealStamp glyph="文武" className="h-10 w-10 shrink-0 text-seal" />
            <span className="flex flex-col">
              <span className="text-sm text-ink-muted">
                {event.name} · {event.subtitle}
              </span>
              {/* Rok bierzemy z daty wydarzenia, nie z zegara przeglądarki —
                  `new Date()` rozjechałoby render serwera z klientem. */}
              <span className="text-xs text-ink-faint">
                © {event.dateIso.slice(0, 4)} {contact.organiser}
              </span>
            </span>
          </div>

          <div className="flex flex-col gap-3 sm:items-end">
            <p className="max-w-sm text-xs text-ink-faint sm:text-right">
              {contact.prototypeNote}
            </p>
            <a
              href="#hero"
              className={cx(
                "inline-flex min-h-11 items-center gap-2 text-xs tracking-[0.18em] text-ink-muted uppercase",
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
