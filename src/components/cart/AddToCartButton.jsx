"use client";

import { useEffect, useState } from "react";
import { useCart } from "@/context/CartContext";
import Icon from "@/components/ui/Icon";
import Button from "@/components/ui/Button";

export default function AddToCartButton({ item, className = "" }) {
  const { addItem } = useCart();
  const [justAdded, setJustAdded] = useState(false);

  useEffect(() => {
    if (!justAdded) return undefined;
    const timer = setTimeout(() => setJustAdded(false), 1200);
    return () => clearTimeout(timer);
  }, [justAdded]);

  return (
    <Button
      type="button"
      size="lg"
      className={className}
      onClick={() => {
        addItem(item.id);
        setJustAdded(true);
      }}
      aria-label={`Add ${item.name} to cart`}
    >
      <Icon name={justAdded ? "check" : "cart"} size={22} />
      {justAdded ? "Added" : "Add to Cart"}
    </Button>
  );
}
