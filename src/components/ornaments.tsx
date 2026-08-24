/**
 * Ornamenty — cały język wizualny festiwalu rysowany w SVG.
 *
 * Zasada: żadnych plików graficznych. Każdy motyw (enso, kwiat śliwy,
 * chmury pomyślności, pieczęć, góry, latarnia) jest ścieżką wektorową,
 * więc skaluje się bez utraty jakości, waży kilobajty i dziedziczy kolor
 * przez `currentColor` — jeden komponent obsługuje sekcję jasną i ciemną.
 *
 * Wszystkie ornamenty są dekoracją: mają `aria-hidden` i nie trafiają do
 * drzewa dostępności. Treść nigdy nie zależy od nich.
 */

import type { CSSProperties } from "react";

/**
 * Każdy ornament jest dekoracją, więc `pointer-events-none` należy do jego
 * definicji, a nie do listy rzeczy, o których musi pamiętać każde z 40+
 * miejsc użycia. Dopisujemy je tutaj raz — zapominanie przestaje być możliwe.
 *
 * Własny helper zamiast `cx` z ui.tsx, bo ui.tsx importuje ornamenty
 * (BrushUnderline, MeanderCorner) — import w drugą stronę zrobiłby cykl.
 */
function orn(className?: string) {
  return className ? `pointer-events-none ${className}` : "pointer-events-none";
}

type OrnamentProps = {
  className?: string;
  /** Głównie do rozstrajania animacji (`animationDelay`), gdy ten sam
      ornament pojawia się na stronie kilka razy — dwie latarnie kołyszące
      się w tej samej fazie wyglądają jak błąd, nie jak dekoracja. */
  style?: CSSProperties;
};

/* ============================================================
   WSPÓLNE DEFINICJE
   Renderowane RAZ na stronie (w page.tsx), żeby nie duplikować
   identyfikatorów filtrów i gradientów w DOM.
   ============================================================ */

export function OrnamentDefs() {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      width="0"
      height="0"
      className="absolute"
      style={{ position: "absolute", width: 0, height: 0, overflow: "hidden" }}
    >
      <defs>
        {/* Nierówna krawędź pędzla — lekkie zaburzenie konturu, żeby kreska
            nie wyglądała jak wektor z programu CAD. */}
        <filter id="orn-brush" x="-12%" y="-12%" width="124%" height="124%">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.035"
            numOctaves="3"
            seed="7"
            result="noise"
          />
          <feDisplacementMap
            in="SourceGraphic"
            in2="noise"
            scale="4.5"
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>

        {/* Mocniejsze zaburzenie dla dużych plam tuszu. */}
        <filter id="orn-brush-heavy" x="-18%" y="-18%" width="136%" height="136%">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.02"
            numOctaves="4"
            seed="19"
            result="noise"
          />
          <feDisplacementMap
            in="SourceGraphic"
            in2="noise"
            scale="9"
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>

        {/* Rozmycie tuszu wsiąkającego w papier. */}
        <filter id="orn-bleed" x="-25%" y="-25%" width="150%" height="150%">
          <feGaussianBlur stdDeviation="6" />
        </filter>

        {/* Kwiat śliwy — pięć płatków, definicja do wielokrotnego użycia. */}
        <symbol id="orn-blossom" viewBox="0 0 40 40">
          <g>
            {[0, 72, 144, 216, 288].map((deg) => (
              <ellipse
                key={deg}
                cx="20"
                cy="10.5"
                rx="6.4"
                ry="8.2"
                transform={`rotate(${deg} 20 20)`}
                fill="currentColor"
              />
            ))}
            <circle cx="20" cy="20" r="3.1" fill="currentColor" opacity="0.45" />
          </g>
        </symbol>
      </defs>
    </svg>
  );
}

/* ============================================================
   ENSO 圓相 — pociągnięty pędzlem okrąg
   Najmocniejszy znak identyfikacji festiwalu: prawie zamknięte
   koło z przerwą, jak na plakacie.
   ============================================================ */

