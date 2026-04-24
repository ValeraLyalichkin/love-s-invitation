import { motion } from "framer-motion";
import { ReactNode } from "react";

interface SectionProps {
  id?: string;
  children: ReactNode;
  className?: string;
}

export function Section({ id, children, className = "" }: SectionProps) {
  return (
    <motion.section
      id={id}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className={`px-6 py-20 md:py-28 ${className}`}
    >
      <div className="mx-auto max-w-3xl">{children}</div>
    </motion.section>
  );
}

export function SectionTitle({ children, kicker }: { children: ReactNode; kicker?: string }) {
  return (
    <div className="mb-12 text-center">
      {kicker && (
        <p className="mb-3 text-xs uppercase tracking-[0.4em] text-ink-soft/70">{kicker}</p>
      )}
      <h2 className="font-script text-5xl text-ink md:text-6xl">{children}</h2>
      <div className="mx-auto mt-4 h-px w-16 bg-[var(--sand-deep)]/60" />
    </div>
  );
}