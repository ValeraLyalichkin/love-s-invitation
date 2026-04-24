import { Section, SectionTitle } from "./Section";

const ADDRESS = "Республика Мордовия, г. Саранск, ул. Республиканская, 103";
const ROUTE_URL = `https://yandex.ru/maps/?rtext=~${encodeURIComponent("Саранск, ул. Республиканская, 103, AZIMUT Отель")}&rtt=auto`;
const MAP_URL =
  "https://yandex.ru/map-widget/v1/?ll=45.169,54.187&z=15&pt=45.1825,54.1860,pm2rdm&l=map";

export function Venue() {
  return (
    <Section className="bg-gradient-section">
      <SectionTitle kicker="место проведения">AZIMUT Отель</SectionTitle>

      <p className="text-center font-display text-lg italic text-ink-soft md:text-xl">
        {ADDRESS}
      </p>

      <div className="mt-10 overflow-hidden rounded-3xl border border-[var(--sand-deep)]/20 shadow-soft">
        <iframe
          src={MAP_URL}
          title="AZIMUT Отель Саранск"
          className="h-[360px] w-full md:h-[440px]"
          loading="lazy"
        />
      </div>

      <div className="mt-8 text-center">
        <a
          href={ROUTE_URL}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center justify-center rounded-full border border-[var(--ink-soft)]/40 bg-card/60 px-8 py-3 text-sm uppercase tracking-[0.3em] text-ink transition hover:bg-primary hover:text-primary-foreground"
        >
          Построить маршрут
        </a>
      </div>
    </Section>
  );
}