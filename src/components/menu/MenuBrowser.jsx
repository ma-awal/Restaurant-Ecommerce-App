'use client';

import { useEffect, useMemo, useState } from 'react';
import { categories, getCategoryName, isValidCategory, items } from '@/lib/menu';
import Container from '@/components/ui/Container';
import Icon from '@/components/ui/Icon';
import Reveal from '@/components/ui/Reveal';
import MenuCard from '@/components/menu/MenuCard';

export default function MenuBrowser({ initialCategory = 'all' }) {
  const safeInitial = isValidCategory(initialCategory) ? initialCategory : 'all';
  const [active, setActive] = useState(safeInitial);
  const [query, setQuery] = useState('');

  // Keep in sync when the header dropdown links to another category.
  useEffect(() => {
    setActive(safeInitial);
  }, [safeInitial]);

  const visibleItems = useMemo(() => {
    const q = query.trim().toLowerCase();
    return items.filter((item) => {
      const inCategory = active === 'all' || item.category === active;
      const matches =
        !q ||
        item.name.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q) ||
        getCategoryName(item.category).toLowerCase().includes(q);
      return inCategory && matches;
    });
  }, [active, query]);

  const tabs = [{ id: 'all', name: 'All' }, ...categories];

  return (
    <section className="bg-paper py-10 text-ink sm:py-14">
      <Container>
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div role="tablist" aria-label="Menu categories" className="flex flex-wrap gap-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                type="button"
                role="tab"
                aria-selected={active === tab.id}
                onClick={() => setActive(tab.id)}
                className={`rounded-full px-4 py-2 text-sm font-semibold transition-all duration-300 ${
                  active === tab.id
                    ? 'bg-brand text-white shadow-glow'
                    : 'bg-white text-ink shadow-card hover:text-brand'
                }`}
              >
                {tab.name}
              </button>
            ))}
          </div>

          <label className="relative block md:w-72">
            <span className="sr-only">Search the menu</span>
            <Icon name="search" size={16} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search dishes..."
              className="w-full rounded-full border border-slate-200 bg-white py-2.5 pl-9 pr-4 text-sm text-ink placeholder:text-slate-400 focus:border-brand focus:outline-none"
            />
          </label>
        </div>

        {visibleItems.length === 0 ? (
          <div className="py-20 text-center">
            <p className="text-lg font-semibold">No dishes found</p>
            <p className="mt-1 text-slate-500">Try a different search or pick another category.</p>
          </div>
        ) : (
          <ul className="mt-8 grid grid-cols-2 gap-3 sm:gap-5 md:grid-cols-3 lg:grid-cols-4">
            {visibleItems.map((item, index) => (
              <li key={`${active}-${item.id}`} className="h-full">
                <Reveal variant="up" delay={(index % 4) * 90} className="h-full">
                  <MenuCard item={item} />
                </Reveal>
              </li>
            ))}
          </ul>
        )}
      </Container>
    </section>
  );
}