export function EnsoRing({ className, style }: OrnamentProps) {
  return (
    <svg
      viewBox="0 0 200 200"
      className={orn(className)}
      style={style}
      aria-hidden="true"
      focusable="false"
    >
      <g filter="url(#orn-brush)">
        {/* Główna kreska: łuk 340°, przerwa u góry po prawej. */}
        <path
          d="M155.2 53.7 A72 72 0 1 1 136 37.7"
          fill="none"
          stroke="currentColor"
          strokeWidth="15"
          strokeLinecap="round"
          opacity="0.92"
        />
        {/* Zbieg pędzla — ogon kreski cieńszy i jaśniejszy. */}
        <path
          d="M136 37.7 A72 72 0 0 0 168.5 78"
          fill="none"
          stroke="currentColor"
          strokeWidth="6"
          strokeLinecap="round"
          opacity="0.32"
        />
        {/* Dociśnięcie pędzla na starcie — grubsze zgrubienie. */}
        <path
          d="M150 48 A72 72 0 0 0 121 30"
          fill="none"
          stroke="currentColor"
          strokeWidth="19"
          strokeLinecap="round"
          opacity="0.55"
        />
      </g>
    </svg>
  );
}

/* ============================================================
   CZERWONE SŁOŃCE — plama tuszu / słońce z plakatu
   ============================================================ */

export function InkSun({ className, style }: OrnamentProps) {
  return (
    <svg
      viewBox="0 0 200 200"
      className={orn(className)}
      style={style}
      aria-hidden="true"
      focusable="false"
    >
      <g filter="url(#orn-brush-heavy)">
        <circle cx="100" cy="100" r="74" fill="currentColor" opacity="0.9" />
      </g>
      <circle
        cx="100"
        cy="100"
        r="80"
        fill="currentColor"
        opacity="0.14"
        filter="url(#orn-bleed)"
      />
    </svg>
  );
}

/* ============================================================
   PIECZĘĆ 印章 — kwadratowy stempel z chińskim znakiem
   ============================================================ */

export function SealStamp({
  className,
  style,
  glyph = "文武",
}: OrnamentProps & { glyph?: string }) {
  const chars = [...glyph].slice(0, 4);
  const positions =
    chars.length <= 2
      ? [
          { x: 50, y: 34 },
          { x: 50, y: 70 },
        ]
      : [
          { x: 32, y: 34 },
          { x: 68, y: 34 },
          { x: 32, y: 70 },
          { x: 68, y: 70 },
        ];

  return (
    <svg
      viewBox="0 0 100 100"
      className={orn(className)}
      style={style}
      aria-hidden="true"
      focusable="false"
    >
      <g filter="url(#orn-brush)">
        <rect
          x="4"
          y="4"
          width="92"
          height="92"
          rx="6"
          fill="currentColor"
          opacity="0.94"
        />
      </g>
      {chars.map((char, i) => (
        <text
          key={`${char}-${i}`}
          x={positions[i]?.x ?? 50}
          y={positions[i]?.y ?? 50}
          textAnchor="middle"
          dominantBaseline="central"
          fontSize={chars.length <= 2 ? 34 : 30}
          fontWeight="700"
          fill="var(--color-paper)"
          style={{ fontFamily: "var(--font-cjk)" }}
        >
          {char}
        </text>
      ))}
    </svg>
  );
}

/* ============================================================
   GAŁĄZKA ŚLIWY 梅花 — kwiaty na ciemnej gałęzi
   ============================================================ */

