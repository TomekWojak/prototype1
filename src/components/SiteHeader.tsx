"use client";

import { useEffect, useState } from "react";
import { SealStamp } from "@/components/ornaments";
import { Button, Container, cx } from "@/components/ui";

import { navLinks } from "@/lib/fallback";
import type { FestivalEvent } from "@/lib/content";

const chrome = {
  skip: "Przejdź do treści",
  navLabel: "Nawigacja główna",
  openMenu: "Otwórz menu",
  closeMenu: "Zamknij menu",
} as const;

const MENU_ID = "menu-mobilne";

function Chevron({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 16 16"
      className={className}
      aria-hidden="true"
      focusable="false"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5.5 3 L11 8 L5.5 13" />
    </svg>
  );
}

export default function SiteHeader({ event }: { event: FestivalEvent }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const ids = navLinks.map((link) => link.href.slice(1));
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    if (sections.length === 0) return;

    const seen = new Set<string>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) seen.add(entry.target.id);
          else seen.delete(entry.target.id);
        }

        setActive(ids.find((id) => seen.has(id)) ?? "");
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!open) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    const wide = window.matchMedia("(min-width: 1024px)");
    const onWide = (e: MediaQueryListEvent) => {
      if (e.matches) setOpen(false);
    };

    const zakryte = Array.from(
      document.querySelectorAll<HTMLElement>("main, footer, [data-overlay]"),
    );
    zakryte.forEach((el) => {
      el.inert = true;
    });

    const poprzedniOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    wide.addEventListener("change", onWide);

    return () => {
      zakryte.forEach((el) => {
        el.inert = false;
      });
      document.body.style.overflow = poprzedniOverflow;
      window.removeEventListener("keydown", onKey);
      wide.removeEventListener("change", onWide);
    };
  }, [open]);

  const solid = scrolled || open;

  return (
    <header
      className={cx(
        "fixed inset-x-0 top-0 z-40 border-b transition-colors duration-300 ease-out",

        solid
          ? "border-line bg-paper/92 backdrop-blur-sm"
          : "border-transparent bg-transparent",
      )}
    >
      <a
        href="#tresc"
        className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-4 focus:z-50 focus:border focus:border-seal focus:bg-paper focus:px-4 focus:py-2 focus:text-xs focus:font-bold focus:tracking-[0.22em] focus:text-seal focus:uppercase"
      >
        {chrome.skip}
      </a>

      <nav aria-label={chrome.navLabel}>
        <Container>
          <div className="flex h-16 items-center justify-between gap-2 sm:h-20">
            <a href="#hero" className="group flex shrink-0 items-center gap-3">
              <SealStamp
                glyph={event.nameCjk}
                className="h-9 w-9 shrink-0 text-seal"
              />
              <span className="flex flex-col leading-none">
                <span className="font-display text-base text-ink transition-colors duration-200 group-hover:text-seal">
                  {event.name}
                </span>
                <span className="mt-2 text-xs tracking-[0.2em] text-ink-muted uppercase">
                  {event.subtitle}
                </span>
              </span>
            </a>

            <ul className="hidden items-center lg:flex">
              {navLinks.map((link) => {
                const activeLink = link.href.slice(1) === active;
                return (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      aria-current={activeLink ? "true" : undefined}
                      className={cx(
                        "relative block px-1.5 py-2 text-sm whitespace-nowrap transition-colors duration-200",
                        activeLink
                          ? "text-seal"
                          : "text-ink-muted hover:text-seal",
                      )}
                    >
                      {link.label}
                      {activeLink && (
                        <span
                          aria-hidden="true"
                          className="absolute inset-x-1.5 bottom-0.5 h-px bg-seal"
                        />
                      )}
                    </a>
                  </li>
                );
              })}
            </ul>

            <div className="flex shrink-0 items-center gap-1">
              <span className="hidden sm:inline-flex">
                <Button href="#zapisy" variant="solid" size="md">
                  {event.ctaHeader}
                </Button>
              </span>

              <button
                type="button"
                onClick={() => setOpen((prev) => !prev)}
                aria-label={open ? chrome.closeMenu : chrome.openMenu}
                aria-expanded={open}
                aria-controls={MENU_ID}
                className="inline-flex h-11 w-11 items-center justify-center text-ink transition-colors duration-200 hover:text-seal lg:hidden"
              >
                <svg
                  viewBox="0 0 24 24"
                  className="h-6 w-6"
                  aria-hidden="true"
                  focusable="false"
                >
                  <g
                    stroke="currentColor"
                    strokeWidth="1.7"
                    strokeLinecap="round"
                  >
                    <line
                      x1="4"
                      y1="7"
                      x2="20"
                      y2="7"
                      style={{ transformBox: "view-box" }}
                      className={cx(
                        "origin-center transition-transform duration-300 ease-out",
                        open && "translate-y-[3.5px] rotate-45",
                      )}
                    />
                    <line
                      x1="4"
                      y1="12"
                      x2="20"
                      y2="12"
                      className={cx(
                        "transition-opacity duration-200",
                        open ? "opacity-0" : "opacity-100",
                      )}
                    />
                    <line
                      x1="4"
                      y1="17"
                      x2="20"
                      y2="17"
                      style={{ transformBox: "view-box" }}
                      className={cx(
                        "origin-center transition-transform duration-300 ease-out",
                        open && "-translate-y-[3.5px] -rotate-45",
                      )}
                    />
                  </g>
                </svg>
              </button>
            </div>
          </div>
        </Container>

        <div id={MENU_ID} className="lg:hidden">
          {open && (
            <div className="animate-ink-in max-h-[calc(100dvh_-_4rem)] overflow-y-auto border-b border-line bg-paper sm:max-h-[calc(100dvh_-_5rem)]">
              <Container>
                <ul className="flex flex-col">
                  {navLinks.map((link, i) => {
                    const activeLink = link.href.slice(1) === active;
                    return (
                      <li key={link.href} className="border-b border-line">
                        <a
                          href={link.href}
                          onClick={() => setOpen(false)}
                          aria-current={activeLink ? "true" : undefined}
                          className={cx(
                            "group flex items-center gap-5 py-5 transition-colors duration-200",
                            activeLink ? "text-seal" : "text-ink-soft",
                          )}
                        >
                          <span
                            aria-hidden="true"
                            className={cx(
                              "w-6 text-xs tabular-nums",
                              activeLink ? "text-seal" : "text-ink-faint",
                            )}
                          >
                            {String(i + 1).padStart(2, "0")}
                          </span>
                          <span className="flex-1 text-lg">{link.label}</span>
                          <Chevron
                            className={cx(
                              "h-4 w-4 shrink-0 transition-transform duration-200 group-hover:translate-x-0.5",
                              activeLink ? "text-seal" : "text-ink-faint",
                            )}
                          />
                        </a>
                      </li>
                    );
                  })}
                </ul>

                <div className="flex flex-col gap-6 py-8">
                  <p className="text-xs tracking-[0.2em] text-ink-muted uppercase">
                    {event.date} · {event.admission}
                  </p>
                  <Button
                    href="#zapisy"
                    variant="solid"
                    size="md"
                    className="w-full"
                    onClick={() => setOpen(false)}
                  >
                    {event.ctaHeader}
                  </Button>
                </div>
              </Container>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
}
