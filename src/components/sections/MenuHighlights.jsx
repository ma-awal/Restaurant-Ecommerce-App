import Link from "next/link";
import { getHighlights } from "@/lib/menu";
import Container from "@/components/ui/Container";
import Icon from "@/components/ui/Icon";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import MenuCard from "@/components/menu/MenuCard";

export default function MenuHighlights({ data }) {
  const highlights = getHighlights();

  return (
    <section id="menu" className="bg-paper py-12 text-ink sm:py-14">
      <Container>
        <Reveal variant="down" className="relative">
          <SectionHeading eyebrow={data.eyebrow} title={data.title} lines />
          <Link
            href={data.linkHref}
            className="group mt-3 flex items-center justify-center gap-1 text-base font-semibold text-brand md:absolute md:bottom-1 md:right-0 md:mt-0"
          >
            {data.linkLabel}
            <Icon
              name="arrowRight"
              size={22}
              className="transition-transform group-hover:translate-x-1"
            />
          </Link>
        </Reveal>

        <ul className="mt-8 grid grid-cols-2 gap-3 sm:gap-5 md:grid-cols-3 lg:grid-cols-5">
          {highlights.map((item, index) => (
            <li key={item.id} className="h-full">
              <Reveal variant="up" delay={index * 110} className="h-full">
                <MenuCard item={item} />
              </Reveal>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
