import type {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  ReactNode,
} from "react";
import { BrushUnderline, MeanderCorner } from "@/components/ornaments";

/* ============================================================
   NARZĘDZIE — łączenie klas bez zewnętrznej biblioteki
   ============================================================ */

export function cx(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ");
}

/* ============================================================
   TON SEKCJI
   Cztery materiały, nie cztery „kolory”. Ton decyduje o tle,
   kolorze tekstu i o tym, czy ornamenty świecą złotem czy tuszem.
   ============================================================ */

export type Tone = "paper" | "paperWarm" | "mist" | "lacquer" | "ink";

/** Czy dany ton jest tłem ciemnym — decyduje o kolorystyce tekstu. */
export function isDark(tone: Tone) {
  return tone === "lacquer" || tone === "ink";
}

const toneBackground: Record<Tone, string> = {
  paper: "bg-paper text-ink",
  paperWarm: "bg-paper-warm text-ink",
  mist: "mist-red text-ink",
  lacquer: "lacquer-field text-paper",
  ink: "ink-field text-paper",
};

/* ============================================================
   CONTAINER
   ============================================================ */

export function Container({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cx("mx-auto w-full max-w-6xl px-5 sm:px-8", className)}>
      {children}
    </div>
  );
}

/* ============================================================
   SECTION
   ============================================================ */

export function Section({
  id,
  tone = "paper",
  children,
  className,
  grain = true,
  labelledBy,
  as: Tag = "section",
}: {
  id: string;
  tone?: Tone;
  children: ReactNode;
  className?: string;
  /** Ziarno papieru — wyłącz tam, gdzie tło ma własną teksturę. */
  grain?: boolean;
  labelledBy?: string;
  /** Stopka jest sekcją wizualnie, ale landmarkiem `footer` semantycznie. */
  as?: "section" | "footer";
}) {
  return (
    <Tag
      id={id}
      aria-labelledby={labelledBy}
      className={cx(
        "relative isolate overflow-hidden",
        "py-20 sm:py-24 lg:py-32",
        toneBackground[tone],
        grain && "grain-overlay",
        className,
      )}
    >
      {children}
    </Tag>
  );
}

/* ============================================================
   EYEBROW — nadkreślenie z chińskim znakiem
   ============================================================ */

export function Eyebrow({
  children,
  cjk,
  tone = "paper",
  className,
}: {
  children: ReactNode;
  cjk?: string;
  tone?: Tone;
  className?: string;
}) {
  const dark = isDark(tone);
  return (
    <p
      className={cx(
        "flex items-center gap-3 text-[0.7rem] font-semibold uppercase tracking-[0.28em]",
        dark ? "text-gold-light/85" : "text-seal",
        className,
      )}
    >
      <span
        aria-hidden="true"
        className={cx("h-px w-8", dark ? "bg-gold/70" : "bg-seal/45")}
      />
      {cjk && (
        <span
          aria-hidden="true"
          className="font-cjk text-base leading-none tracking-normal opacity-80"
        >
          {cjk}
        </span>
      )}
      <span>{children}</span>
    </p>
  );
}

/* ============================================================
   SECTION HEADING
   ============================================================ */

export function SectionHeading({
  id,
  eyebrow,
  cjk,
  title,
  lead,
  tone = "paper",
  align = "left",
  className,
}: {
  id?: string;
  eyebrow?: string;
  cjk?: string;
  title: ReactNode;
  lead?: ReactNode;
  tone?: Tone;
  align?: "left" | "center";
  className?: string;
}) {
  const dark = isDark(tone);
  const centered = align === "center";

  return (
    <header
      className={cx(
        "flex flex-col gap-5",
        centered && "items-center text-center",
        className,
      )}
    >
      {eyebrow && (
        <Eyebrow cjk={cjk} tone={tone} className={centered ? "justify-center" : ""}>
          {eyebrow}
        </Eyebrow>
      )}

      <h2
        id={id}
        className={cx(
          "font-display text-balance text-4xl leading-[1.08] sm:text-5xl lg:text-[3.4rem]",
          dark ? "text-paper" : "text-ink",
        )}
      >
        {title}
      </h2>

      <BrushUnderline
        className={cx(
          "h-2.5 w-32",
          dark ? "text-gold/70" : "text-vermilion/70",
          centered && "self-center",
        )}
      />

      {lead && (
        <p
          className={cx(
            "max-w-2xl text-lg leading-relaxed text-pretty",
            dark ? "text-paper/75" : "text-ink-soft",
          )}
        >
          {lead}
        </p>
      )}
    </header>
  );
}

/* ============================================================
   BUTTON — jeden wygląd dla <a> i <button>
   ============================================================ */

type ButtonVariant = "solid" | "gold" | "outline" | "outlineLight";
type ButtonSize = "md" | "lg";

