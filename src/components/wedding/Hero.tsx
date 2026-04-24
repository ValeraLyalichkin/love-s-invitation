import { motion } from "framer-motion";
import couplePhoto from "@/assets/couple.jpg";

export function Hero() {
  return (
    <section className="relative min-h-screen overflow-hidden bg-gradient-hero px-6 pt-16 pb-24">
      {/* Decorative ornaments */}
      <div className="pointer-events-none absolute inset-0 opacity-40">
        <div className="absolute left-1/2 top-0 h-px w-48 -translate-x-1/2 bg-gradient-to-r from-transparent via-[var(--sand-deep)] to-transparent" />
      </div>

      <div className="mx-auto flex max-w-2xl flex-col items-center text-center">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-xs uppercase tracking-[0.5em] text-ink-soft"
        >
          приглашение на свадьбу
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.15 }}
          className="mt-8 font-script text-6xl leading-none text-ink md:text-8xl"
        >
          Наталья
          <span className="mx-3 align-middle text-4xl text-[var(--sand-deep)] md:text-5xl">
            &amp;
          </span>
          Валерий
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="mt-8 flex items-center gap-4 text-ink-soft"
        >
          <span className="h-px w-12 bg-[var(--sand-deep)]/60" />
          <span className="font-display text-lg italic">15 августа 2026</span>
          <span className="h-px w-12 bg-[var(--sand-deep)]/60" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.6 }}
          className="relative mt-12 w-full max-w-sm"
        >
          <div className="absolute -inset-4 rounded-[40%_60%_55%_45%/50%_40%_60%_50%] bg-sand opacity-50 blur-2xl" />
          <div className="relative overflow-hidden rounded-[48%_52%_48%_52%/55%_45%_55%_45%] shadow-photo">
            <img
              src={couplePhoto}
              alt="Наталья и Валерий"
              className="aspect-[3/4] w-full object-cover"
            />
          </div>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="mt-12 max-w-md font-display text-lg italic leading-relaxed text-ink-soft md:text-xl"
        >
          Дорогие наши, в этот особенный день мы хотим, чтобы рядом были самые близкие. Будем
          счастливы разделить с вами начало нашей семейной истории.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="mt-10 text-xs uppercase tracking-[0.4em] text-ink-soft/60"
        >
          суббота · г. Саранск
        </motion.div>
      </div>
    </section>
  );
}