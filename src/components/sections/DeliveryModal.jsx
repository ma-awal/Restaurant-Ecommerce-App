'use client';

import { useEffect, useRef, useState } from 'react';
import site from '@/data/site.json';
import Icon from '@/components/ui/Icon';
import Button from '@/components/ui/Button';

export default function DeliveryModal({ open, onClose, onChoose }) {
  const [postcode, setPostcode] = useState('');
  const [result, setResult] = useState(null); // null | 'yes' | 'no'
  const inputRef = useRef(null);

  useEffect(() => {
    if (!open) return undefined;
    setPostcode('');
    setResult(null);
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

  if (!open) return null;

  const check = (event) => {
    event.preventDefault();
    setResult(site.order.deliveryPostcodes.includes(postcode.trim()) ? 'yes' : 'no');
  };

  return (
    <div className="fixed inset-0 z-[65] flex items-center justify-center p-4 animate-fade-in" role="dialog" aria-modal="true" aria-label="Check delivery area">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-md rounded-xl border border-white/10 bg-ink-900 p-6 text-white shadow-2xl">
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute right-3 top-3 rounded-md p-2 text-white/60 transition hover:text-white"
        >
          <Icon name="close" size={18} />
        </button>

        <span className="flex h-12 w-12 items-center justify-center rounded-full bg-brand/15 text-brand">
          <Icon name="truck" size={24} />
        </span>
        <h3 className="mt-4 font-display text-2xl font-semibold uppercase tracking-wide">Check delivery area</h3>
        <p className="mt-1 text-sm text-white/60">Enter your postcode to see if we deliver to you.</p>

        <form onSubmit={check} className="mt-5 flex gap-2">
          <input
            ref={inputRef}
            value={postcode}
            onChange={(event) => {
              setPostcode(event.target.value.replace(/\D/g, '').slice(0, 4));
              setResult(null);
            }}
            inputMode="numeric"
            placeholder="e.g. 3000"
            aria-label="Postcode"
            required
            minLength={4}
            className="h-11 flex-1 rounded-md border border-white/15 bg-white/5 px-3 text-white placeholder:text-white/30 focus:border-brand focus:outline-none"
          />
          <Button type="submit" size="md">
            Check
          </Button>
        </form>

        {result === 'yes' && (
          <div className="mt-4 rounded-md border border-emerald-500/30 bg-emerald-500/10 p-4">
            <p className="flex items-center gap-2 font-semibold text-emerald-400">
              <Icon name="success" size={18} /> Great news, we deliver to {postcode}.
            </p>
            <Button type="button" className="mt-3 w-full" onClick={onChoose}>
              Choose Home Delivery
            </Button>
          </div>
        )}

        {result === 'no' && (
          <div className="mt-4 rounded-md border border-amber-500/30 bg-amber-500/10 p-4">
            <p className="flex items-center gap-2 font-semibold text-amber-400">
              <Icon name="warning" size={18} /> Sorry, we don&apos;t deliver to {postcode} yet.
            </p>
            <p className="mt-1 text-sm text-white/70">You can still order for pickup from our food truck.</p>
          </div>
        )}

        <p className="mt-5 text-xs text-white/40">
          Delivery areas: {site.order.deliveryPostcodes.join(', ')}
        </p>
      </div>
    </div>
  );
}
