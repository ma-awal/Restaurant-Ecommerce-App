import site from '@/data/site.json';
import { telHref } from '@/lib/format';
import PageHeader from '@/components/ui/PageHeader';
import Container from '@/components/ui/Container';
import Icon from '@/components/ui/Icon';
import Reveal from '@/components/ui/Reveal';
import ContactForm from '@/components/contact/ContactForm';

export const metadata = {
  title: 'Contact',
  description: 'Get in touch with Flame and Grill Smokehouse for orders, catering and questions.',
};

export default function ContactPage() {
  const details = [
    { icon: 'phone', label: 'Phone', value: site.contact.phone, href: telHref(site.contact.phone) },
    { icon: 'mail', label: 'Email', value: site.contact.email, href: `mailto:${site.contact.email}` },
    { icon: 'pin', label: 'Location', value: site.contact.addressShort, href: '/#location' },
  ];

  return (
    <>
      <PageHeader title="Contact Us" subtitle="Questions, catering or feedback? We would love to hear from you." />
      <section className="bg-paper py-12 text-ink sm:py-16">
        <Container className="grid gap-8 lg:grid-cols-[1fr_1.4fr]">
          <Reveal variant="left" className="space-y-4">
            {details.map((detail) => (
              <a
                key={detail.label}
                href={detail.href}
                className="flex items-center gap-4 rounded-lg bg-white p-5 shadow-card transition-all duration-300 hover:-translate-y-0.5 hover:shadow-cardHover"
              >
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-brand/10 text-brand">
                  <Icon name={detail.icon} size={22} />
                </span>
                <span>
                  <span className="block text-xs font-semibold uppercase tracking-wide text-slate-500">{detail.label}</span>
                  <span className="block font-semibold">{detail.value}</span>
                </span>
              </a>
            ))}
            <div className="rounded-lg bg-ink-900 p-5 text-white shadow-card">
              <p className="flex items-center gap-2 font-display text-lg font-semibold uppercase tracking-wide">
                <Icon name="clock" size={18} className="text-brand" /> Opening Hours
              </p>
              <ul className="mt-3 space-y-1.5 text-sm text-white/70">
                {site.hours.map((row) => (
                  <li key={row.day} className="flex justify-between gap-4">
                    <span>{row.day}</span>
                    <span>{row.time}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
          <Reveal variant="right">
            <ContactForm />
          </Reveal>
        </Container>
      </section>
    </>
  );
}
