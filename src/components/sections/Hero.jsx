import Image from "next/image";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import Icon from "@/components/ui/Icon";

export default function Hero({ data }) {
  const delay = (ms) => ({ animationDelay: `${ms}ms` });

  return (
    <section className="relative isolate overflow-hidden bg-black">
      {/* Background photo */}
      <div className="absolute inset-0 -z-10 animate-hero-img lg:left-[28%]">
        <div className="hero-fade relative h-full w-full overflow-hidden">
          <Image
            src={data.image}
            alt={data.imageAlt}
            fill
            priority
            sizes="(min-width: 1024px) 72vw, 100vw"
            className="animate-ken-burns object-cover object-[80%_center] lg:object-right"
          />
        </div>
      </div>
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-black via-black/80 to-black/20 lg:via-black/30 lg:to-transparent" />
      <div className="absolute inset-x-0 top-0 -z-10 h-24 bg-gradient-to-b from-black/60 to-transparent" />

      <Container className="flex min-h-[560px] items-center py-14 lg:min-h-[640px]">
        <div className="max-w-xl">
          <p
            className="animate-hero-in font-script text-2xl text-brand sm:text-3xl"
            style={delay(100)}
          >
            {data.script}
          </p>

          <h1 className="mt-3 font-display font-bold uppercase leading-[0.95] tracking-tight">
            <span
              className="block animate-hero-in text-5xl text-white sm:text-6xl lg:text-[4.6rem]"
              style={delay(250)}
            >
              {data.title}
            </span>
            <span
              className="block animate-hero-in text-5xl text-brand sm:text-6xl lg:text-[4.6rem]"
              style={delay(400)}
            >
              {data.accent}
            </span>
          </h1>

          <div
            className="mt-3 flex animate-hero-in items-center gap-4"
            style={delay(520)}
          >
            <span className="h-0.5 w-10 bg-brand" />
            <span className="font-display text-lg uppercase tracking-[0.45em] text-white">
              {data.country}
            </span>
            <span className="h-0.5 w-10 bg-brand" />
          </div>

          <ul
            className="mt-6 flex animate-hero-in flex-wrap items-center gap-x-3 gap-y-2 font-semibold text-white"
            style={delay(640)}
          >
            {data.highlights.map((text, index) => (
              <li key={text} className="flex items-center gap-3">
                {index > 0 && (
                  <span
                    className="h-1.5 w-1.5 rounded-full bg-brand"
                    aria-hidden="true"
                  />
                )}
                {text}
              </li>
            ))}
          </ul>

          <p
            className="mt-4 max-w-md animate-hero-in text-base leading-relaxed text-white/85"
            style={delay(760)}
          >
            {data.description}
          </p>

          <div
            className="mt-8 flex animate-hero-in flex-wrap gap-4"
            style={delay(900)}
          >
            <Button href={data.primaryCta.href} size="lg">
              <Icon name={data.primaryCta.icon} size={18} />
              {data.primaryCta.label}
              <Icon name="chevronRight" size={18} />
            </Button>
            <Button href={data.secondaryCta.href} variant="outline" size="lg">
              <Icon name={data.secondaryCta.icon} size={18} />
              {data.secondaryCta.label}
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
