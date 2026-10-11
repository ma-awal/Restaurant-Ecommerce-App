import home from '@/data/home.json';
import Hero from '@/components/sections/Hero';
import FeatureStrip from '@/components/sections/FeatureStrip';
import MenuHighlights from '@/components/sections/MenuHighlights';
import HowItWorks from '@/components/sections/HowItWorks';
import About from '@/components/sections/About';
import LocationHours from '@/components/sections/LocationHours';

export default function HomePage() {
  return (
    <>
      <Hero data={home.hero} />
      <FeatureStrip items={home.features} />
      <MenuHighlights data={home.menuSection} />
      <HowItWorks data={home.howItWorks} />
      <About data={home.about} />
      <LocationHours data={home.location} />
    </>
  );
}
