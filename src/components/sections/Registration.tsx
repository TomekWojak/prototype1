"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { SealStamp } from "@/components/ornaments";
import {
  Button,
  Container,
  InkRule,
  Section,
  SectionHeading,
  cx,
} from "@/components/ui";
import { validateField } from "@/lib/registration";
import type { Content, FestivalEvent } from "@/lib/content";

type FieldName =
  "firstName" | "lastName" | "email" | "phone" | "workshop" | "consent";
type FieldConfig = {
  name: FieldName;
  label: string;
  control?: "input" | "select" | "checkbox";
  type?: "text" | "email" | "tel";
  autoComplete?: string;
  placeholder: string;
  inputMode?: "email" | "tel";
};

const fields: readonly FieldConfig[] = [
  {
    name: "firstName",
    label: "Imię",
    type: "text",
    autoComplete: "given-name",
    placeholder: "Anna",
  },
  {
    name: "lastName",
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
    name: "phone",
    label: "Numer telefonu",
    type: "tel",
    autoComplete: "tel",
    placeholder: "123 456 789",
    inputMode: "tel",
  },
  {
    name: "workshop",
    label: "Warsztat",
    control: "select",
    placeholder: "Wybierz warsztat",
  },
  /* Zgoda zostaje w tej samej tablicy, choć rysuje się osobno: dzięki temu
     obejmuje ją walidacja, podsumowanie błędów, ustawianie fokusu i — przez
     wspólne `FIELD_NAMES` — sprawdzenie po stronie serwera. */
  {
    name: "consent",
    label: "Zgoda na przetwarzanie danych",
    control: "checkbox",
    placeholder: "",
  },
];

/* Wszystko poza zgodą — ta ma własny kształt i własne miejsce, tuż nad
   przyciskiem wysyłki. */
const textFields = fields.filter((field) => field.control !== "checkbox");

function fieldId(name: FieldName) {
  return `zapisy-${name}`;
}

function errorId(name: FieldName) {
  return `${fieldId(name)}-error`;
}

const ui = {
  requiredHint: "Wszystkie pola są wymagane.",
  summaryTitle: "Nie możemy jeszcze wysłać zgłoszenia:",
  summaryHint: "Kliknij pozycję z listy, aby przejść do pola.",
  sendFailed:
    "Nie udało się wysłać zgłoszenia. Twoje dane są nadal w formularzu — spróbuj jeszcze raz za chwilę.",
  networkFailed:
    "Brak połączenia z serwerem. Sprawdź internet i spróbuj ponownie — dane zostają w formularzu.",
  whenLabel: "Termin",
  whereLabel: "Miejsce",
} as const;

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

function FieldError({ id, message }: { id: string; message: string }) {
  return (
    <p id={id} className="mt-2.5 flex items-start gap-2 text-sm text-seal">
      <AlertIcon className="mt-1 h-4 w-4 shrink-0" />
      <span>{message}</span>
    </p>
  );
}

function readFieldErrors(data: unknown): Errors | null {
  if (typeof data !== "object" || data === null) return null;

  const raw = (data as { errors?: unknown }).errors;
  if (typeof raw !== "object" || raw === null) return null;

  const source = raw as Record<string, unknown>;
  const result: Errors = {};

  for (const field of fields) {
    const message = source[field.name];
    if (typeof message === "string" && message.trim() !== "") {
      result[field.name] = message;
    }
  }

  return Object.keys(result).length > 0 ? result : null;
}

type Values = Record<FieldName, string>;
type Errors = Partial<Record<FieldName, string>>;
type Touched = Partial<Record<FieldName, boolean>>;
type Status = "idle" | "sending" | "done";

const emptyValues: Values = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  workshop: "",
  consent: "",
};

const inputBase =
  "w-full border-0 border-b border-line bg-transparent px-0 py-3.5 text-base text-ink placeholder:text-ink-faint transition-colors outline-0 focus:border-seal";
const labelClass = "block text-xs uppercase tracking-[0.18em] text-ink-muted";

