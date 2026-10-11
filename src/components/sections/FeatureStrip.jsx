import Container from "@/components/ui/Container";
import Icon from "@/components/ui/Icon";
import Reveal from "@/components/ui/Reveal";

export default function FeatureStrip({ items }) {
  return (
    <section className="border-y border-white/5 bg-ink-900">
      <Container className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((item, index) => (
          <Reveal
            key={item.title}
            variant="up"
            delay={index * 110}
            className={`group flex items-center gap-4 px-2 py-5 lg:px-8 ${
              index > 0 ? "lg:border-l lg:border-white/10" : "lg:pl-0"
            }`}
          >
            <Icon
              name={item.icon}
              size={44}
              strokeWidth={1.6}
              className="shrink-0 text-brand transition-transform duration-500 group-hover:scale-110"
            />
            <div>
              <p className="text-lg font-medium">{item.title}</p>
              <p className="text-sm text-white/60">{item.text}</p>
            </div>
          </Reveal>
        ))}
      </Container>
    </section>
  );
}
