import { Container } from "@/components/ui/Container";
import { stats } from "@/config/site";

export function Stats() {
  return (
    <section id="guven" aria-label="Danışmanlık yaklaşımının öne çıkanları" className="relative z-10 bg-navy text-white">
      <Container>
        <div className="grid border-y border-white/12 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <div key={stat.label} className="relative px-5 py-7 sm:px-7 lg:py-9">
              {index > 0 && <span className="absolute top-1/2 left-0 hidden h-10 w-px -translate-y-1/2 bg-white/12 lg:block" />}
              <p className="font-serif text-2xl font-semibold text-gold-light">{stat.value}</p>
              <p className="mt-1 text-xs tracking-[0.12em] text-white/55 uppercase">{stat.label}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