export function PlumBranch({
  className,
  style,
  flip = false,
  blossomClassName = "text-vermilion",
}: OrnamentProps & { flip?: boolean; blossomClassName?: string }) {
  const blossoms = [
    { x: 24, y: 96, s: 30, r: -12 },
    { x: 58, y: 62, s: 24, r: 22 },
    { x: 86, y: 108, s: 21, r: -34 },
    { x: 112, y: 48, s: 27, r: 8 },
    { x: 140, y: 92, s: 18, r: 40 },
    { x: 152, y: 34, s: 22, r: -18 },
    { x: 12, y: 52, s: 17, r: 30 },
  ];

  return (
    <svg
      viewBox="0 0 200 160"
      className={orn(className)}
      style={flip ? { ...style, transform: "scaleX(-1)" } : style}
      aria-hidden="true"
      focusable="false"
    >
      {/* Gałąź — tusz, nieregularna, rysowana od dołu w prawo do góry. */}
      <g filter="url(#orn-brush)" stroke="currentColor" fill="none">
        <path
          d="M-6 158 C34 138 52 118 72 88 C88 64 112 48 156 26"
          strokeWidth="6.5"
          strokeLinecap="round"
          opacity="0.72"
        />
        <path
          d="M60 100 C74 106 92 106 104 116"
          strokeWidth="3.4"
          strokeLinecap="round"
          opacity="0.55"
        />
        <path
          d="M104 62 C118 72 130 82 146 86"
          strokeWidth="3"
          strokeLinecap="round"
          opacity="0.5"
        />
        <path
          d="M28 128 C22 116 16 104 10 96"
          strokeWidth="2.8"
          strokeLinecap="round"
          opacity="0.45"
        />
      </g>

      {/* Kwiaty — symbol z defs, obrócone i przeskalowane. Kolor osobno od
          gałęzi, bo na ciemnych sekcjach cynobrowe kwiaty znikają w tle. */}
      <g className={blossomClassName}>
        {blossoms.map((b, i) => (
          <use
            key={i}
            href="#orn-blossom"
            x={b.x - b.s / 2}
            y={b.y - b.s / 2}
            width={b.s}
            height={b.s}
            transform={`rotate(${b.r} ${b.x} ${b.y})`}
            opacity={0.55 + (i % 3) * 0.15}
          />
        ))}
      </g>
    </svg>
  );
}

/* ============================================================
   CHMURY POMYŚLNOŚCI 祥云 — bordiura i akcenty
   ============================================================ */

export function CloudBand({ className, style }: OrnamentProps) {
  const unit = (
    <>
      <path
        d="M6 30 C-2 22 2 10 12 10 C14 2 26 -2 33 4 C40 -2 52 2 54 11 C64 10 70 20 64 28 L64 32 L6 32 Z"
        fill="currentColor"
        opacity="0.9"
      />
      <path
        d="M14 22 C14 16 20 14 24 17 C27 19 26 24 22 25 C18 26 14 25 14 22 Z"
        fill="var(--color-paper)"
        opacity="0.28"
      />
    </>
  );

  return (
    <svg
      viewBox="0 0 240 34"
      className={orn(className)}
      style={style}
      aria-hidden="true"
      focusable="false"
      preserveAspectRatio="none"
    >
      {[0, 72, 144, 216].map((dx) => (
        <g key={dx} transform={`translate(${dx} 0)`}>
          {unit}
        </g>
      ))}
    </svg>
  );
}

/* Pojedyncza chmurka — akcent narożny. */
export function CloudPuff({ className, style }: OrnamentProps) {
  return (
    <svg
      viewBox="0 0 120 60"
      className={orn(className)}
      style={style}
      aria-hidden="true"
      focusable="false"
    >
      <g fill="currentColor">
        <path
          d="M10 52 C-2 44 2 24 16 24 C20 8 44 2 54 14 C66 2 90 8 92 26 C110 26 116 46 102 54 Z"
          opacity="0.85"
        />
        <path
          d="M22 40 C22 30 34 26 40 32 C46 38 42 48 34 48 C27 48 22 45 22 40 Z"
          fill="var(--color-paper)"
          opacity="0.22"
        />
        <path
          d="M62 38 C62 29 73 26 78 32 C83 38 79 47 72 47 C66 47 62 43 62 38 Z"
          fill="var(--color-paper)"
          opacity="0.18"
        />
      </g>
    </svg>
  );
}

/* ============================================================
   GÓRY I PAGODA — tuszowy pejzaż, tło sekcji
   ============================================================ */

