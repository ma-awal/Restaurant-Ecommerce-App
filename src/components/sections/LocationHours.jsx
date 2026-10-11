import Image from "next/image";
import site from "@/data/site.json";
import { mapsDirectionsUrl } from "@/lib/format";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import Icon from "@/components/ui/Icon";
import Reveal from "@/components/ui/Reveal";
import HoursList from "@/components/sections/HoursList";

export default function LocationHours({ data }) {
  const directions = mapsDirectionsUrl();

  return (
    <section id="location" className="bg-white py-10 text-ink sm:py-12">
      <Container className="grid   gap-8 lg:grid-cols-[1fr_1.7fr_1fr] lg:gap-0">
        <Reveal variant="left" className="flex gap-4 lg:pr-8">
          <Icon name="pin" size={30} className="mt-0.5 shrink-0 text-brand" />
          <div>
            <h3 className="font-display text-lg font-bold uppercase tracking-wide">
              {data.locationTitle}
            </h3>
            <address className="mt-2 text-base not-italic leading-relaxed text-slate-600">
              {site.contact.addressLines.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </address>
            <Button
              href={directions}
              target="_blank"
              rel="noopener noreferrer"
              variant="dark"
              size="sm"
              className="mt-4"
            >
              {data.directionsLabel}
              <Icon name="arrowRight" size={12} />
            </Button>
          </div>
        </Reveal>

        <Reveal
          variant="zoom"
          delay={120}
          className="lg:border-x lg:border-slate-200 lg:px-8"
        >
          <a
            href={directions}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Open the map in Google Maps"
            className="group relative block aspect-[963/330] overflow-hidden rounded-md border border-slate-200 shadow-card"
          >
            <Image
              src={data.mapImage}
              alt={data.mapAlt}
              fill
              sizes="(min-width: 1024px) 45vw, 100vw"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <span className="absolute inset-0 flex items-center justify-center bg-ink/0 opacity-0 transition-all duration-300 group-hover:bg-ink/40 group-hover:opacity-100">
              <span className="flex items-center gap-2 rounded-full bg-brand px-4 py-2 text-xs font-semibold text-white">
                <Icon name="navigation" size={14} />
                Open in Google Maps
              </span>
            </span>
          </a>
        </Reveal>

        <Reveal variant="right" delay={240} className="flex gap-4 lg:pl-8">
          <Icon name="clock" size={30} className="mt-0.5 shrink-0 text-brand" />
          <div className="min-w-0 flex-1">
            <h3 className="font-display text-lg font-bold uppercase tracking-wide">
              {data.hoursTitle}
            </h3>
            <HoursList />
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
