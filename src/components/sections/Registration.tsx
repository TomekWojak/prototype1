"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { InkSun, MeanderCorner, SealStamp } from "@/components/ornaments";
import { Button, Container, Section, SectionHeading, cx } from "@/components/ui";
import { event, formCopy } from "@/lib/content";

/* ============================================================
   POLA FORMULARZA
   Klient zamówił dokładnie cztery pola — konfiguracja siedzi w jednej
   tablicy, żeby walidacja, kolejność ustawiania fokusu i kolejność
   w podsumowaniu błędów nie mogły się nigdy rozjechać.
   ============================================================ */

type FieldName = "imie" | "nazwisko" | "email" | "telefon";

type FieldConfig = {
  name: FieldName;
  label: string;
  type: "text" | "email" | "tel";
  autoComplete: string;
  placeholder: string;
  inputMode?: "email" | "tel";
};

const fields: readonly FieldConfig[] = [
  {
    name: "imie",
    label: "Imię",
    type: "text",
    autoComplete: "given-name",
    placeholder: "Anna",
  },
  {
    name: "nazwisko",
    label: "Nazwisko",
    type: "text",
    autoComplete: "family-name",
    placeholder: "Kowalska",
  },
  {
    name: "email",
    label: "Adres e-mail",
    type: "email",
    autoComplete: "email",
    placeholder: "anna.kowalska@poczta.pl",
    inputMode: "email",
  },
  {
    name: "telefon",
    label: "Numer telefonu",
    type: "tel",
    autoComplete: "tel",
    placeholder: "123 456 789",
    inputMode: "tel",
  },
];

/* Identyfikatory w jednej przestrzeni nazw. `id="imie"` było identyfikatorem
   GLOBALNYM — na jednej stronie z innymi formularzami kolidowałoby po cichu,
   a komunikaty błędów były już przestrzenione („zapisy-imie-blad”). Atrybut
   `name` zostaje bez prefiksu, bo to on trafia do danych zgłoszenia. */
function fieldId(name: FieldName) {
  return `zapisy-${name}`;
}

function errorId(name: FieldName) {
  return `${fieldId(name)}-blad`;
}

/* Etykiety interfejsu, których nie ma w content.ts — trzymane w jednym
   obiekcie, żeby tłumacz albo korektor nie musiał szukać ich po JSX. */
const ui = {
  requiredHint: "Wszystkie pola są wymagane.",
  requiredMark: "pole wymagane",
  summaryTitle: "Nie możemy jeszcze wysłać zgłoszenia:",
  summaryHint: "Kliknij pozycję z listy, aby przejść do pola.",
  howTitle: "Jak to działa",
  whenLabel: "Termin",
  whereLabel: "Miejsce",
} as const;

/* Trzy kroki w jednym trybie — oznajmującym. Wcześniej pierwszy krok
   rozkazywał („Wypełnij formularz”), a dwa kolejne opowiadały, przez co
   lista czytała się jak sklejona z dwóch różnych tekstów. */
const steps = [
  {
    title: "Wypełniasz formularz",
    body: "Cztery pola i jedno kliknięcie. Wybór konkretnego warsztatu ustalamy w odpowiedzi.",
  },
  {
    title: "Dostajesz potwierdzenie e-mailem",
    body: "W ciągu dwóch dni roboczych piszemy z terminem, salą i listą rzeczy do zabrania.",
  },
  {
    title: "Przychodzisz 15 minut przed startem",
    body: "Tyle wystarczy na przebranie się i spokojne zajęcie miejsca na macie.",
  },
] as const;

/* ============================================================
   WALIDACJA
   Wzorzec e-maila jest celowo luźny: zadaniem formularza jest wyłapać
   literówkę, a nie orzekać o zgodności ze specyfikacją adresów.
   ============================================================ */

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[A-Za-z]{2,}$/;

