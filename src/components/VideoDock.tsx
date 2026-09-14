"use client";

import { useEffect, useState } from "react";
import { CjkGlyph, cx } from "@/components/ui";
import type { Content } from "@/lib/content";

const PANEL_ID = "transmisja-panel";

const NARROW = 352;
const WIDE = 608;

function DiagonalArrow({ wide }: { wide: boolean }) {
  return (
    <svg
      viewBox="0 0 16 16"
      className={cx(
        "h-4 w-4 transition-transform duration-200",
        wide && "rotate-180",
      )}
      aria-hidden="true"
      focusable="false"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12.6 12.6 L4.4 4.4" />
      <path d="M4.4 9.6 V4.4 H9.6" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg
      viewBox="0 0 16 16"
      className="h-4 w-4"
      aria-hidden="true"
      focusable="false"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
    >
      <path d="M4 4 L12 12" />
      <path d="M12 4 L4 12" />
    </svg>
  );
}

export default function VideoDock({ stream }: { stream: Content["stream"] }) {
  const [open, setOpen] = useState(false);
  const [wide, setWide] = useState(false);

  useEffect(() => {
    function handleKeyDown(eventKeyboard: KeyboardEvent) {
      if (eventKeyboard.key === "Escape") setOpen(false);
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div
      data-overlay
      className="pointer-events-none fixed right-0 bottom-0 z-50 flex flex-col items-end p-4 sm:p-6"
    >
      {}
      <div
        id={PANEL_ID}

        aria-label={stream.title}
        aria-hidden={open ? undefined : true}
        inert={!open}

        /* Szerokość stylem, nie klasą: wartość dowolna Tailwinda ze spacją
           albo przecinkiem — `w-[min(22rem,calc(100vw-2rem))]` — nie generuje
           żadnej reguły i panel schodzi do kilku pikseli, bez ostrzeżenia. */
        style={{ width: `min(calc(100vw - 2rem), ${wide ? WIDE : NARROW}px)` }}
        className={cx(
          "origin-bottom-right overflow-hidden border border-line bg-paper shadow-float",

          "transition-[opacity,translate,scale,width] duration-300 ease-out",
          open
            ? "pointer-events-auto translate-y-0 scale-100 opacity-100"
            : "pointer-events-none translate-y-4 scale-95 opacity-0",
        )}
      >
        {}
        <div className="flex items-center justify-between gap-3 border-b border-line px-2 py-1.5">
          <div className="flex min-w-0 items-center gap-1">
            <button
              type="button"
              onClick={() => setWide((wasWide) => !wasWide)}
              aria-label={wide ? "Zmniejsz panel" : "Powiększ panel"}
              className="hidden min-h-11 min-w-11 shrink-0 items-center justify-center text-ink-faint transition-colors hover:text-seal sm:inline-flex"
            >
              <DiagonalArrow wide={wide} />
            </button>

            <p className="flex items-center gap-2.5 pl-2 sm:pl-0">
              <span
                aria-hidden="true"
                className="h-2 w-2 shrink-0 animate-breathe rounded-full bg-seal"
              />
              <span className="text-xs tracking-[0.18em] text-seal uppercase">
                {stream.live}
              </span>
            </p>
          </div>

          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Zamknij panel transmisji"
            className="inline-flex min-h-11 min-w-11 shrink-0 items-center justify-center text-ink-faint transition-colors hover:text-seal"
          >
            <CloseIcon />
          </button>
        </div>

        {}
        <div className="relative aspect-video w-full bg-paper-soft">
          {open && stream.embedUrl ? (
            <iframe
              src={stream.embedUrl}
              title={stream.title}
              className="absolute inset-0 h-full w-full border-0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            />
          ) : (
            <>
              {}
              <CjkGlyph className="pointer-events-none absolute -right-4 -bottom-6 text-7xl text-ink/5">
                直播
              </CjkGlyph>

              <div className="relative flex h-full w-full flex-col items-center justify-center gap-4 px-4">
                <svg
                  viewBox="0 0 56 56"
                  className="h-12 w-12 text-seal"
                  aria-hidden="true"
                  focusable="false"
                >
                  <circle
                    cx="28"
                    cy="28"
                    r="25"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.4"
                  />
                  <path
                    d="M23.5 18.5 L39 28 L23.5 37.5 Z"
                    fill="currentColor"
                  />
                </svg>
                <p className="text-center text-xs tracking-[0.18em] text-ink-muted uppercase">
                  {stream.placeholder}
                </p>
              </div>
            </>
          )}
        </div>
      </div>

      {}
      <button
        type="button"
        onClick={() => setOpen((wasOpen) => !wasOpen)}
        aria-expanded={open}
        aria-controls={PANEL_ID}
        className={cx(
          "pointer-events-auto mt-3 inline-flex items-center bg-seal",
          "text-xs font-bold tracking-[0.18em] text-paper uppercase transition-colors duration-200 hover:bg-vermilion",
          open ? "min-h-11 gap-2.5 px-5 py-3" : "h-11 w-11 justify-center",
        )}
      >
        <svg
          viewBox="0 0 24 24"
          className="h-4 w-4 shrink-0"
          aria-hidden="true"
          focusable="false"
        >
          <rect
            x="2.6"
            y="4"
            width="18.8"
            height="13"
            rx="1.6"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
          />
          <path d="M10.2 8.6 L15.2 10.6 L10.2 12.6 Z" fill="currentColor" />
          <path
            d="M8.4 20.4 L15.6 20.4"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
        </svg>

        {}
        <span className={cx(!open && "sr-only")}>
          {open ? stream.hideLabel : stream.showLabel}
        </span>

        {}
        {open && (
          <svg
            viewBox="0 0 14 14"
            className="h-3 w-3 shrink-0 rotate-180"
            aria-hidden="true"
            focusable="false"
          >
            <path
              d="M2 9.2 L7 4.4 L12 9.2"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.9"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </button>
    </div>
  );
}