const buttonVariant: Record<ButtonVariant, string> = {
  solid:
    "bg-vermilion text-paper shadow-lift hover:bg-seal active:bg-crimson border border-seal/60",
  gold: "bg-gold text-lacquer-deep shadow-lift hover:bg-gold-light active:bg-gold-deep active:text-paper border border-gold-deep/50",
  outline:
    "border border-ink/25 bg-transparent text-ink hover:border-vermilion hover:text-vermilion",
  outlineLight:
    "border border-gold/45 bg-transparent text-gold-light hover:border-gold hover:bg-gold/12",
};

const buttonSize: Record<ButtonSize, string> = {
  md: "px-6 py-3 text-sm",
  lg: "px-8 py-4 text-base",
};

export function buttonClasses(
  variant: ButtonVariant = "solid",
  size: ButtonSize = "md",
) {
  return cx(
    "group/btn inline-flex items-center justify-center gap-2.5 rounded-sm",
    "font-semibold tracking-wider uppercase",
    "transition-all duration-200 ease-out",
    "hover:-translate-y-0.5 active:translate-y-0",
    buttonVariant[variant],
    buttonSize[size],
  );
}

type ButtonOwnProps = {
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
};

/* Unia rozłączna zamiast sygnatury indeksowej. Wcześniej typ kończył się na
   `& Record<string, unknown>`, przez co `onClik` przechodził kompilację bez
   słowa skargi. Teraz `target`/`rel` działają tylko na wariancie z `href`,
   a `type`/`disabled` tylko na wariancie przyciskowym. */
type ButtonAsLink = ButtonOwnProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof ButtonOwnProps> & {
    href: string;
  };

type ButtonAsButton = ButtonOwnProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof ButtonOwnProps> & {
    href?: never;
  };

export function Button(props: ButtonAsLink | ButtonAsButton) {
  const { children, variant = "solid", size = "md", className, ...rest } = props;
  const classes = cx(buttonClasses(variant, size), className);

  /* Rozpakowujemy `href` i `type` osobno, żeby żaden z nich nie trafił
     na niewłaściwy element. Rzutowania są lokalne dla prymitywu —
     bezpieczeństwo wywołań daje unia w sygnaturze. */
  const { href, type, ...shared } = rest as {
    href?: string;
    type?: "button" | "submit" | "reset";
  } & Record<string, unknown>;

  if (typeof href === "string") {
    return (
      <a
        href={href}
        className={classes}
        {...(shared as AnchorHTMLAttributes<HTMLAnchorElement>)}
      >
        {children}
      </a>
    );
  }

  return (
    <button
      type={type ?? "button"}
      className={classes}
      {...(shared as ButtonHTMLAttributes<HTMLButtonElement>)}
    >
      {children}
    </button>
  );
}

/* ============================================================
   CARD — karta „na papierze”, z narożnikiem meandra
   ============================================================ */

export function Card({
  children,
  tone = "paper",
  className,
  corner = true,
}: {
  children: ReactNode;
  tone?: Tone;
  className?: string;
  /** Ornament 回紋 w lewym górnym narożniku. */
  corner?: boolean;
}) {
  const dark = isDark(tone);

  return (
    <div
      className={cx(
        "group relative isolate overflow-hidden rounded-sm p-7 sm:p-8",
        "transition-all duration-300 ease-out",
        dark
          ? "border border-gold/22 bg-lacquer-deep/45 hover:border-gold/45 hover:bg-lacquer-deep/65"
          : "border border-ink/10 bg-paper/85 shadow-paper hover:-translate-y-1 hover:border-vermilion/35 hover:shadow-lift",
        className,
      )}
    >
      {corner && (
        <MeanderCorner
          className={cx(
            "pointer-events-none absolute -top-1 -left-1 h-9 w-9 transition-opacity duration-300",
            dark
              ? "text-gold/30 group-hover:text-gold/55"
              : "text-vermilion/25 group-hover:text-vermilion/50",
          )}
        />
      )}
      {children}
    </div>
  );
}

/* ============================================================
   PILL — mała plakietka z informacją (czas, poziom, miejsca)
   ============================================================ */

export function Pill({
  children,
  tone = "paper",
  className,
}: {
  children: ReactNode;
  tone?: Tone;
  className?: string;
}) {
  const dark = isDark(tone);
  return (
    <span
      className={cx(
        "inline-flex items-center gap-1.5 rounded-full px-3 py-1",
        "text-[0.72rem] font-semibold tracking-wider uppercase",
        dark
          ? "border border-gold/30 bg-gold/10 text-gold-light"
          : "border border-seal/20 bg-seal/8 text-seal",
        className,
      )}
    >
      {children}
    </span>
  );
}

/* ============================================================
   GOLD RULE / INK RULE — cienkie separatory
   ============================================================ */

export function GoldRule({ className }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={cx("rule-gold h-px w-full opacity-60", className)}
    />
  );
}

export function InkRule({ className }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={cx("rule-ink h-px w-full opacity-45", className)}
    />
  );
}

/* ============================================================
   CJK GLYPH — duży znak jako element kompozycji
   ============================================================ */

export function CjkGlyph({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <span
      aria-hidden="true"
      className={cx("font-cjk leading-none select-none", className)}
    >
      {children}
    </span>
  );
}
