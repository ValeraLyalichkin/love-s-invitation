import { Section, SectionTitle } from "./Section";

export function Gifts() {
  return (
    <Section className="bg-gradient-section">
      <SectionTitle kicker="подарки">С теплом</SectionTitle>
      <div className="rounded-3xl border border-[var(--sand-deep)]/20 bg-card/60 p-10 text-center shadow-soft md:p-14">
        <p className="font-display text-2xl italic leading-relaxed text-ink md:text-3xl">
          Самый ценный подарок — ваше присутствие.
        </p>
        <div className="mx-auto my-6 h-px w-12 bg-[var(--sand-deep)]/50" />
        <p className="font-display text-base leading-relaxed text-ink-soft md:text-lg">
          Если вы хотите дополнить его чем-то, мы будем благодарны любому денежному вкладу
          в наше совместное будущее.
        </p>
      </div>
    </Section>
  );
}