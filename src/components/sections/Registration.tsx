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
   IKONA — rysowana inline, bo jest maleńka i zależna od kontekstu
   ============================================================ */

function AlertIcon({ className }: { className?: string }) {
	return (
		<svg
			viewBox="0 0 16 16"
			className={className}
			aria-hidden="true"
			focusable="false">
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

/* ============================================================
   KOMUNIKAT BŁĘDU
   Kolor nie może być jedynym nośnikiem informacji — dlatego obok
   czerwieni zawsze stoi znak wykrzyknika i pełne zdanie.
   ============================================================ */

function FieldError({ id, message }: { id: string; message: string }) {
	return (
		<p id={id} className="mt-2.5 flex items-start gap-2 text-sm text-seal">
			<AlertIcon className="mt-1 h-4 w-4 shrink-0" />
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

/* Pole to linia, nie ramka. Cała ozdoba inputu sprowadza się do jednej
   kreski u dołu, która na fokusie zmienia kolor na pieczęć — obrys
   `:focus-visible` z globals.css zostaje nietknięty, bo to on niesie
   informację o fokusie dla osób korzystających z klawiatury. */
const inputBase =
	"w-full border-0 border-b border-line bg-transparent px-0 py-3.5 text-base text-ink placeholder:text-ink-faint transition-colors focus:border-seal";
const labelClass =
	"block text-xs uppercase tracking-[0.18em] text-ink-muted";

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

	/* Zwykła funkcja, nie komponent zagnieżdżony: gdyby to był komponent
	   definiowany w ciele `Registration`, React montowałby inputy od nowa
	   przy każdym naciśnięciu klawisza i fokus uciekałby z pola. */
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
					{/* ── Lewa kolumna: nagłówek, trzy kroki, przypomnienie ── */}
					<div>
						<SectionHeading
							id="zapisy-tytul"
							eyebrow={formCopy.eyebrow}
							title={formCopy.title}
							lead={formCopy.lead}
						/>

						<h3 className="mt-20 text-2xl">{ui.howTitle}</h3>

						<ol className="mt-8">
							{steps.map((step, index) => (
								<li key={step.title}>
									<InkRule />
									<div className="flex gap-6 py-7">
										<span aria-hidden="true" className="w-6 shrink-0 text-sm text-seal">
											{String(index + 1).padStart(2, "0")}
										</span>
										<div>
											<p className="text-base font-bold text-ink">
												{step.title}
											</p>
											<p className="mt-2 text-base text-ink-muted">
												{step.body}
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
								<dd className="text-ink-soft">{event.dateLabel}</dd>
							</div>
							<div className="flex gap-3">
								<dt className="text-ink-faint">{ui.whereLabel}</dt>
								<dd className="text-ink-soft">{event.venue}</dd>
							</div>
						</dl>
					</div>

					{/* ── Prawa kolumna: formularz. Bez karty, bez ramki, bez tła —
					    to po prostu kolumna pól na białym papierze. ── */}
					<div>
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
							<div>
								<SealStamp glyph="成" className="h-16 w-16 text-seal" />
								<h3
									ref={successHeadingRef}
									tabIndex={-1}
									className="mt-8 text-3xl">
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
									className="mt-10">
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
														className="text-left text-sm text-ink-soft underline decoration-line underline-offset-4 transition-colors hover:text-seal hover:decoration-seal">
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
										{fields.slice(0, 2).map(renderField)}
									</div>
									{fields.slice(2).map(renderField)}
								</div>

								<div className="mt-12">
									<Button
										type="submit"
										variant="solid"
										size="lg"
										className="w-full"
										disabled={status === "sending"}
										aria-busy={status === "sending" ? "true" : undefined}>
										{status === "sending"
											? formCopy.submitting
											: formCopy.submit}
									</Button>
								</div>
							</form>
						)}

						<p className="mt-10 text-sm text-ink-faint">
							{formCopy.prototypeNote}
						</p>
					</div>
				</div>
			</Container>
		</Section>
	);
}
