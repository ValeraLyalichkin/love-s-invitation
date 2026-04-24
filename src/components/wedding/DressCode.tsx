import { Section, SectionTitle } from "./Section";

const palette = [
  { hex: "#13273F", name: "Midnight" },
  { hex: "#25344F", name: "Navy" },
  { hex: "#374653", name: "Slate" },
  { hex: "#617891", name: "Steel Blue" },
  { hex: "#8198AA", name: "Dusty Sky" },
  { hex: "#B7D1EA", name: "Powder Blue" },
  { hex: "#6F4D38", name: "Cocoa" },
  { hex: "#998C73", name: "Khaki" },
  { hex: "#D5B893", name: "Sand" },
  { hex: "#D6B896", name: "Champagne" },
];

export function DressCode() {
  return (
    <Section>
      <SectionTitle kicker="дресс-код">Палитра вечера</SectionTitle>
      <p className="mx-auto max-w-xl text-center font-display text-lg italic leading-relaxed text-ink-soft md:text-xl">
        Будем благодарны, если при выборе нарядов на наше торжество вы придержитесь следующей
        палитры — это поможет создать единый и гармоничный образ праздника.
      </p>

      <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-5">
        {palette.map((c) => (
          <div key={c.hex} className="group flex flex-col items-center text-center">
            <div
              className="aspect-square w-full rounded-full shadow-soft ring-1 ring-[var(--sand-deep)]/20 transition group-hover:scale-105"
              style={{ backgroundColor: c.hex }}
              aria-label={c.name}
            />
            <div className="mt-3 font-display text-sm text-ink">{c.name}</div>
            <div className="text-[10px] uppercase tracking-[0.2em] text-ink-soft/70">
              {c.hex}
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}