export function InkMountains({ className, style }: OrnamentProps) {
  return (
    <svg
      viewBox="0 0 800 260"
      className={orn(className)}
      style={style}
      aria-hidden="true"
      focusable="false"
      preserveAspectRatio="none"
    >
      {/* Plan daleki — najjaśniejszy. */}
      <path
        d="M0 232 L92 150 L146 186 L232 96 L306 168 L376 118 L452 196 L534 128 L612 190 L690 140 L800 214 L800 260 L0 260 Z"
        fill="currentColor"
        opacity="0.14"
      />
      {/* Plan średni. */}
      <path
        d="M0 250 L74 196 L138 226 L214 160 L288 214 L364 176 L446 234 L522 182 L604 228 L692 190 L800 244 L800 260 L0 260 Z"
        fill="currentColor"
        opacity="0.24"
      />
      {/* Plan bliski — sylwety drzew i pagody. */}
      <g fill="currentColor" opacity="0.42">
        <path d="M0 260 L0 250 L108 232 L206 244 L318 226 L430 246 L548 230 L664 248 L800 234 L800 260 Z" />
        {/* Pagoda: trzy dachy zwężające się ku górze. */}
        <g transform="translate(596 150)">
          <rect x="18" y="76" width="14" height="26" />
          <path d="M-2 76 L52 76 L44 66 L6 66 Z" />
          <path d="M2 62 L48 62 L41 52 L9 52 Z" />
          <path d="M7 48 L43 48 L36 38 L14 38 Z" />
          <path d="M12 34 L38 34 L31 24 L19 24 Z" />
          <rect x="23" y="12" width="4" height="12" />
        </g>
      </g>
    </svg>
  );
}

/* ============================================================
   POCIĄGNIĘCIE PĘDZLA — separator sekcji
   ============================================================ */

export function BrushStroke({ className, style }: OrnamentProps) {
  return (
    <svg
      viewBox="0 0 400 20"
      className={orn(className)}
      style={style}
      aria-hidden="true"
      focusable="false"
      preserveAspectRatio="none"
    >
      <g filter="url(#orn-brush)">
        <path
          d="M4 12 C60 4 118 14 176 9 C236 4 296 15 356 8 C372 6 386 9 396 11 C386 15 372 17 356 15 C296 20 236 11 176 15 C118 19 60 11 4 12 Z"
          fill="currentColor"
          opacity="0.85"
        />
      </g>
    </svg>
  );
}

/* Krótka, gruba kreska pod nagłówkiem. */
export function BrushUnderline({ className, style }: OrnamentProps) {
  return (
    <svg
      viewBox="0 0 160 14"
      className={orn(className)}
      style={style}
      aria-hidden="true"
      focusable="false"
    >
      <g filter="url(#orn-brush)">
        <path
          d="M3 8 C28 3 52 10 78 6 C104 2 128 9 156 5 C150 11 132 13 108 12 C82 11 56 13 32 12 C18 11 8 10 3 8 Z"
          fill="currentColor"
        />
      </g>
    </svg>
  );
}

/* ============================================================
   LATARNIA 燈籠
   ============================================================ */

export function Lantern({ className, style }: OrnamentProps) {
  return (
    <svg
      viewBox="0 0 80 130"
      className={orn(className)}
      style={style}
      aria-hidden="true"
      focusable="false"
    >
      {/* Sznurek */}
      <path
        d="M40 0 L40 16"
        stroke="currentColor"
        strokeWidth="2"
        opacity="0.6"
      />
      {/* Okucia */}
      <rect x="26" y="14" width="28" height="7" rx="2" fill="currentColor" opacity="0.85" />
      <rect x="26" y="94" width="28" height="7" rx="2" fill="currentColor" opacity="0.85" />
      {/* Korpus */}
      <ellipse cx="40" cy="58" rx="34" ry="38" fill="currentColor" opacity="0.9" />
      {/* Prążki */}
      <g stroke="var(--color-lacquer-deep)" strokeWidth="1.6" opacity="0.35" fill="none">
        <ellipse cx="40" cy="58" rx="11" ry="38" />
        <ellipse cx="40" cy="58" rx="22" ry="38" />
      </g>
      {/* Frędzle */}
      <g stroke="currentColor" strokeWidth="2.4" opacity="0.8" strokeLinecap="round">
        <path d="M32 101 L30 122" />
        <path d="M40 101 L40 126" />
        <path d="M48 101 L50 122" />
      </g>
    </svg>
  );
}

