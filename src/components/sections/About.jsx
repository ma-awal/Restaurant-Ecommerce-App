import Image from "next/image";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import Icon from "@/components/ui/Icon";
import Reveal from "@/components/ui/Reveal";

export default function About({ data }) {
  return (
    <section id="about" className="bg-paper py-12 text-ink sm:py-16">
      <Container className="grid items-center gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.5fr)_minmax(0,0.5fr)] lg:gap-10">
        <Reveal variant="left">
          <div className="relative aspect-[16/10] overflow-hidden rounded-lg shadow-cardHover">
            <Image
              src={data.image}
              alt={data.imageAlt}
              fill
              sizes="(min-width: 1024px) 30vw, 100vw"
              className="object-cover transition-transform duration-700 hover:scale-105"
            />
          </div>
        </Reveal>

        <Reveal variant="up" delay={120}>
          <p className="font-display text-lg font-semibold uppercase tracking-[0.12em] text-brand">
            {data.eyebrow}
          </p>
          <h2 className="mt-1 font-display text-2xl font-semibold uppercase tracking-wide sm:text-3xl md:text-4xl">
            {data.title}
          </h2>
          <p className="mt-3 max-w-md text-base leading-relaxed text-slate-600">
            {data.text}
          </p>

          <ul className="mt-5 flex flex-wrap gap-x-6 gap-y-3">
            {data.badges.map((badge) => (
              <li
                key={badge.label}
                className="flex items-center gap-2 text-sm font-medium text-slate-700"
              >
                <Icon name={badge.icon} size={20} className="text-brand" />
                {badge.label}
              </li>
            ))}
          </ul>

          {/* <Button href={data.cta.href} size="lg" className="mt-6">
            {data.cta.label}
            <Icon name="arrowRight" size={22} />
          </Button> */}
        </Reveal>

        <Reveal
          variant="right"
          delay={240}
          className="text-center lg:text-left"
        >
          <p className="inline-block -rotate-12 font-script text-4xl leading-tight text-brand sm:text-5xl">
            {data.script.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </p>
        </Reveal>
      </Container>
    </section>
  );
}
