"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { RippleButton } from "@/components/motion/ripple-button";
import { site } from "@/data/site";
import type { AppDictionary } from "@/i18n/dictionaries";
import { EASE_EDITORIAL } from "@/lib/motion";
import { cn } from "@/lib/utils";

/**
 * One enquiry journey.
 *
 * Seven steps, one question each, so the visitor is never looking at a wall of
 * fields. There is no backend: the answers are assembled into a message and
 * handed to WhatsApp or email, which are the two channels that actually get
 * read. Nothing is stored or transmitted anywhere else.
 */

type StepKind = "choice" | "text" | "contact";

interface Step {
  id: string;
  question: string;
  hint?: string;
  kind: StepKind;
  options?: string[];
  optional?: boolean;
  placeholder?: string;
}

type Answers = Record<string, string>;

export function Enquiry({ dictionary }: { dictionary: AppDictionary }) {
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const reduced = useReducedMotion();

  const steps: Step[] = useMemo(
    () =>
      dictionary.enquiry.steps.map((step) => ({
        ...step,
        kind: step.id === "contact" ? "contact" : step.options ? "choice" : "text",
      })),
    [dictionary.enquiry.steps],
  );

  const step = steps[index];
  const isLast = index === steps.length - 1;

  const canAdvance =
    step.kind === "contact"
      ? name.trim().length > 1 && contact.trim().length > 3
      : step.optional || (answers[step.id]?.trim().length ?? 0) > 0;

  const message = useMemo(() => {
    const lines = steps.filter((s) => s.kind !== "contact")
      .map((s) => {
        const value = answers[s.id]?.trim();
        return value ? `${s.question}\n${value}` : null;
      })
      .filter(Boolean);
    const intro = dictionary.enquiry.messageIntro
      .replace("{name}", name || "—")
      .replace("{contact}", contact || "—");
    return [intro, ...lines].join(
      "\n\n",
    );
  }, [answers, contact, dictionary, name, steps]);

  const whatsapp = `${site.contact.whatsapp}?text=${encodeURIComponent(message)}`;
  const mailto = `mailto:${site.contact.email}?subject=${encodeURIComponent(
    dictionary.enquiry.subject.replace(
      "{name}",
      name || (dictionary.locale === "en" ? "New enquiry" : dictionary.locale === "es" ? "Nueva consulta" : "Neue Anfrage"),
    ),
  )}&body=${encodeURIComponent(message)}`;

  function set(value: string) {
    setAnswers((a) => ({ ...a, [step.id]: value }));
  }

  const done = index >= steps.length;

  return (
    <div className="flex flex-col gap-10">
      <ol className="flex gap-1.5" aria-hidden>
        {steps.map((s, i) => (
          <li
            key={s.id}
            className={cn(
              "h-px flex-1 transition-colors duration-500",
              i <= index ? "bg-content" : "bg-rule",
            )}
          />
        ))}
      </ol>

      <AnimatePresence mode="wait">
        {done ? (
          <motion.div
            key="done"
            initial={{ opacity: 0, y: reduced ? 0 : 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: EASE_EDITORIAL }}
            className="flex flex-col gap-8"
          >
            <div className="flex flex-col gap-4">
              <span className="label text-content-faint">{dictionary.enquiry.ready}</span>
              <h3 className="font-display text-title leading-tight">
                {dictionary.enquiry.readyTitle}
              </h3>
              <p className="max-w-lg text-sm leading-relaxed text-content-muted">
                {dictionary.enquiry.readyText}
              </p>
            </div>

            <pre className="max-h-64 overflow-auto whitespace-pre-wrap border border-rule bg-surface-raised p-5 text-sm leading-relaxed text-content-muted">
              {message}
            </pre>

            <div className="flex flex-wrap gap-3">
              <RippleButton href={whatsapp}>{dictionary.enquiry.sendWhatsapp}</RippleButton>
              <RippleButton href={mailto} variant="outline">
                {dictionary.enquiry.sendEmail}
              </RippleButton>
              <button
                type="button"
                onClick={() => setIndex(steps.length - 1)}
                className="label px-2 text-content-muted transition-colors hover:text-content"
              >
                {dictionary.enquiry.back}
              </button>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key={step.id}
            initial={{ opacity: 0, y: reduced ? 0 : 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: reduced ? 0 : -12 }}
            transition={{ duration: 0.35, ease: EASE_EDITORIAL }}
            className="flex flex-col gap-7"
          >
            <div className="flex flex-col gap-2">
              <span className="label text-content-faint">
                {String(index + 1).padStart(2, "0")} / {String(steps.length).padStart(2, "0")}
              </span>
              <h3 className="font-display text-title leading-tight">
                {step.question}
              </h3>
              {step.hint && (
                <p className="text-sm text-content-muted">{step.hint}</p>
              )}
            </div>

            {step.kind === "choice" && (
              <fieldset className="flex flex-wrap gap-2">
                <legend className="sr-only">{step.question}</legend>
                {step.options?.map((option) => {
                  const selected = answers[step.id] === option;
                  return (
                    <button
                      key={option}
                      type="button"
                      aria-pressed={selected}
                      onClick={() => set(option)}
                      className={cn(
                        "rounded-full border px-5 py-2.5 text-sm transition-colors",
                        selected
                          ? "border-content bg-content text-surface"
                          : "border-rule text-content-muted hover:border-content hover:text-content",
                      )}
                    >
                      {option}
                    </button>
                  );
                })}
              </fieldset>
            )}

            {step.kind === "text" && (
              <>
                <label htmlFor={step.id} className="sr-only">
                  {step.question}
                </label>
                <textarea
                  id={step.id}
                  rows={4}
                  value={answers[step.id] ?? ""}
                  onChange={(e) => set(e.target.value)}
                  placeholder={step.placeholder}
                  className="w-full resize-none border border-rule bg-transparent p-4 text-base leading-relaxed outline-none placeholder:text-content-faint focus-visible:border-content"
                />
              </>
            )}

            {step.kind === "contact" && (
              <div className="grid gap-4 md:grid-cols-2">
                <Field
                  id="enquiry-name"
                  label={dictionary.enquiry.name}
                  value={name}
                  onChange={setName}
                  autoComplete="name"
                />
                <Field
                  id="enquiry-contact"
                  label={dictionary.enquiry.contact}
                  value={contact}
                  onChange={setContact}
                  autoComplete="email"
                />
              </div>
            )}

            <div className="flex items-center gap-4">
              {index > 0 && (
                <button
                  type="button"
                  onClick={() => setIndex((i) => i - 1)}
                  className="label text-content-muted transition-colors hover:text-content"
                >
                  {dictionary.enquiry.back}
                </button>
              )}
              <RippleButton
                onClick={() => canAdvance && setIndex((i) => i + 1)}
                className={cn(!canAdvance && "pointer-events-none opacity-40")}
              >
                {isLast ? dictionary.enquiry.review : dictionary.enquiry.continue}
              </RippleButton>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function Field({
  id,
  label,
  value,
  onChange,
  autoComplete,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  autoComplete: string;
}) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="label text-content-faint">
        {label}
      </label>
      <input
        id={id}
        type="text"
        value={value}
        autoComplete={autoComplete}
        onChange={(e) => onChange(e.target.value)}
        className="border border-rule bg-transparent px-4 py-3 text-base outline-none focus-visible:border-content"
      />
    </div>
  );
}