/* ============================================================
   MIECZ JIAN 劍 — sylweta, znak filaru Wu
   ============================================================ */

export function JianSword({ className, style }: OrnamentProps) {
  return (
    <svg
      viewBox="0 0 40 300"
      className={orn(className)}
      style={style}
      aria-hidden="true"
      focusable="false"
    >
      <g fill="currentColor">
        {/* Klinga z ostrym sztychem */}
        <path d="M20 4 L26 44 L26 196 L20 208 L14 196 L14 44 Z" opacity="0.9" />
        {/* Grań klingi */}
        <path d="M20 10 L20 202" stroke="var(--color-paper)" strokeWidth="1.2" opacity="0.35" />
        {/* Jelec */}
        <path d="M4 200 L36 200 L32 212 L8 212 Z" opacity="0.95" />
        {/* Rękojeść */}
        <rect x="15" y="212" width="10" height="62" rx="3" opacity="0.9" />
        {/* Owijka rękojeści */}
        <g stroke="var(--color-paper)" strokeWidth="1.4" opacity="0.28">
          <path d="M15 226 L25 232" />
          <path d="M15 238 L25 244" />
          <path d="M15 250 L25 256" />
        </g>
        {/* Głowica */}
        <rect x="11" y="274" width="18" height="9" rx="3" opacity="0.95" />
        {/* Chwost */}
        <path
          d="M20 283 L20 298"
          stroke="currentColor"
          strokeWidth="2.6"
          strokeLinecap="round"
          opacity="0.7"
        />
      </g>
    </svg>
  );
}

/* ============================================================
   ZWÓJ 卷軸 — znak filaru Wen
   ============================================================ */

export function ScrollRoll({ className, style }: OrnamentProps) {
  return (
    <svg
      viewBox="0 0 260 90"
      className={orn(className)}
      style={style}
      aria-hidden="true"
      focusable="false"
    >
      {/* Karta zwoju */}
      <path
        d="M26 20 L234 20 L234 70 L26 70 Z"
        fill="currentColor"
        opacity="0.12"
      />
      {/* Wiersze pisma — pionowe kolumny, jak w klasycznym zwoju */}
      <g stroke="currentColor" strokeWidth="2" opacity="0.42" strokeLinecap="round">
        {Array.from({ length: 11 }, (_, i) => 44 + i * 16).map((x) => (
          <path key={x} d={`M${x} 28 L${x} 62`} />
        ))}
      </g>
      {/* Drążki po obu stronach */}
      <g fill="currentColor" opacity="0.85">
        <rect x="12" y="12" width="14" height="66" rx="7" />
        <rect x="234" y="12" width="14" height="66" rx="7" />
        <circle cx="19" cy="8" r="5" />
        <circle cx="19" cy="82" r="5" />
        <circle cx="241" cy="8" r="5" />
        <circle cx="241" cy="82" r="5" />
      </g>
    </svg>
  );
}

/* ============================================================
   TAIJI 太極 — symbol równowagi Wen i Wu
   ============================================================ */

export function TaijiSymbol({ className, style }: OrnamentProps) {
  return (
    <svg
      viewBox="0 0 100 100"
      className={orn(className)}
      style={style}
      aria-hidden="true"
      focusable="false"
    >
      <circle cx="50" cy="50" r="47" fill="var(--color-paper)" />
      {/* Ciemna połowa: półokrąg + dwa łuki tworzące falę S. */}
      <path
        d="M50 3 A47 47 0 0 1 50 97 A23.5 23.5 0 0 1 50 50 A23.5 23.5 0 0 0 50 3 Z"
        fill="currentColor"
      />
      <circle cx="50" cy="26.5" r="7" fill="var(--color-paper)" />
      <circle cx="50" cy="73.5" r="7" fill="currentColor" />
      <circle
        cx="50"
        cy="50"
        r="47"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        opacity="0.5"
      />
    </svg>
  );
}