function validateField(name: FieldName, raw: string): string | null {
  const value = raw.trim();

  if (value.length === 0) return "To pole jest wymagane.";

  if (name === "imie" || name === "nazwisko") {
    if (value.length < 2) return "Podaj co najmniej 2 znaki.";
    return null;
  }

  if (name === "email") {
    if (!EMAIL_PATTERN.test(value)) return "Podaj poprawny adres e-mail.";
    return null;
  }

  // Telefon: ludzie zapisują numery na dziesięć sposobów, więc najpierw
  // sprowadzamy zapis do samych cyfr, a dopiero potem liczymy.
  const compact = value.replace(/[\s\-().]/g, "");
  const national = compact.startsWith("+48")
    ? compact.slice(3)
    : compact.startsWith("0048")
      ? compact.slice(4)
      : compact;

  if (!/^\d{9}$/.test(national)) {
    return "Podaj numer w formacie 123 456 789 lub +48 123 456 789.";
  }

  return null;
}

/* ============================================================
   IKONY — rysowane inline, bo są maleńkie i zależne od kontekstu
   ============================================================ */

function AlertIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 16 16"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      <circle
        cx="8"
        cy="8"
        r="6.9"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.4"
      />
      <path
        d="M8 4.2 L8 9"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
      <circle cx="8" cy="11.6" r="1" fill="currentColor" />
    </svg>
  );
}

function CalendarIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 20 20"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      <g fill="none" stroke="currentColor" strokeWidth="1.4">
        <rect x="2.6" y="4.4" width="14.8" height="13" rx="1.6" />
        <path d="M2.6 8.4 H17.4" />
        <path d="M6.6 2.6 V5.6" strokeLinecap="round" />
        <path d="M13.4 2.6 V5.6" strokeLinecap="round" />
      </g>
      <circle cx="7" cy="12" r="1.1" fill="currentColor" />
      <circle cx="13" cy="12" r="1.1" fill="currentColor" />
    </svg>
  );
}

function PinIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 20 20"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      <path
        d="M10 18 C10 18 16 11.6 16 8 A6 6 0 1 0 4 8 C4 11.6 10 18 10 18 Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
      <circle cx="10" cy="8" r="2.2" fill="currentColor" />
    </svg>
  );
}

/* ============================================================
   KOMUNIKAT BŁĘDU
   Kolor nie może być jedynym nośnikiem informacji — dlatego obok
   czerwieni zawsze stoi znak wykrzyknika i pełne zdanie.
   ============================================================ */

function FieldError({ id, message }: { id: string; message: string }) {
  return (
    <p
      id={id}
      className="mt-2 flex items-start gap-1.5 text-[0.8rem] leading-snug text-seal"
    >
      <AlertIcon className="mt-0.5 h-4 w-4 shrink-0" />
      <span>{message}</span>
    </p>
  );
}

/* ============================================================
   SEKCJA
   ============================================================ */

type Values = Record<FieldName, string>;
type Errors = Partial<Record<FieldName, string>>;
type Touched = Partial<Record<FieldName, boolean>>;
type Status = "idle" | "sending" | "done";

const emptyValues: Values = { imie: "", nazwisko: "", email: "", telefon: "" };

/* Bez `focus:outline-none`: globalny wskaźnik fokusu z globals.css ma zostać.
   Pierścień jest dodatkiem do obrysu, więc dostaje pełne krycie — wersja
   `ring-vermilion/25` dawała 1,43:1 i nie zastępowała niczego.
   `placeholder:text-ink-muted` zamiast `ink-faint`: 2,08:1 → 5,6:1. */
const inputBase =
  "w-full rounded-sm bg-paper px-4 py-3.5 text-ink placeholder:text-ink-muted transition-colors focus:border-vermilion focus:ring-2 focus:ring-vermilion";
const labelClass =
  "mb-2 block text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-ink-soft";

