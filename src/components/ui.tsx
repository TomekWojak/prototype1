import type {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  ReactNode,
} from "react";
import { BrushStroke } from "@/components/ornaments";

/* ============================================================
   NARZĘDZIE
   ============================================================ */

export function cx(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ");
}

/* ============================================================
   TON SEKCJI

   Dwa tony zamiast pięciu. Nie ma już ciemnych sekcji laki ani
   tuszu — rytm strony budują odstępy i cienkie kreski, nie zmiany
   koloru tła. `soft` to ledwie widoczne złamanie bieli, używane
   oszczędnie, żeby dwie sąsiednie sekcje się nie zlewały.
   ============================================================ */

export type Tone = "paper" | "soft";

const toneBackground: Record<Tone, string> = {
  paper: "bg-paper",
  soft: "bg-paper-soft",
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
    <div className={cx("mx-auto w-full max-w-5xl px-6 sm:px-8", className)}>
      {children}
    </div>
  );
}

/* ============================================================
   SECTION

   Odstępy pionowe są celowo duże. Na stronie referencyjnej to
   właśnie przestrzeń robi wrażenie spokoju — treści jest mało,
   ale każda ma miejsce, żeby wybrzmieć.
   ============================================================ */

export function Section({
  id,
  tone = "paper",
  children,
  className,
  labelledBy,
  padded = true,
  as: Tag = "section",
}: {
  id: string;
  tone?: Tone;
  children: ReactNode;
  className?: string;
  labelledBy?: string;
  /**
   * Wyłącz domyślne odstępy pionowe, gdy sekcja rządzi wysokością sama
   * (Hero: `min-h` + wyśrodkowanie). Bez tego 160 px paddingu doklejało się
   * do pełnoekranowej wysokości i robiło z ekranu otwierającego pustkę
   * na 1250 px, a próba nadpisania go klasą `pt-*` z `className` jest
   * niedeterministyczna — o zwycięzcy decyduje kolejność w arkuszu.
   */
  padded?: boolean;
  /** Stopka jest sekcją wizualnie, ale landmarkiem `footer` semantycznie. */
  as?: "section" | "footer";
}) {
  return (
    <Tag
      id={id}
      aria-labelledby={labelledBy}
      className={cx(
        "relative isolate overflow-hidden",
        padded && "py-24 sm:py-32 lg:py-40",
        toneBackground[tone],
        className,
      )}
    >
      {children}
    </Tag>
  );
}

/* ============================================================
   EYEBROW — nadkreślenie nad nagłówkiem
   ============================================================ */

export function Eyebrow({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <p
      className={cx(
        "text-xs font-bold tracking-[0.22em] text-seal uppercase",
        className,
      )}
    >
      {children}
    </p>
  );
}

/* ============================================================
   SECTION HEADING
   ============================================================ */

export function SectionHeading({
  id,
  eyebrow,
  title,
  lead,
  align = "left",
  className,
}: {
  id?: string;
  eyebrow?: string;
  title: ReactNode;
  lead?: ReactNode;
  align?: "left" | "center";
  className?: string;
}) {
  const centered = align === "center";

  return (
    <header
      className={cx(
        "flex flex-col",
        centered && "items-center text-center",
        className,
      )}
    >
      {eyebrow && <Eyebrow className="mb-5">{eyebrow}</Eyebrow>}

      <h2 id={id} className="text-4xl sm:text-5xl">
        {title}
      </h2>

      {lead && (
        <p
          className={cx(
            "mt-7 max-w-2xl text-lg text-pretty text-ink-muted",
            centered && "mx-auto",
          )}
        >
          {lead}
        </p>
      )}
    </header>
  );
}

/* ============================================================
   BUTTON
   ============================================================ */

type ButtonVariant = "solid" | "outline";
type ButtonSize = "md" | "lg";

const buttonVariant: Record<ButtonVariant, string> = {
  solid: "bg-seal text-paper hover:bg-vermilion",
  outline: "border border-ink/20 text-ink hover:border-seal hover:text-seal",
};

const buttonSize: Record<ButtonSize, string> = {
  md: "px-7 py-3.5 text-sm",
  lg: "px-9 py-4.5 text-base",
};

export function buttonClasses(
  variant: ButtonVariant = "solid",
  size: ButtonSize = "md",
) {
  return cx(
    "inline-flex items-center justify-center gap-2.5",
    "font-bold tracking-[0.1em] uppercase",
    "transition-colors duration-200",
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

/* Unia rozłączna: `target`/`rel` tylko przy `href`, `type`/`disabled`
   tylko na przycisku. Literówka w nazwie propa jest błędem kompilacji. */
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
   CARD

   Bez cienia, bez zaokrągleń, bez obramowania dookoła. Karty
   oddziela jedynie cienka kreska u góry — tyle wystarczy, żeby
   oko widziało podział, a strona nie zaczęła wyglądać jak
   zestaw kafelków z szablonu.
   ============================================================ */

export function Card({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cx("group border-t border-line pt-8", className)}
    >
      {children}
    </div>
  );
}

/* ============================================================
   PILL — mała plakietka (czas, poziom, liczba miejsc)
   ============================================================ */

export function Pill({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cx(
        "inline-flex items-center gap-1.5 text-xs tracking-wide text-ink-muted",
        className,
      )}
    >
      {children}
    </span>
  );
}

/* ============================================================
   SEPARATORY
   ============================================================ */

export function InkRule({ className }: { className?: string }) {
  return <div aria-hidden="true" className={cx("rule-ink h-px w-full", className)} />;
}

/** Krótka kreska pędzlem — akcent pod nagłówkiem, używać oszczędnie. */
export function BrushRule({ className }: { className?: string }) {
  return <BrushStroke className={cx("h-2 w-24 text-seal/70", className)} />;
}

/* ============================================================
   CJK GLYPH
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
