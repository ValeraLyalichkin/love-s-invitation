import { useEffect, useState } from "react";
import { Section, SectionTitle } from "./Section";

const TARGET = new Date("2026-08-15T15:00:00+03:00").getTime();

function calc() {
  const diff = Math.max(0, TARGET - Date.now());
  const days = Math.floor(diff / 86400000);
  const hours = Math.floor((diff % 86400000) / 3600000);
  const minutes = Math.floor((diff % 3600000) / 60000);
  const seconds = Math.floor((diff % 60000) / 1000);
  return { days, hours, minutes, seconds };
}

function pluralize(n: number, forms: [string, string, string]) {
  const mod10 = n % 10;
  const mod100 = n % 100;
  if (mod10 === 1 && mod100 !== 11) return forms[0];
  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 10 || mod100 >= 20)) return forms[1];
  return forms[2];
}

export function Countdown() {
  const [t, setT] = useState(calc());

  useEffect(() => {
    const id = setInterval(() => setT(calc()), 1000);
    return () => clearInterval(id);
  }, []);

  const items = [
    { value: t.days, label: pluralize(t.days, ["день", "дня", "дней"]) },
    { value: t.hours, label: pluralize(t.hours, ["час", "часа", "часов"]) },
    { value: t.minutes, label: pluralize(t.minutes, ["минута", "минуты", "минут"]) },
    { value: t.seconds, label: pluralize(t.seconds, ["секунда", "секунды", "секунд"]) },
  ];

  return (
    <Section className="bg-gradient-section">
      <SectionTitle kicker="до торжества осталось">Совсем скоро</SectionTitle>
      <div className="grid grid-cols-4 gap-2 md:gap-4">
        {items.map((item) => (
          <div
            key={item.label}
            className="rounded-2xl border border-[var(--sand-deep)]/20 bg-card/60 px-2 py-6 text-center backdrop-blur-sm shadow-soft md:py-8"
          >
            <div className="font-display text-4xl text-ink md:text-6xl">
              {String(item.value).padStart(2, "0")}
            </div>
            <div className="mt-1 text-[10px] uppercase tracking-[0.25em] text-ink-soft md:text-xs">
              {item.label}
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}