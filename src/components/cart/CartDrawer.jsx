'use client';

import { useEffect } from 'react';
import Image from 'next/image';
import { useCart } from '@/context/CartContext';
import { formatPrice } from '@/lib/format';
import Icon from '@/components/ui/Icon';
import Button from '@/components/ui/Button';

export default function CartDrawer() {
  const { drawerOpen, closeCart, lines, subtotal, setQty, removeItem, itemCount } = useCart();

  useEffect(() => {
    if (!drawerOpen) return undefined;
    const onKey = (event) => {
      if (event.key === 'Escape') closeCart();
    };
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [drawerOpen, closeCart]);

  return (
    <div
      className={`fixed inset-0 z-[60] transition-[visibility] duration-300 ${drawerOpen ? 'visible' : 'invisible'}`}
      aria-hidden={!drawerOpen}
    >
      <div
        onClick={closeCart}
        className={`absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${drawerOpen ? 'opacity-100' : 'opacity-0'}`}
      />
      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Shopping cart"
        className={`absolute right-0 top-0 flex h-full w-full max-w-md flex-col bg-ink-900 text-white shadow-2xl transition-transform duration-300 ease-out ${drawerOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
          <h2 className="font-display text-xl font-semibold uppercase tracking-wide">
            Your Cart <span className="text-brand">({itemCount})</span>
          </h2>
          <button
            type="button"
            onClick={closeCart}
            aria-label="Close cart"
            className="rounded-md p-2 text-white/70 transition hover:bg-white/10 hover:text-white"
          >
            <Icon name="close" size={20} />
          </button>
        </div>

        {lines.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 px-6 text-center">
            <span className="flex h-16 w-16 items-center justify-center rounded-full bg-white/5 text-brand">
              <Icon name="bag" size={30} />
            </span>
            <p className="text-lg font-semibold">Your cart is empty</p>
            <p className="text-sm text-white/60">Add some smoky favourites from our menu.</p>
            <Button href="/menu" onClick={closeCart}>
              Browse Menu
            </Button>
          </div>
        ) : (
          <>
            <ul className="flex-1 divide-y divide-white/10 overflow-y-auto px-5">
              {lines.map((line) => (
                <li key={line.id} className="flex gap-3 py-4">
                  <div className="relative h-16 w-20 shrink-0 overflow-hidden rounded bg-ink-800">
                    {line.image ? (
                      <Image src={line.image} alt={line.name} fill sizes="80px" className="object-cover" />
                    ) : (
                      <span className="flex h-full items-center justify-center text-brand/70">
                        <Icon name="flame" size={22} />
                      </span>
                    )}
                  </div>
                  <div className="flex flex-1 flex-col">
                    <div className="flex items-start justify-between gap-2">
                      <p className="text-sm font-semibold">{line.name}</p>
                      <button
                        type="button"
                        onClick={() => removeItem(line.id)}
                        aria-label={`Remove ${line.name}`}
                        className="text-white/40 transition hover:text-brand"
                      >
                        <Icon name="trash" size={16} />
                      </button>
                    </div>
                    <p className="text-sm text-brand">{formatPrice(line.price)}</p>
                    <div className="mt-auto flex items-center justify-between pt-2">
                      <div className="flex items-center rounded-md border border-white/15">
                        <button
                          type="button"
                          onClick={() => setQty(line.id, line.qty - 1)}
                          aria-label={`Decrease ${line.name}`}
                          className="px-2 py-1 text-white/70 transition hover:text-brand"
                        >
                          <Icon name="minus" size={14} />
                        </button>
                        <span className="min-w-[2rem] text-center text-sm font-semibold">{line.qty}</span>
                        <button
                          type="button"
                          onClick={() => setQty(line.id, line.qty + 1)}
                          aria-label={`Increase ${line.name}`}
                          className="px-2 py-1 text-white/70 transition hover:text-brand"
                        >
                          <Icon name="plus" size={14} />
                        </button>
                      </div>
                      <p className="text-sm font-semibold">{formatPrice(line.price * line.qty)}</p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            <div className="border-t border-white/10 px-5 py-5">
              <div className="mb-4 flex items-center justify-between text-lg font-semibold">
                <span>Subtotal</span>
                <span className="text-brand">{formatPrice(subtotal)}</span>
              </div>
              <Button href="/checkout" size="lg" className="w-full" onClick={closeCart}>
                Go to Checkout
                <Icon name="arrowRight" size={16} />
              </Button>
              <p className="mt-3 text-center text-xs text-white/50">Pay with cash on pickup or delivery.</p>
            </div>
          </>
        )}
      </aside>
    </div>
  );
}
