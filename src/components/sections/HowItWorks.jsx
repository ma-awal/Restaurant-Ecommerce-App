import Container from "@/components/ui/Container";
import Icon from "@/components/ui/Icon";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import OrderModeCards from "@/components/sections/OrderModeCards";

export default function HowItWorks({ data }) {
  return (
    <section id="how-it-works" className="bg-ink-900 py-12 sm:py-14">
      <Container className="grid gap-10 lg:grid-cols-[1.7fr_1fr] lg:gap-12">
        <div>
          <Reveal variant="left">
            <SectionHeading
              eyebrow={data.eyebrow}
              title={data.title}
              subtitle={data.subtitle}
              align="left"
              tone="dark"
            />
          </Reveal>

          <ol className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-0">
            {data.steps.map((step, index) => (
              <li
                key={step.title}
                className={
                  index > 0 ? "lg:border-l lg:border-white/10 lg:pl-5" : ""
                }
              >
                <Reveal
                  variant="up"
                  delay={index * 140}
                  className="group flex flex-col items-start"
                >
                  <span className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-brand text-brand transition-all duration-300 group-hover:bg-brand group-hover:text-white">
                    <Icon name={step.icon} size={28} strokeWidth={1.6} />
                  </span>
                  <h3 className="mt-4 text-lg font-semibold">
                    {index + 1}. {step.title}
                  </h3>
                  <p className="mt-1 max-w-[190px] text-sm leading-normal text-white/60">
                    {step.text}
                  </p>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>

        <OrderModeCards modes={data.modes} />
      </Container>
    </section>
  );
}
