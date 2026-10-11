import Container from '@/components/ui/Container';

export default function PageHeader({ title, subtitle }) {
  return (
    <section className="relative isolate overflow-hidden bg-ink-900 py-14 text-center sm:py-20">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,rgba(249,106,10,0.22),transparent_62%)]" />
      <Container>
        <h1 className="animate-hero-in font-display text-4xl font-bold uppercase tracking-wide text-white sm:text-5xl">
          {title}
        </h1>
        <span className="mx-auto mt-4 block h-0.5 w-16 animate-hero-in bg-brand" style={{ animationDelay: '150ms' }} />
        {subtitle && (
          <p className="mx-auto mt-4 max-w-xl animate-hero-in text-white/70" style={{ animationDelay: '250ms' }}>
            {subtitle}
          </p>
        )}
      </Container>
    </section>
  );
}