export default function Registration({
  event,
  formCopy,
  workshops,
}: {
  event: FestivalEvent;
  formCopy: Content["formCopy"];
  workshops: Content["workshops"];
}) {
  const [values, setValues] = useState<Values>(emptyValues);
  const [website, setWebsite] = useState("");
  const [errors, setErrors] = useState<Errors>({});
  const [touched, setTouched] = useState<Touched>({});
  const [status, setStatus] = useState<Status>("idle");

  const [submitError, setSubmitError] = useState<string | null>(null);

  const [submitted, setSubmitted] = useState(false);

  const inputRefs = useRef<
    Partial<Record<FieldName, HTMLInputElement | HTMLSelectElement | null>>
  >({});
  const successHeadingRef = useRef<HTMLHeadingElement | null>(null);

  const refocusFirstFieldRef = useRef(false);

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

  async function handleSubmit(formEvent: FormEvent<HTMLFormElement>) {
    formEvent.preventDefault();
    if (status === "sending") return;

    const nextErrors: Errors = {};
    for (const field of fields) {
      const message = validateField(field.name, values[field.name]);
      if (message) nextErrors[field.name] = message;
    }

    setErrors(nextErrors);

    setTouched(
      Object.fromEntries(fields.map((field) => [field.name, true])) as Touched,
    );
    setSubmitted(true);

    const firstInvalid = fields.find((field) => nextErrors[field.name]);
    if (firstInvalid) {
      inputRefs.current[firstInvalid.name]?.focus();
      return;
    }

    setStatus("sending");
    setSubmitError(null);

    try {
      const response = await fetch("/api/zapisy", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...values, website }),
      });

      if (response.ok) {
        setStatus("done");
        return;
      }

      const data: unknown = await response.json().catch(() => null);
      const fieldErrors = readFieldErrors(data);

      if (fieldErrors) {
        setErrors(fieldErrors);
        const firstFromServer = fields.find((field) => fieldErrors[field.name]);
        if (firstFromServer) inputRefs.current[firstFromServer.name]?.focus();
        return;
      }

      setSubmitError(ui.sendFailed);
    } catch {
      setSubmitError(ui.networkFailed);
    } finally {
      setStatus((current) => (current === "sending" ? "idle" : current));
    }
  }

  function handleReset() {
    setValues(emptyValues);
    setErrors({});
    setSubmitError(null);
    setTouched({});
    setSubmitted(false);
    refocusFirstFieldRef.current = true;
    setStatus("idle");
    setWebsite("");
  }

  function renderField(field: FieldConfig) {
    const message = errors[field.name];
    const describedBy = errorId(field.name);

    return (
      <div key={field.name}>
        <label className={labelClass} htmlFor={fieldId(field.name)}>
          {field.label}{" "}
          <span aria-hidden="true" className="text-seal">
            *
          </span>
        </label>
        {field.control === "select" ? (
          <div className="relative">
            <select
              ref={(node) => {
                inputRefs.current[field.name] = node;
              }}
              id={fieldId(field.name)}
              name={field.name}
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
                "appearance-none pr-8",

                values[field.name] === "" && "text-ink-faint",
                message && "border-seal",
              )}
            >
              <option disabled value="">
                {field.placeholder}
              </option>
              {workshops.map((workshop) => (
                <option key={workshop.title} value={workshop.title}>
                  {workshop.title}
                </option>
              ))}
            </select>

            <svg
              viewBox="0 0 14 14"
              aria-hidden="true"
              focusable="false"
              className="pointer-events-none absolute top-1/2 right-1 h-3.5 w-3.5 -translate-y-1/2 text-ink-faint"
            >
              <path
                d="M2 5 L7 9.8 L12 5"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.7"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        ) : (
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
            className={cx(inputBase, message && "border-seal")}
          />
        )}
        {message && <FieldError id={describedBy} message={message} />}
      </div>
    );
  }

  const invalidFields = fields.filter((field) => errors[field.name]);
  const showSummary = submitted && invalidFields.length > 0;

  return (
    <Section id="zapisy" tone="paper" labelledBy="zapisy-tytul">
      <Container>
        <div className="grid gap-16 lg:grid-cols-2 lg:gap-20">
          <div>
            <SectionHeading
              id="zapisy-tytul"
              eyebrow={formCopy.eyebrow}
              title={formCopy.title}
              lead={formCopy.lead}
            />

            <h3 className="mt-20 text-2xl">{formCopy.stepsTitle}</h3>

            <ol className="mt-8">
              {formCopy.steps.map((step, index) => (
                <li key={step.title}>
                  <InkRule />
                  <div className="flex gap-6 py-7">
                    <span
                      aria-hidden="true"
                      className="w-6 shrink-0 text-sm text-seal"
                    >
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <p className="text-base font-bold text-ink">
                        {step.title}
                      </p>
                      <p className="mt-2 text-base text-ink-muted">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </li>
              ))}
            </ol>

            <InkRule />

            <dl className="mt-8 flex flex-col gap-3 text-sm text-ink-muted sm:flex-row sm:gap-12">
              <div className="flex gap-3">
                <dt className="text-ink-faint">{ui.whenLabel}</dt>
                <dd className="text-ink-soft">{event.date}</dd>
              </div>
              <div className="flex gap-3">
                <dt className="text-ink-faint">{ui.whereLabel}</dt>
                <dd className="text-ink-soft">{event.venue}</dd>
              </div>
            </dl>
          </div>

          <div>
            <p aria-live="polite" className="sr-only">
              {status === "done"
                ? `${formCopy.successTitle}. ${formCopy.successBody}`
                : ""}
            </p>

            {status === "done" ? (
              <div>
                <SealStamp glyph="成" className="h-16 w-16 text-seal" />
                <h3
                  ref={successHeadingRef}
                  tabIndex={-1}
                  className="mt-8 text-3xl"
                >
                  {formCopy.successTitle}
                </h3>
                <p className="mt-5 max-w-md text-base text-ink-muted">
                  {formCopy.successBody}
                </p>
                <Button
                  type="button"
                  variant="outline"
                  size="md"
                  onClick={handleReset}
                  className="mt-10"
                >
                  {formCopy.againLabel}
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate>
                <p className="text-sm text-ink-muted">
                  <span aria-hidden="true" className="text-seal">
                    *
                  </span>{" "}
                  {ui.requiredHint}
                </p>

                {showSummary && (
                  <div role="alert" className="mt-8 border-t border-seal pt-6">
                    <p className="flex items-start gap-2 text-sm font-bold text-seal">
                      <AlertIcon className="mt-1 h-4 w-4 shrink-0" />
                      <span>{ui.summaryTitle}</span>
                    </p>
                    <ul className="mt-3 flex flex-col gap-2 pl-6">
                      {invalidFields.map((field) => (
                        <li key={field.name}>
                          <button
                            type="button"
                            onClick={() =>
                              inputRefs.current[field.name]?.focus()
                            }
                            className="text-left text-sm text-ink-soft underline decoration-line underline-offset-4 transition-colors hover:text-seal hover:decoration-seal"
                          >
                            {field.label} — {errors[field.name]}
                          </button>
                        </li>
                      ))}
                    </ul>
                    <p className="mt-3 pl-6 text-sm text-ink-faint">
                      {ui.summaryHint}
                    </p>
                  </div>
                )}

                <div className="mt-10 space-y-8">
                  <div className="grid gap-8 sm:grid-cols-2">
                    {textFields.slice(0, 2).map(renderField)}
                  </div>
                  {textFields.slice(2).map(renderField)}
                </div>
                {/* ZGODA NA PRZETWARZANIE DANYCH
                    Pole wyboru rysowane osobno, bo ma inny kształt niż pola
                    tekstowe — ale zostaje w tablicy `fields`, więc obejmuje je
                    walidacja, podsumowanie błędów i sprawdzenie na serwerze. */}
                {(() => {
                  const message = errors.consent;
                  const describedBy = errorId("consent");

                  return (
                    <div className="mt-10">
                      <div className="flex items-start gap-3">
                        <input
                          ref={(node) => {
                            inputRefs.current.consent = node;
                          }}
                          id={fieldId("consent")}
                          name="consent"
                          type="checkbox"
                          checked={values.consent === "true"}
                          onChange={(changeEvent) =>
                            handleChange(
                              "consent",
                              changeEvent.target.checked ? "true" : "",
                            )
                          }
                          onBlur={() => handleBlur("consent")}
                          aria-invalid={message ? "true" : undefined}
                          aria-describedby={message ? describedBy : undefined}
                          className={cx(
                            "mt-1 h-4 w-4 shrink-0 accent-seal",
                            message && "outline outline-seal",
                          )}
                        />
                        <label
                          htmlFor={fieldId("consent")}
                          className="text-sm text-ink-muted"
                        >
                          {formCopy.consentLabel}{" "}
                          <span aria-hidden="true" className="text-seal">
                            *
                          </span>{" "}
                          {formCopy.consentUrl ? (
                            <>
                              Szczegóły w naszej{" "}
                              <a
                                href={formCopy.consentUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="underline decoration-line underline-offset-4 transition-colors hover:text-seal hover:decoration-seal"
                              >
                                {formCopy.consentLinkLabel}
                              </a>
                              <span className="sr-only">
                                {" "}
                                (otwiera się w nowej karcie)
                              </span>
                              .
                            </>
                          ) : null}
                        </label>
                      </div>
                      {message && (
                        <FieldError id={describedBy} message={message} />
                      )}
                    </div>
                  );
                })()}

                <div
                  aria-hidden="true"
                  className="absolute left-[-9999px] h-0 w-0 overflow-hidden"
                >
                  <label htmlFor="zapisy-website">Strona internetowa</label>
                  <input
                    id="zapisy-website"
                    name="website"
                    type="text"
                    tabIndex={-1}
                    autoComplete="off"
                    value={website}
                    onChange={(e) => setWebsite(e.target.value)}
                  />
                </div>
                {submitError && (
                  <p
                    role="alert"
                    className="mt-10 flex items-start gap-2 border-t border-seal pt-6 text-sm text-seal"
                  >
                    <AlertIcon className="mt-1 h-4 w-4 shrink-0" />
                    <span>{submitError}</span>
                  </p>
                )}

                <div className="mt-12">
                  <Button
                    type="submit"
                    variant="solid"
                    size="lg"
                    className="w-full"
                    disabled={status === "sending"}
                    aria-busy={status === "sending" ? "true" : undefined}
                  >
                    {status === "sending"
                      ? formCopy.submitting
                      : formCopy.submit}
                  </Button>
                </div>
              </form>
            )}
          </div>
        </div>
      </Container>
    </Section>
  );
}
