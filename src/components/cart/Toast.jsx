'use client';

import { useEffect } from 'react';
import { useCart } from '@/context/CartContext';
import Icon from '@/components/ui/Icon';

export default function Toast() {
  const { toast, dismissToast, openCart } = useCart();

  useEffect(() => {
    if (!toast) return undefined;
    const timer = setTimeout(dismissToast, 2600);
    return () => clearTimeout(timer);
  }, [toast, dismissToast]);

  if (!toast) return null;

  return (
    <div
      key={toast.key}
      role="status"
      className="fixed bottom-5 left-1/2 z-[70] flex w-[calc(100%-2rem)] max-w-sm animate-toast-in items-center gap-3 rounded-lg border border-white/10 bg-ink-900 px-4 py-3 text-sm text-white shadow-2xl"
    >
      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-brand">
        <Icon name="check" size={16} />
      </span>
      <span className="flex-1">{toast.message}</span>
      <button
        type="button"
        onClick={() => {
          dismissToast();
          openCart();
        }}
        className="font-semibold text-brand hover:underline"
      >
        View cart
      </button>
    </div>
  );
}
