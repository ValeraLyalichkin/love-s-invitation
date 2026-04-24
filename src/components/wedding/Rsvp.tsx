import { useMemo, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { z } from "zod";
import { Section, SectionTitle } from "./Section";

// ⚠️ Token is exposed in the client bundle per user's choice.
// Recommend rotating in @BotFather after the wedding.
const TG_TOKEN = "8721644593:AAEH3iS0MueJTvQDAZ3lNDI3JIZbj8XzZK4";
const TG_CHAT_ID = "1231365096";

const ALCOHOL = [
  "Красное вино",
  "Белое вино",
  "Шампанское",
  "Виски",
  "Водка",
  "Самогонка",
] as const;

const NO_ALCOHOL = "Не буду пить алкоголь";

const schema = z.object({
  name: z.string().trim().min(2, "Укажите имя и фамилию").max(100),
  attending: z.enum(["yes", "no"], { message: "Выберите вариант" }),
  transfer: z.enum(["no", "after"], { message: "Выберите вариант" }),
  drinks: z.array(z.string()).min(1, "Выберите хотя бы один вариант"),
  allergies: z.string().trim().max(500).optional(),
});

export function Rsvp() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [attending, setAttending] = useState<"yes" | "no" | "">("");
  const [transfer, setTransfer] = useState<"no" | "after" | "">("");
  const [drinks, setDrinks] = useState<string[]>([]);
  const [allergies, setAllergies] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);

  const hasAlcohol = useMemo(() => drinks.some((d) => d !== NO_ALCOHOL), [drinks]);

  function toggleDrink(value: string) {
    setDrinks((prev) => {
      if (prev.includes(value)) return prev.filter((v) => v !== value);
      if (value === NO_ALCOHOL) return [NO_ALCOHOL];
      return [...prev.filter((v) => v !== NO_ALCOHOL), value];
    });
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const result = schema.safeParse({ name, attending, transfer, drinks, allergies });
    if (!result.success) {
      const fe: Record<string, string> = {};
      result.error.issues.forEach((i) => {
        if (i.path[0]) fe[String(i.path[0])] = i.message;
      });
      setErrors(fe);
      return;
    }
    setErrors({});
    setSubmitting(true);

    const lines = [
      "💍 *Новая анкета гостя*",
      "",
      `*Имя:* ${result.data.name}`,
      `*Присутствие:* ${result.data.attending === "yes" ? "✅ Да" : "❌ Нет"}`,
      `*Трансфер:* ${result.data.transfer === "after" ? "Только после торжества" : "Не нужен"}`,
      `*Напитки:* ${result.data.drinks.join(", ")}`,
      `*Аллергия:* ${result.data.allergies?.trim() || "—"}`,
    ];

    try {
      const res = await fetch(`https://api.telegram.org/bot${TG_TOKEN}/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: TG_CHAT_ID,
          text: lines.join("\n"),
          parse_mode: "Markdown",
        }),
      });
      if (!res.ok) throw new Error("send failed");
      navigate({ to: "/thanks" });
    } catch {
      setErrors({ form: "Не удалось отправить. Попробуйте ещё раз или напишите нам напрямую." });
      setSubmitting(false);
    }
  }

  return (
    <Section id="rsvp">
      <SectionTitle kicker="анкета гостя">Подтвердите визит</SectionTitle>

      <form
        onSubmit={onSubmit}
        className="rounded-3xl border border-[var(--sand-deep)]/20 bg-card/70 p-6 shadow-soft md:p-10"
        noValidate
      >
        {/* Name */}
        <div className="mb-6">
          <label className="mb-2 block text-xs uppercase tracking-[0.3em] text-ink-soft">
            Имя и фамилия
          </label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            maxLength={100}
            className="w-full border-0 border-b border-[var(--sand-deep)]/40 bg-transparent px-0 py-2 font-display text-lg text-ink outline-none transition focus:border-[var(--ink)]"
            placeholder="Иван Иванов"
          />
          {errors.name && <p className="mt-2 text-xs text-destructive">{errors.name}</p>}
        </div>

        {/* Attending */}
        <div className="mb-6">
          <label className="mb-3 block text-xs uppercase tracking-[0.3em] text-ink-soft">
            Сможете ли вы присутствовать?
          </label>
          <div className="flex gap-3">
            {[
              { v: "yes", label: "Да, буду" },
              { v: "no", label: "К сожалению, нет" },
            ].map((o) => (
              <button
                key={o.v}
                type="button"
                onClick={() => setAttending(o.v as "yes" | "no")}
                className={`flex-1 rounded-full border px-5 py-3 text-sm transition ${
                  attending === o.v
                    ? "border-ink bg-primary text-primary-foreground"
                    : "border-[var(--sand-deep)]/30 bg-transparent text-ink hover:border-ink/50"
                }`}
              >
                {o.label}
              </button>
            ))}
          </div>
          {errors.attending && (
            <p className="mt-2 text-xs text-destructive">{errors.attending}</p>
          )}
        </div>

        {/* Transfer */}
        <div className="mb-6">
          <label className="mb-3 block text-xs uppercase tracking-[0.3em] text-ink-soft">
            Потребуется ли трансфер?
          </label>
          <div className="flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              onClick={() => setTransfer("no")}
              className={`flex-1 rounded-full border px-5 py-3 text-sm transition ${
                transfer === "no"
                  ? "border-ink bg-primary text-primary-foreground"
                  : "border-[var(--sand-deep)]/30 text-ink hover:border-ink/50"
              }`}
            >
              Не нужен
            </button>
            <div className="group relative flex-1">
              <button
                type="button"
                onClick={() => setTransfer("after")}
                className={`w-full rounded-full border px-5 py-3 text-sm transition ${
                  transfer === "after"
                    ? "border-ink bg-primary text-primary-foreground"
                    : "border-[var(--sand-deep)]/30 text-ink hover:border-ink/50"
                }`}
              >
                Только после торжества
              </button>
              <div className="pointer-events-none absolute left-1/2 top-full z-10 mt-2 w-64 -translate-x-1/2 rounded-lg bg-ink p-3 text-xs text-primary-foreground opacity-0 shadow-lg transition group-hover:opacity-100">
                Трансфер будет организован после завершения торжества для гостей, направляющихся
                в село Атемар.
              </div>
            </div>
          </div>
          {errors.transfer && (
            <p className="mt-2 text-xs text-destructive">{errors.transfer}</p>
          )}
        </div>

        {/* Drinks */}
        <div className="mb-6">
          <label className="mb-3 block text-xs uppercase tracking-[0.3em] text-ink-soft">
            Какой алкоголь вы предпочитаете?
          </label>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
            {ALCOHOL.map((d) => (
              <label
                key={d}
                className={`flex cursor-pointer items-center gap-2 rounded-xl border px-3 py-2 text-sm transition ${
                  drinks.includes(d)
                    ? "border-ink bg-sand/40"
                    : "border-[var(--sand-deep)]/30"
                }`}
              >
                <input
                  type="checkbox"
                  checked={drinks.includes(d)}
                  onChange={() => toggleDrink(d)}
                  className="h-4 w-4 accent-[var(--ink)]"
                />
                <span className="text-ink">{d}</span>
              </label>
            ))}
            <label
              className={`col-span-2 flex cursor-pointer items-center gap-2 rounded-xl border px-3 py-2 text-sm transition sm:col-span-3 ${
                hasAlcohol
                  ? "cursor-not-allowed border-[var(--sand-deep)]/20 opacity-40"
                  : drinks.includes(NO_ALCOHOL)
                    ? "border-ink bg-sand/40"
                    : "border-[var(--sand-deep)]/30"
              }`}
            >
              <input
                type="checkbox"
                disabled={hasAlcohol}
                checked={drinks.includes(NO_ALCOHOL)}
                onChange={() => toggleDrink(NO_ALCOHOL)}
                className="h-4 w-4 accent-[var(--ink)]"
              />
              <span className="text-ink">{NO_ALCOHOL}</span>
            </label>
          </div>
          {errors.drinks && <p className="mt-2 text-xs text-destructive">{errors.drinks}</p>}
        </div>

        {/* Allergies */}
        <div className="mb-8">
          <label className="mb-2 block text-xs uppercase tracking-[0.3em] text-ink-soft">
            Есть ли у вас аллергия на какие-либо продукты?
          </label>
          <textarea
            value={allergies}
            onChange={(e) => setAllergies(e.target.value)}
            maxLength={500}
            rows={3}
            className="w-full rounded-xl border border-[var(--sand-deep)]/40 bg-transparent px-4 py-3 text-ink outline-none transition focus:border-[var(--ink)]"
            placeholder="Если нет — оставьте пустым"
          />
        </div>

        {errors.form && (
          <p className="mb-4 text-center text-sm text-destructive">{errors.form}</p>
        )}

        <button
          type="submit"
          disabled={submitting}
          className="block w-full rounded-full bg-primary px-8 py-4 text-sm uppercase tracking-[0.3em] text-primary-foreground transition hover:opacity-90 disabled:opacity-60"
        >
          {submitting ? "Отправляем…" : "Отправить ответ"}
        </button>
      </form>
    </Section>
  );
}