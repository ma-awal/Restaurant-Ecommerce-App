import Image from "next/image";
import AddToCartButton from "@/components/cart/AddToCartButton";
import Icon from "@/components/ui/Icon";
import { formatPrice } from "@/lib/format";

export default function MenuCard({ item, priority = false }) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-md bg-white p-2.5 text-ink shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-cardHover">
      <div className="relative aspect-[16/10] overflow-hidden rounded-[4px] bg-ink-900">
        {item.image ? (
          <Image
            src={item.image}
            alt={item.name}
            fill
            priority={priority}
            sizes="(min-width: 1024px) 20vw, (min-width: 640px) 33vw, 50vw"
            className="object-cover transition-transform duration-700 group-hover:scale-110"
          />
        ) : (
          <div className="flex h-full items-center justify-center bg-gradient-to-br from-ink-700 to-ink">
            <Icon name="flame" size={36} className="text-brand/70" />
          </div>
        )}
      </div>
      <div className="flex flex-1 flex-col px-1.5 pb-1 pt-3">
        <h3 className="text-[18px] font-medium leading-tight">{item.name}</h3>
        <p className="mt-1 text-sm leading-snug text-slate-500">
          {item.description}
        </p>
        <p className="mb-3 mt-3 text-lg font-bold text-brand">
          {formatPrice(item.price)}
        </p>
        <AddToCartButton item={item} className="mt-auto w-full" />
      </div>
    </article>
  );
}
