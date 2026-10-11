import Image from 'next/image';
import about from '@/data/about.json';
import PageHeader from '@/components/ui/PageHeader';
import Container from '@/components/ui/Container';
import Button from '@/components/ui/Button';
import Icon from '@/components/ui/Icon';
import Reveal from '@/components/ui/Reveal';
import SectionHeading from '@/components/ui/SectionHeading';

export const metadata = {
  title: 'About Us',
  description: 'The story behind Flame and Grill Smokehouse, our Australian smoked-meat food truck.',
};

export default function AboutPage() {
  return (
    <>
      <PageHeader title={about.title} subtitle={about.subtitle} />

      <section className="bg-paper py-12 text-ink sm:py-16">
        <Container className="grid items-center gap-10 lg:grid-cols-2">
          <Reveal variant="left">
            <div className="relative aspect-[16/10] overflow-hidden rounded-lg shadow-cardHover">
              <Image src={about.image} alt={about.imageAlt} fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
            </div>
          </Reveal>
          <Reveal variant="right" className="space-y-4 text-slate-600">
            {about.story.map((paragraph) => (
              <p key={paragraph} className="leading-relaxed">
                {paragraph}
              </p>
            ))}
          </Reveal>
        </Container>
      </section>

      <section className="bg-white py-12 text-ink sm:py-16">
        <Container>
          <Reveal variant="down">
            <SectionHeading title={about.valuesTitle} lines />
          </Reveal>
          <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {about.values.map((value, index) => (
              <li key={value.title}>
                <Reveal variant="up" delay={index * 120} className="h-full rounded-lg bg-paper p-6 text-center shadow-card">
                  <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-brand/10 text-brand">
                    <Icon name={value.icon} size={26} />
                  </span>
                  <h3 className="mt-4 font-bold">{value.title}</h3>
                  <p className="mt-2 text-sm text-slate-600">{value.text}</p>
                </Reveal>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section className="bg-ink-900 py-12 text-center sm:py-16">
        <Container>
          <Reveal variant="zoom">
            <h2 className="font-display text-3xl font-bold uppercase tracking-wide sm:text-4xl">{about.cta.title}</h2>
            <p className="mt-2 text-white/70">{about.cta.text}</p>
            <Button href={about.cta.href} size="lg" className="mt-6">
              {about.cta.label}
              <Icon name="arrowRight" size={16} />
            </Button>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