export default function Registration() {
  const [values, setValues] = useState<Values>(emptyValues);
  const [errors, setErrors] = useState<Errors>({});
  const [touched, setTouched] = useState<Touched>({});
  const [status, setStatus] = useState<Status>("idle");
  /* Osobna flaga, bo zbiorcze podsumowanie ma się pojawiać po próbie
     wysłania, a nie po samym opuszczeniu pierwszego pola. */
  const [submitted, setSubmitted] = useState(false);

  const inputRefs = useRef<Partial<Record<FieldName, HTMLInputElement | null>>>(
    {},
  );
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const successHeadingRef = useRef<HTMLHeadingElement | null>(null);
  /* Fokus po resecie da się ustawić dopiero, gdy formularz wróci do drzewa —
     dlatego intencja czeka w refie, a wykonuje ją efekt po przemalowaniu. */
  const refocusFirstFieldRef = useRef(false);

  // Symulowane wysyłanie kończy się po chwili — timer nie może przeżyć
  // odmontowania sekcji, bo ustawiałby stan nieistniejącego komponentu.
  useEffect(() => {
    return () => {
      if (timerRef.current !== null) clearTimeout(timerRef.current);
    };
  }, []);

  /* Po wysłaniu formularz znika z drzewa razem z fokusowanym przyciskiem,
     a fokus spada na `body` — użytkownik klawiatury zaczyna wtedy od nowa
     od góry strony. Przenosimy go na nagłówek potwierdzenia, a po resecie
     z powrotem na pierwsze pole. */
  useEffect(() => {
    if (status === "done") {
      successHeadingRef.current?.focus();
      return;
    }

    if (status === "idle" && refocusFirstFieldRef.current) {
      refocusFirstFieldRef.current = false;
      const first = fields[0];
      if (first) inputRefs.current[first.name]?.focus();
    }
  }, [status]);

  function handleChange(name: FieldName, value: string) {
    setValues((prev) => ({ ...prev, [name]: value }));

    // Błąd gaśnie w trakcie poprawiania, ale tylko dla pola już dotkniętego.
    if (!touched[name]) return;
    setErrors((prev) => {
      const next: Errors = { ...prev };
      const message = validateField(name, value);
      if (message) next[name] = message;
      else delete next[name];
      return next;
    });
  }

  function handleBlur(name: FieldName) {
    setTouched((prev) => ({ ...prev, [name]: true }));
    setErrors((prev) => {
      const next: Errors = { ...prev };
      const message = validateField(name, values[name]);
      if (message) next[name] = message;
      else delete next[name];
      return next;
    });
  }

  function handleSubmit(formEvent: FormEvent<HTMLFormElement>) {
    formEvent.preventDefault();
    if (status === "sending") return;

    const nextErrors: Errors = {};
    for (const field of fields) {
      const message = validateField(field.name, values[field.name]);
      if (message) nextErrors[field.name] = message;
    }

    setErrors(nextErrors);
    setTouched({ imie: true, nazwisko: true, email: true, telefon: true });
    setSubmitted(true);

    const firstInvalid = fields.find((field) => nextErrors[field.name]);
    if (firstInvalid) {
      inputRefs.current[firstInvalid.name]?.focus();
      return;
    }

    setStatus("sending");
    timerRef.current = setTimeout(() => {
      timerRef.current = null;
      setStatus("done");
    }, 900);
  }

  function handleReset() {
    if (timerRef.current !== null) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    setValues(emptyValues);
    setErrors({});
    setTouched({});
    setSubmitted(false);
    refocusFirstFieldRef.current = true;
    setStatus("idle");
  }

  const invalidFields = fields.filter((field) => errors[field.name]);
  const showSummary = submitted && invalidFields.length > 0;

  return (
    <Section id="zapisy" tone="paper" labelledBy="zapisy-tytul">
      <InkSun className="pointer-events-none absolute top-10 -right-24 -z-10 h-80 w-80 text-vermilion opacity-[0.07]" />

      <Container>
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          {/* ── Lewa kolumna: nagłówek, trzy kroki, przypomnienie ── */}
          <div className="flex flex-col gap-10">
            <SectionHeading
              id="zapisy-tytul"
              eyebrow={formCopy.eyebrow}
              cjk="報名"
              title={formCopy.title}
              lead={formCopy.lead}
              tone="paper"
            />

            <div>
              <h3 className="font-display text-2xl text-ink sm:text-3xl">
                {ui.howTitle}
              </h3>

              <ol className="mt-6 flex flex-col gap-5">
                {steps.map((step, index) => (
                  <li key={step.title} className="flex gap-4">
                    <span
                      aria-hidden="true"
                      className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-seal/30 bg-paper-warm/70 font-display text-base text-seal"
                    >
                      {index + 1}
                    </span>
                    <div>
                      <p className="font-semibold text-ink">{step.title}</p>
                      <p className="mt-1 text-sm leading-relaxed text-ink-muted">
                        {step.body}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>

            <dl className="flex flex-col gap-4 border-t border-ink/10 pt-6 sm:flex-row sm:gap-10">
              <div className="flex items-start gap-3">
                <CalendarIcon className="mt-0.5 h-5 w-5 shrink-0 text-vermilion" />
                <div>
                  <dt className="text-[0.68rem] font-semibold tracking-[0.22em] text-ink-muted uppercase">
                    {ui.whenLabel}
                  </dt>
                  <dd className="mt-1 text-sm font-semibold text-ink">
                    {event.dateLabel}
                  </dd>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <PinIcon className="mt-0.5 h-5 w-5 shrink-0 text-vermilion" />
                <div>
                  <dt className="text-[0.68rem] font-semibold tracking-[0.22em] text-ink-muted uppercase">
                    {ui.whereLabel}
                  </dt>
                  <dd className="mt-1 text-sm font-semibold text-ink">
                    {event.venue}
                  </dd>
                </div>
              </div>
            </dl>
          </div>

          {/* ── Prawa kolumna: karta formularza ── */}
          <div className="relative isolate overflow-hidden rounded-sm border border-ink/12 bg-paper-warm p-7 shadow-lift sm:p-10">
            <MeanderCorner className="pointer-events-none absolute -top-1 -left-1 h-10 w-10 text-vermilion/25" />
            <MeanderCorner className="pointer-events-none absolute -right-1 -bottom-1 h-10 w-10 rotate-180 text-vermilion/25" />

            {/* Region live zamontowany NA STAŁE, poza gałęzią warunkową.
                Wcześniej `role="status"` pojawiał się w drzewie razem ze swoją
                treścią, a czytnik ekranu ogłasza tylko zmiany w regionie, który
                już zna — komunikat przepadał. Teraz pusty akapit czeka od
                początku i dopiero dostaje tekst. */}
            <p aria-live="polite" className="sr-only">
              {status === "done"
                ? `${formCopy.successTitle}. ${formCopy.successBody}`
                : ""}
            </p>

            {status === "done" ? (
              <div className="flex flex-col items-center gap-5 py-6 text-center">
                <SealStamp glyph="成" className="h-20 w-20 text-seal" />
                <h3
                  ref={successHeadingRef}
                  tabIndex={-1}
                  className="font-display text-2xl text-ink sm:text-3xl"
                >
                  {formCopy.successTitle}
                </h3>
                <p className="max-w-md leading-relaxed text-ink-soft">
                  {formCopy.successBody}
                </p>
                <Button
                  type="button"
                  variant="outline"
                  size="md"
                  onClick={handleReset}
                  className="mt-1"
                >
                  {formCopy.againLabel}
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate>
                <p className="text-[0.78rem] text-ink-soft">
                  <span aria-hidden="true" className="text-seal">
                    *
                  </span>{" "}
                  {ui.requiredHint}
                </p>

                {showSummary && (
                  <div
                    role="alert"
                    className="mt-5 rounded-sm border border-seal/35 bg-paper-blush/60 p-4"
                  >
                    <p className="flex items-start gap-2 text-sm font-semibold text-seal">
                      <AlertIcon className="mt-0.5 h-4 w-4 shrink-0" />
                      <span>{ui.summaryTitle}</span>
                    </p>
                    <ul className="mt-2 flex flex-col gap-1 pl-6">
                      {invalidFields.map((field) => (
                        <li key={field.name}>
                          <button
                            type="button"
                            onClick={() =>
                              inputRefs.current[field.name]?.focus()
                            }
                            className="text-left text-sm text-ink-soft underline decoration-seal/40 underline-offset-4 transition-colors hover:text-seal hover:decoration-seal"
                          >
                            {field.label} — {errors[field.name]}
                          </button>
                        </li>
                      ))}
                    </ul>
                    <p className="mt-2 pl-6 text-[0.75rem] text-ink-soft">
                      {ui.summaryHint}
                    </p>
                  </div>
                )}

                <div className="mt-6 grid gap-5 sm:grid-cols-2">
                  {fields.slice(0, 2).map((field) => {
                    const message = errors[field.name];
                    const describedBy = errorId(field.name);
                    return (
                      <div key={field.name}>
                        <label
                          className={labelClass}
                          htmlFor={fieldId(field.name)}
                        >
                          {field.label}{" "}
                          <span aria-hidden="true" className="text-seal">
                            *
                          </span>
                        </label>
                        <input
                          ref={(node) => {
                            inputRefs.current[field.name] = node;
                          }}
                          id={fieldId(field.name)}
                          name={field.name}
                          type={field.type}
                          autoComplete={field.autoComplete}
                          placeholder={field.placeholder}
                          required
                          value={values[field.name]}
                          onChange={(changeEvent) =>
                            handleChange(field.name, changeEvent.target.value)
                          }
                          onBlur={() => handleBlur(field.name)}
                          aria-invalid={message ? "true" : undefined}
                          aria-describedby={message ? describedBy : undefined}
                          className={cx(
                            inputBase,
                            message
                              ? "border border-seal ring-1 ring-seal/30"
                              : "border border-ink/45",
                          )}
                        />
                        {message && (
                          <FieldError id={describedBy} message={message} />
                        )}
                      </div>
                    );
                  })}
                </div>

                <div className="mt-5 flex flex-col gap-5">
                  {fields.slice(2).map((field) => {
                    const message = errors[field.name];
                    const describedBy = errorId(field.name);
                    return (
                      <div key={field.name}>
                        <label
                          className={labelClass}
                          htmlFor={fieldId(field.name)}
                        >
                          {field.label}{" "}
                          <span aria-hidden="true" className="text-seal">
                            *
                          </span>
                        </label>
                        <input
                          ref={(node) => {
                            inputRefs.current[field.name] = node;
                          }}
                          id={fieldId(field.name)}
                          name={field.name}
                          type={field.type}
                          inputMode={field.inputMode}
                          autoComplete={field.autoComplete}
                          placeholder={field.placeholder}
                          required
                          value={values[field.name]}
                          onChange={(changeEvent) =>
                            handleChange(field.name, changeEvent.target.value)
                          }
                          onBlur={() => handleBlur(field.name)}
                          aria-invalid={message ? "true" : undefined}
                          aria-describedby={message ? describedBy : undefined}
                          className={cx(
                            inputBase,
                            message
                              ? "border border-seal ring-1 ring-seal/30"
                              : "border border-ink/45",
                          )}
                        />
                        {message && (
                          <FieldError id={describedBy} message={message} />
                        )}
                      </div>
                    );
                  })}
                </div>

                <div className="mt-8">
                  <Button
                    type="submit"
                    variant="solid"
                    size="lg"
                    className="w-full"
                    disabled={status === "sending"}
                    aria-busy={status === "sending" ? "true" : undefined}
                  >
                    {status === "sending" ? formCopy.submitting : formCopy.submit}
                  </Button>
                </div>
              </form>
            )}

            <p className="mt-6 border-t border-ink/10 pt-5 text-center text-[0.78rem] leading-relaxed text-ink-soft italic">
              {formCopy.prototypeNote}
            </p>
          </div>
        </div>
      </Container>
    </Section>
  );
}
