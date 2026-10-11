'use client';

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { getItemById } from '@/lib/menu';

const CartContext = createContext(null);
const STORAGE_KEY = 'fg-cart-v1';

export function CartProvider({ children }) {
  const [lines, setLines] = useState([]);
  const [orderMode, setOrderMode] = useState('pickup');
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [toast, setToast] = useState(null);
  const [hydrated, setHydrated] = useState(false);

  // Load saved cart once in the browser.
  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const saved = JSON.parse(raw);
        if (Array.isArray(saved.lines)) {
          setLines(saved.lines.filter((l) => l && getItemById(l.id) && l.qty > 0));
        }
        if (saved.orderMode === 'pickup' || saved.orderMode === 'delivery') {
          setOrderMode(saved.orderMode);
        }
      }
    } catch (error) {
      // Ignore corrupted storage.
    }
    setHydrated(true);
  }, []);

  // Save on every change (after the first load).
  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ lines, orderMode }));
    } catch (error) {
      // Storage may be unavailable (private mode).
    }
  }, [lines, orderMode, hydrated]);

  const addItem = useCallback((id, qty = 1) => {
    const item = getItemById(id);
    if (!item) return;
    setLines((prev) => {
      const found = prev.find((l) => l.id === id);
      if (found) return prev.map((l) => (l.id === id ? { ...l, qty: l.qty + qty } : l));
      return [...prev, { id, qty }];
    });
    setToast({ key: Date.now(), message: `${item.name} added to cart` });
  }, []);

  const setQty = useCallback((id, qty) => {
    setLines((prev) => (qty <= 0 ? prev.filter((l) => l.id !== id) : prev.map((l) => (l.id === id ? { ...l, qty } : l))));
  }, []);

  const removeItem = useCallback((id) => {
    setLines((prev) => prev.filter((l) => l.id !== id));
  }, []);

  const clearCart = useCallback(() => setLines([]), []);
  const openCart = useCallback(() => setDrawerOpen(true), []);
  const closeCart = useCallback(() => setDrawerOpen(false), []);
  const dismissToast = useCallback(() => setToast(null), []);

  const detailedLines = useMemo(
    () => lines.map((l) => ({ ...getItemById(l.id), qty: l.qty })),
    [lines]
  );
  const itemCount = useMemo(() => lines.reduce((sum, l) => sum + l.qty, 0), [lines]);
  const subtotal = useMemo(
    () => detailedLines.reduce((sum, l) => sum + l.price * l.qty, 0),
    [detailedLines]
  );

  const value = useMemo(
    () => ({
      lines: detailedLines,
      itemCount,
      subtotal,
      orderMode,
      setOrderMode,
      addItem,
      setQty,
      removeItem,
      clearCart,
      drawerOpen,
      openCart,
      closeCart,
      toast,
      dismissToast,
    }),
    [
      detailedLines,
      itemCount,
      subtotal,
      orderMode,
      addItem,
      setQty,
      removeItem,
      clearCart,
      drawerOpen,
      openCart,
      closeCart,
      toast,
      dismissToast,
    ]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used inside <CartProvider>');
  return context;
}
