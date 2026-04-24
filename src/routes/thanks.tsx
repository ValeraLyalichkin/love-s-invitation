import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";

export const Route = createFileRoute("/thanks")({
  head: () => ({
    meta: [
      { title: "Спасибо · Наталья и Валерий" },
      { name: "description", content: "Спасибо, ваш ответ получен!" },
    ],
  }),
  component: Thanks,
});

function Thanks() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-gradient-hero px-6 py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        className="max-w-lg text-center"
      >
        <p className="text-xs uppercase tracking-[0.5em] text-ink-soft">с любовью</p>
        <h1 className="mt-8 font-script text-6xl text-ink md:text-7xl">Спасибо!</h1>
        <div className="mx-auto my-8 h-px w-16 bg-[var(--sand-deep)]/60" />
        <p className="font-display text-xl italic leading-relaxed text-ink-soft md:text-2xl">
          Ваш ответ получен. Нам очень важно ваше внимание — будем с трепетом ждать встречи
          15 августа 2026 года.
        </p>
        <Link
          to="/"
          className="mt-12 inline-flex items-center justify-center rounded-full border border-ink/30 px-8 py-3 text-sm uppercase tracking-[0.3em] text-ink transition hover:bg-primary hover:text-primary-foreground"
        >
          На главную
        </Link>
      </motion.div>
    </main>
  );
}