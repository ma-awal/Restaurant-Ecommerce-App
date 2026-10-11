import Image from "next/image";
import Link from "next/link";
import site from "@/data/site.json";
import { telHref } from "@/lib/format";
import Container from "@/components/ui/Container";
import Icon from "@/components/ui/Icon";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[#061113] text-white">
      <Container className="grid gap-10 py-10 sm:grid-cols-2 lg:grid-cols-[1.2fr_1fr_1.4fr_1fr] lg:gap-0">
        <div className="lg:pr-8">
          <Link
            href="/"
            aria-label={`${site.name} home`}
            className="inline-block"
          >
            <Image
              src={site.logo.footer}
              alt={site.name}
              width={465}
              height={165}
              className="h-14 w-auto"
            />
          </Link>
        </div>

        <div className="lg:border-l lg:border-white/10 lg:px-8">
          <h3 className="font-display text-lg font-semibold uppercase tracking-wide">
            Quick Links
          </h3>
          <ul className="mt-4 space-y-2">
            {site.quickLinks.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  className="group inline-flex items-center gap-1.5 text-base text-white/70 transition hover:text-brand"
                >
                  <Icon
                    name="chevronRight"
                    size={18}
                    className="text-brand transition-transform group-hover:translate-x-0.5"
                  />
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:border-l lg:border-white/10 lg:px-8">
          <h3 className="font-display text-lg font-semibold uppercase tracking-wide">
            Get In Touch
          </h3>
          <ul className="mt-4 space-y-3 text-base text-white/70">
            <li>
              <a
                href={telHref(site.contact.phone)}
                className="flex items-center gap-3 transition hover:text-brand"
              >
                <Icon name="phone" size={18} className="shrink-0 text-brand" />
                {site.contact.phone}
              </a>
            </li>
            <li>
              <a
                href={`mailto:${site.contact.email}`}
                className="flex items-center gap-3 transition hover:text-brand"
              >
                <Icon name="mail" size={18} className="shrink-0 text-brand" />
                {site.contact.email}
              </a>
            </li>
            <li className="flex items-start gap-3">
              <Icon
                name="pin"
                size={18}
                className="mt-0.5 shrink-0 text-brand"
              />
              {site.contact.addressShort}
            </li>
          </ul>
        </div>

        <div className="lg:border-l lg:border-white/10 lg:pl-8">
          <h3 className="font-display text-lg font-semibold uppercase tracking-wide">
            Follow Us
          </h3>
          <ul className="mt-4 flex gap-3">
            {site.social.map((s) => (
              <li key={s.name}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.name}
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-[#061113] transition-all duration-300 hover:-translate-y-1 hover:bg-brand hover:text-white"
                >
                  <Icon name={s.icon} size={18} />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </Container>

      <div className="border-t border-white/10 bg-[#071216]">
        <Container className="flex flex-col items-center justify-between gap-2 py-4 text-[12px] text-white/60 sm:flex-row">
          <p>
            © {year} {site.shortName} Smokehouse. All rights reserved.
          </p>
          <ul className="flex items-center gap-5">
            {site.legalLinks.map((link) => (
              <li key={link.label}>
                <Link href={link.href} className="transition hover:text-brand">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </div>
    </footer>
  );
}
