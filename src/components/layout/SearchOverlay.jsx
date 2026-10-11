'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { getCategoryName, getHighlights, items } from '@/lib/menu';
import { formatPrice } from '@/lib/format';
import { useCart } from '@/context/CartContext';
import Icon from '@/components/ui/Icon';

export default function SearchOverlay({ open, onClose }) {
  const [query, setQuery] = useState('');
  const inputRef = useRef(null);
  const { addItem } = useCart();

  useEffect(() => {
    if (!open) return undefined;
    setQuery('');
    const timer = setTimeout(() => inputRef.current?.focus(), 60);
    return () => clearTimeout(timer);
  }, [open]);

  useEffect(() => {
    if (!open) return undefined;
    const onKey = (event) => {
      if (event.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [open, onClose]);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return getHighlights();
    return items.filter(
      (item) =>
        item.name.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q) ||
        getCategoryName(item.category).toLowerCase().includes(q)
    );
  }, [query]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[65] animate-fade-in" role="dialog" aria-modal="true" aria-label="Search the menu">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />
      <div className="relative mx-auto mt-16 w-[calc(100%-2rem)] max-w-xl overflow-hidden rounded-xl border border-white/10 bg-ink-900 shadow-2xl sm:mt-24">
        <div className="flex items-center gap-3 border-b border-white/10 px-4">
          <Icon name="search" size={20} className="text-brand" />
          <input
            ref={inputRef}
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search brisket, burger, ribs..."
            className="h-14 flex-1 bg-transparent text-white placeholder:text-white/40 focus:outline-none"
            aria-label="Search the menu"
          />
          <button type="button" onClick={onClose} aria-label="Close search" className="p-2 text-white/60 hover:text-white">
            <Icon name="close" size={18} />
          </button>
        </div>

        <div className="max-h-[60vh] overflow-y-auto p-2">
          <p className="px-3 pb-1 pt-2 text-xs font-semibold uppercase tracking-wider text-white/40">
            {query.trim() ? `${results.length} result${results.length === 1 ? '' : 's'}` : 'Popular right now'}
          </p>

          {results.length === 0 ? (
            <p className="px-3 py-8 text-center text-sm text-white/60">
              Nothing matches “{query}”. Try another dish or browse the{' '}
              <Link href="/menu" onClick={onClose} className="text-brand underline">
                full menu
              </Link>
              .
            </p>
          ) : (
            <ul>
              {results.map((item) => (
                <li key={item.id} className="flex items-center gap-3 rounded-lg p-2 transition hover:bg-white/5">
                  <div className="relative h-12 w-16 shrink-0 overflow-hidden rounded bg-ink-800">
                    {item.image ? (
                      <Image src={item.image} alt={item.name} fill sizes="64px" className="object-cover" />
                    ) : (
                      <span className="flex h-full items-center justify-center text-brand/70">
                        <Icon name="flame" size={18} />
                      </span>
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold text-white">{item.name}</p>
                    <p className="text-xs text-white/50">{getCategoryName(item.category)}</p>
                  </div>
                  <p className="text-sm font-bold text-brand">{formatPrice(item.price)}</p>
                  <button
                    type="button"
                    onClick={() => addItem(item.id)}
                    aria-label={`Add ${item.name} to cart`}
                    className="flex h-8 w-8 items-center justify-center rounded-md bg-brand text-white transition hover:bg-brand-dark"
                  >
                    <Icon name="plus" size={16} />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        <Link
          href="/menu"
          onClick={onClose}
          className="flex items-center justify-center gap-2 border-t border-white/10 py-3 text-sm font-semibold text-brand transition hover:bg-white/5"
        >
          View Full Menu
          <Icon name="arrowRight" size={14} />
        </Link>
      </div>
    </div>
  );
}
