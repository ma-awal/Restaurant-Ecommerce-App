"use client";

import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";
import Icon from "@/components/ui/Icon";
import Button from "@/components/ui/Button";
import Reveal from "@/components/ui/Reveal";
import DeliveryModal from "@/components/sections/DeliveryModal";

export default function OrderModeCards({ modes }) {
  const router = useRouter();
  const { orderMode, setOrderMode } = useCart();
  const [deliveryOpen, setDeliveryOpen] = useState(false);
  const closeDelivery = useCallback(() => setDeliveryOpen(false), []);

  const handleClick = (mode) => {
    if (mode.id === "delivery") {
      setDeliveryOpen(true);
      return;
    }
    setOrderMode("pickup");
    router.push("/menu");
  };

  return (
    <>
      <div className="flex flex-col gap-4">
        {modes.map((mode, index) => {
          const selected = orderMode === mode.id;
          return (
            <Reveal key={mode.id} variant="right" delay={index * 150}>
              <div
                className={`flex items-center gap-4 rounded-md border bg-ink-900/60 p-5 transition-colors duration-300 ${
                  selected
                    ? "border-brand"
                    : "border-white/30 hover:border-brand/70"
                }`}
              >
                <Icon
                  name={mode.icon}
                  size={46}
                  strokeWidth={1.5}
                  className="shrink-0 text-brand"
                />
                <div className="min-w-0">
                  <h3 className="text-lg font-semibold">{mode.title}</h3>
                  <p className="mt-0.5 text-sm text-white/70">{mode.text}</p>
                  <Button
                    type="button"
                    size="sm"
                    className="mt-3"
                    onClick={() => handleClick(mode)}
                  >
                    {mode.cta}
                    <Icon name="arrowRight" size={18} />
                  </Button>
                </div>
              </div>
            </Reveal>
          );
        })}
      </div>

      <DeliveryModal
        open={deliveryOpen}
        onClose={closeDelivery}
        onChoose={() => {
          setOrderMode("delivery");
          setDeliveryOpen(false);
          router.push("/menu");
        }}
      />
    </>
  );
}
