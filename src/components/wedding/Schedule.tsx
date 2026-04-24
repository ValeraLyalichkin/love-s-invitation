import { Section, SectionTitle } from "./Section";

const items = [
  { time: "15:00", title: "Welcome", desc: "Сбор гостей, аперитив и фотографии" },
  { time: "15:30", title: "Церемония", desc: "Самый трогательный момент дня" },
  { time: "16:00", title: "Банкет", desc: "Поздравления, ужин и душевные тосты" },
  { time: "20:00", title: "Свадебный торт", desc: "Сладкий символ нашей новой жизни" },
  { time: "21:00", title: "Финал вечера", desc: "Танцы и тёплые проводы" },
];

export function Schedule() {
  return (
    <Section>
      <SectionTitle kicker="программа дня">План вечера</SectionTitle>
      <ol className="relative space-y-10 border-l border-[var(--sand-deep)]/30 pl-8 md:pl-12">
        {items.map((item) => (
          <li key={item.time} className="relative">
            <span className="absolute -left-[37px] top-2 flex h-4 w-4 items-center justify-center md:-left-[53px]">
              <span className="h-2 w-2 rounded-full bg-[var(--sand-deep)]" />
              <span className="absolute h-4 w-4 rounded-full border border-[var(--sand-deep)]/40" />
            </span>
            <div className="font-display text-3xl text-[var(--sand-deep)] md:text-4xl">
              {item.time}
            </div>
            <div className="mt-1 font-display text-xl text-ink md:text-2xl">{item.title}</div>
            <p className="mt-1 text-sm text-ink-soft md:text-base">{item.desc}</p>
          </li>
        ))}
      </ol>
    </Section>
  );
}