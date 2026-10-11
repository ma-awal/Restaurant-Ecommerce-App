import PageHeader from '@/components/ui/PageHeader';
import Container from '@/components/ui/Container';
import Reveal from '@/components/ui/Reveal';

export default function LegalPage({ data }) {
  return (
    <>
      <PageHeader title={data.title} subtitle={`Last updated ${data.updated}`} />
      <section className="bg-paper py-12 text-ink sm:py-16">
        <Container className="max-w-3xl">
          <div className="space-y-8 rounded-lg bg-white p-6 shadow-card sm:p-10">
            {data.sections.map((section, index) => (
              <Reveal key={section.heading} variant="up" delay={index * 60}>
                <h2 className="font-display text-xl font-bold uppercase tracking-wide">{section.heading}</h2>
                <p className="mt-2 leading-relaxed text-slate-600">{section.body}</p>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
