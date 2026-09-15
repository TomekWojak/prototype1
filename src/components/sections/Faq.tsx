"use client";

import { useState } from "react";
import {
  Button,
  Container,
  cx,
  Section,
  SectionHeading,
} from "@/components/ui";
import type { Question, Content } from "@/lib/content";

function PlusMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 16 16"
      className={className}
      aria-hidden="true"
      focusable="false"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
    >
      <path d="M8 2.4V13.6" />
      <path d="M2.4 8H13.6" />
    </svg>
  );
}

export default function Faq({
  faq,
  faqCopy,
}: {
  faq: readonly Question[];
  faqCopy: Content["faqCopy"];
}) {
  const [open, setOpen] = useState<ReadonlySet<string>>(new Set());

  function toggle(question: string) {
    setOpen((current) => {
      const next = new Set(current);
      if (!next.delete(question)) next.add(question);
      return next;
    });
  }

  return (
    <Section id="faq" tone="soft" labelledBy="faq-tytul">
      <Container className="relative">
        <SectionHeading
          id="faq-tytul"
          eyebrow={faqCopy.eyebrow}
          align="center"
          title={faqCopy.title}
          lead={faqCopy.lead}
        />

        <div className="mx-auto mt-20 max-w-3xl divide-y divide-line border-y border-line">
          {faq.map((item, index) => {
            const isOpen = open.has(item.q);
            const buttonId = `faq-pytanie-${index}`;
            const panelId = `faq-odpowiedz-${index}`;

            return (
              <div key={item.q}>
                <h3>
                  <button
                    type="button"
                    id={buttonId}
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => toggle(item.q)}
                    className="flex w-full cursor-pointer items-start justify-between gap-6 py-7 text-left font-display text-xl text-ink transition-colors hover:text-seal"
                  >
                    <span className="text-balance">{item.q}</span>

                    <PlusMark
                      className={cx(
                        "mt-2 h-5 w-5 shrink-0 text-ink-faint transition-transform duration-300",
                        isOpen && "rotate-45",
                      )}
                    />
                  </button>
                </h3>

                <div
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  inert={!isOpen}
                  className={cx(
                    "grid transition-[grid-template-rows] duration-300 ease-out",
                    isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
                  )}
                >
                  <div className="min-h-0 overflow-hidden">
                    <p className="pr-10 pb-7 text-base text-ink-muted">
                      {item.a}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-16 text-center">
          <h3 className="text-2xl">{faqCopy.ctaTitle}</h3>

          <Button href="#kontakt" variant="outline" className="mt-6">
            {faqCopy.ctaLabel}
          </Button>
        </div>
      </Container>
    </Section>
  );
}