/* ============================================================
   MEANDER 回紋 — narożnik klasycznej bordiury
   ============================================================ */

export function MeanderCorner({ className, style }: OrnamentProps) {
  return (
    <svg
      viewBox="0 0 60 60"
      className={orn(className)}
      style={style}
      aria-hidden="true"
      focusable="false"
    >
      <g
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="square"
      >
        <path d="M2 58 L2 2 L58 2" opacity="0.9" />
        <path d="M12 58 L12 12 L58 12" opacity="0.6" />
        <path d="M22 44 L22 22 L44 22 L44 34 L34 34 L34 30" opacity="0.75" />
      </g>
    </svg>
  );
}

/* ============================================================
   PŁATKI — unoszące się kwiaty śliwy, warstwa dekoracyjna
   ============================================================ */

export function PetalDrift({ className, style }: OrnamentProps) {
  const petals = [
    { x: 8, y: 14, s: 16, r: 20, o: 0.5, d: "0s" },
    { x: 26, y: 62, s: 11, r: -30, o: 0.35, d: "1.2s" },
    { x: 47, y: 26, s: 13, r: 55, o: 0.28, d: "2.4s" },
    { x: 68, y: 74, s: 18, r: -12, o: 0.42, d: "0.6s" },
    { x: 84, y: 38, s: 10, r: 40, o: 0.3, d: "1.8s" },
    { x: 92, y: 82, s: 14, r: -48, o: 0.36, d: "3s" },
  ];

  return (
    <svg
      viewBox="0 0 100 100"
      className={orn(className)}
      style={style}
      aria-hidden="true"
      focusable="false"
      preserveAspectRatio="none"
    >
      {petals.map((p, i) => (
        <g
          key={i}
          className="animate-sway"
          style={{ animationDelay: p.d, transformOrigin: `${p.x}px ${p.y}px` }}
        >
          <ellipse
            cx={p.x}
            cy={p.y}
            rx={p.s * 0.34}
            ry={p.s * 0.5}
            fill="currentColor"
            opacity={p.o}
            transform={`rotate(${p.r} ${p.x} ${p.y})`}
          />
        </g>
      ))}
    </svg>
  );
}

/* ============================================================
   BAMBUS 竹 — pionowy akcent boczny
   ============================================================ */

export function BambooSprig({ className, style }: OrnamentProps) {
  return (
    <svg
      viewBox="0 0 90 240"
      className={orn(className)}
      style={style}
      aria-hidden="true"
      focusable="false"
    >
      <g stroke="currentColor" fill="none" opacity="0.55">
        {/* Łodygi z kolankami */}
        <path d="M30 240 L30 12" strokeWidth="5" strokeLinecap="round" />
        <path d="M58 240 L58 56" strokeWidth="3.5" strokeLinecap="round" />
        <g strokeWidth="5">
          {[40, 84, 128, 172, 210].map((y) => (
            <path key={y} d={`M25 ${y} L35 ${y}`} />
          ))}
        </g>
        <g strokeWidth="3.5">
          {[92, 140, 188].map((y) => (
            <path key={y} d={`M54 ${y} L62 ${y}`} />
          ))}
        </g>
      </g>
      {/* Liście */}
      <g fill="currentColor" opacity="0.48">
        <path d="M30 44 C48 30 68 26 82 20 C68 38 48 48 32 50 Z" />
        <path d="M30 60 C14 52 6 38 0 26 C16 38 28 50 32 62 Z" />
        <path d="M58 100 C74 92 82 80 88 70 C76 84 66 96 60 104 Z" />
        <path d="M30 132 C46 124 58 112 66 102 C54 118 42 132 32 138 Z" />
        <path d="M58 150 C44 144 34 134 26 124 C38 138 50 150 58 156 Z" />
      </g>
    </svg>
  );
}
