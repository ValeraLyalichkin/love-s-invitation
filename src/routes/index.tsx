import { createFileRoute } from "@tanstack/react-router";
import { Hero } from "@/components/wedding/Hero";
import { Countdown } from "@/components/wedding/Countdown";
import { Schedule } from "@/components/wedding/Schedule";
import { Venue } from "@/components/wedding/Venue";
import { DressCode } from "@/components/wedding/DressCode";
import { Gifts } from "@/components/wedding/Gifts";
import { Rsvp } from "@/components/wedding/Rsvp";
import { Footer } from "@/components/wedding/Footer";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Наталья и Валерий · 15 августа 2026" },
      {
        name: "description",
        content:
          "Приглашаем вас разделить с нами самый важный день — нашу свадьбу 15 августа 2026 года в Саранске.",
      },
      { property: "og:title", content: "Наталья и Валерий · 15.08.2026" },
      {
        property: "og:description",
        content: "Свадебное приглашение. AZIMUT Отель, Саранск.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <main className="min-h-screen scroll-smooth bg-background">
      <Hero />
      <Countdown />
      <Schedule />
      <Venue />
      <DressCode />
      <Gifts />
      <Rsvp />
      <Footer />
    </main>
  );
}
