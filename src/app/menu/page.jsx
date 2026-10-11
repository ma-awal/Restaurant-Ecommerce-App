import PageHeader from '@/components/ui/PageHeader';
import MenuBrowser from '@/components/menu/MenuBrowser';

export const metadata = {
  title: 'Food Menu',
  description: 'Smoked brisket, pork ribs, burgers, loaded fries, wings and more. Order for pickup or delivery.',
};

export default function MenuPage({ searchParams }) {
  const category = typeof searchParams?.category === 'string' ? searchParams.category : 'all';

  return (
    <>
      <PageHeader title="Food Menu" subtitle="Real smoke. Bold flavour. Pick your favourites and add them to your cart." />
      <MenuBrowser initialCategory={category} />
    </>
  );
}
