import Container from '@/components/ui/Container';
import Button from '@/components/ui/Button';

export const metadata = { title: 'Page not found' };

export default function NotFound() {
  return (
    <section className="bg-ink-900 py-24 text-center">
      <Container>
        <p className="font-display text-7xl font-bold text-brand">404</p>
        <h1 className="mt-2 font-display text-3xl font-bold uppercase tracking-wide">This page went up in smoke</h1>
        <p className="mt-2 text-white/60">The page you are looking for does not exist or has moved.</p>
        <Button href="/" size="lg" className="mt-8">
          Back to Home
        </Button>
      </Container>
    </section>
  );
}
