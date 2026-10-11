"use client";

import { useState } from "react";
import Image from "next/image";
import site from "@/data/site.json";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/lib/format";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import Icon from "@/components/ui/Icon";

const initial = {
  name: "",
  phone: "",
  email: "",
  address: "",
  suburb: "",
  postcode: "",
  notes: "",
};

const inputClass =
  "mt-1 w-full rounded-md border border-slate-200 bg-white px-3.5 py-2.5 text-base text-ink placeholder:text-slate-400 focus:border-brand focus:outline-none";

export default function CheckoutForm() {
  const { lines, subtotal, orderMode, setOrderMode, clearCart } = useCart();
  const [form, setForm] = useState(initial);
  const [status, setStatus] = useState("idle"); // idle | sending
  const [error, setError] = useState("");
  const [placed, setPlaced] = useState(null);

  const isDelivery = orderMode === "delivery";
  const deliveryFee =
    isDelivery && subtotal > 0 && subtotal < site.order.freeDeliveryOver
      ? site.order.deliveryFee
      : 0;
  const total = subtotal + deliveryFee;
  const paymentLabel = site.order.paymentLabels[orderMode];

  const update = (event) =>
    setForm((prev) => ({ ...prev, [event.target.name]: event.target.value }));

  const submit = async (event) => {
    event.preventDefault();
    setError("");

    if (
      isDelivery &&
      !site.order.deliveryPostcodes.includes(form.postcode.trim())
    ) {
      setError(
        `Sorry, we don't deliver to ${
          form.postcode || "that postcode"
        } yet. Choose pickup or try another postcode.`
      );
      return;
    }

    setStatus("sending");
    try {
      const response = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          mode: orderMode,
          payment: paymentLabel,
          customer: form,
          items: lines.map((l) => ({
            id: l.id,
            name: l.name,
            price: l.price,
            qty: l.qty,
          })),
          subtotal,
          deliveryFee,
          total,
        }),
      });
      if (!response.ok) throw new Error("Order failed");
      const data = await response.json();
      setPlaced({ id: data.orderId, mode: orderMode, total, name: form.name });
      clearCart();
      setForm(initial);
    } catch (err) {
      setError("We could not place your order. Please try again or call us.");
    } finally {
      setStatus("idle");
    }
  };

  if (placed) {
    return (
      <section className="bg-paper py-16 text-ink">
        <Container className="max-w-xl">
          <div className="rounded-lg bg-white p-8 text-center shadow-card">
            <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
              <Icon name="success" size={32} />
            </span>
            <h2 className="mt-4 font-display text-3xl font-semibold uppercase tracking-wide">
              Order received
            </h2>
            <p className="mt-2 text-slate-600">
              Thanks {placed.name.split(" ")[0]}! Your order number is{" "}
              <strong className="text-ink">{placed.id}</strong>.
            </p>
            <p className="mt-1 text-slate-600">
              {placed.mode === "delivery"
                ? "We will deliver it to you soon."
                : "It will be ready for pickup at our food truck soon."}{" "}
              Total to pay:{" "}
              <strong className="text-brand">
                {formatPrice(placed.total)}
              </strong>{" "}
              in cash.
            </p>
            <Button href="/menu" size="lg" className="mt-6">
              Order something else
            </Button>
          </div>
        </Container>
      </section>
    );
  }

  if (lines.length === 0) {
    return (
      <section className="bg-paper py-20 text-center text-ink">
        <Container>
          <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-brand/10 text-brand">
            <Icon name="bag" size={30} />
          </span>
          <h2 className="mt-4 text-2xl font-bold">Your cart is empty</h2>
          <p className="mt-1 text-slate-600">
            Add something delicious before checking out.
          </p>
          <Button href="/menu" size="lg" className="mt-6">
            Browse Menu
          </Button>
        </Container>
      </section>
    );
  }

  return (
    <section className="bg-paper py-10 text-ink base:py-14">
      <Container className="grid gap-8 lg:grid-cols-[1.4fr_1fr]">
        <form
          onSubmit={submit}
          className="space-y-6 rounded-lg bg-white p-6 shadow-card base:p-8"
        >
          <div>
            <h2 className="font-display text-xl font-bold uppercase tracking-wide">
              1. How would you like it?
            </h2>
            <div
              className="mt-3 grid grid-cols-2 gap-3"
              role="radiogroup"
              aria-label="Order type"
            >
              {[
                { id: "pickup", label: "Store Pickup", icon: "store" },
                { id: "delivery", label: "Home Delivery", icon: "truck" },
              ].map((option) => (
                <button
                  key={option.id}
                  type="button"
                  role="radio"
                  aria-checked={orderMode === option.id}
                  onClick={() => setOrderMode(option.id)}
                  className={`flex items-center justify-center gap-2 rounded-md border-2 px-4 py-3 text-base font-semibold transition-all duration-300 ${
                    orderMode === option.id
                      ? "border-brand bg-brand/10 text-brand"
                      : "border-slate-200 text-slate-600 hover:border-brand/50"
                  }`}
                >
                  <Icon name={option.icon} size={18} />
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <h2 className="font-display text-xl font-bold uppercase tracking-wide">
              2. Your details
            </h2>
            <div className="mt-3 grid gap-4 base:grid-cols-2">
              <label className="block text-base font-medium">
                Full name
                <input
                  name="name"
                  value={form.name}
                  onChange={update}
                  required
                  autoComplete="name"
                  className={inputClass}
                />
              </label>
              <label className="block text-base font-medium">
                Phone
                <input
                  name="phone"
                  value={form.phone}
                  onChange={update}
                  required
                  type="tel"
                  autoComplete="tel"
                  className={inputClass}
                />
              </label>
              <label className="block text-base font-medium base:col-span-2">
                Email (optional)
                <input
                  name="email"
                  value={form.email}
                  onChange={update}
                  type="email"
                  autoComplete="email"
                  className={inputClass}
                />
              </label>

              {isDelivery && (
                <>
                  <label className="block text-base font-medium base:col-span-2">
                    Street address
                    <input
                      name="address"
                      value={form.address}
                      onChange={update}
                      required
                      autoComplete="street-address"
                      className={inputClass}
                    />
                  </label>
                  <label className="block text-base font-medium">
                    Suburb
                    <input
                      name="suburb"
                      value={form.suburb}
                      onChange={update}
                      required
                      className={inputClass}
                    />
                  </label>
                  <label className="block text-base font-medium">
                    Postcode
                    <input
                      name="postcode"
                      value={form.postcode}
                      onChange={update}
                      required
                      inputMode="numeric"
                      maxLength={4}
                      minLength={4}
                      autoComplete="postal-code"
                      className={inputClass}
                    />
                  </label>
                </>
              )}

              <label className="block text-base font-medium base:col-span-2">
                Order notes (optional)
                <textarea
                  name="notes"
                  value={form.notes}
                  onChange={update}
                  rows={3}
                  className={`${inputClass} resize-y`}
                />
              </label>
            </div>
          </div>

          <div>
            <h2 className="font-display text-xl font-bold uppercase tracking-wide">
              3. Payment
            </h2>
            <div className="mt-3 flex items-center gap-3 rounded-md border-2 border-brand bg-brand/5 px-4 py-3">
              <Icon name="cash" size={22} className="text-brand" />
              <div>
                <p className="text-base font-semibold">{paymentLabel}</p>
                <p className="text-xs text-slate-500">
                  Pay in cash when you {isDelivery ? "receive" : "collect"} your
                  order.
                </p>
              </div>
            </div>
          </div>

          {error && (
            <p
              role="alert"
              className="flex items-start gap-2 rounded-md bg-red-50 p-3 text-base text-red-700"
            >
              <Icon name="warning" size={16} className="mt-0.5 shrink-0" />{" "}
              {error}
            </p>
          )}

          <Button
            type="submit"
            size="lg"
            className="w-full"
            disabled={status === "sending"}
          >
            {status === "sending"
              ? "Placing order..."
              : `Place Order · ${formatPrice(total)}`}
          </Button>
        </form>

        <aside className="h-fit rounded-lg bg-ink-900 p-6 text-white shadow-card lg:sticky lg:top-24">
          <h2 className="font-display text-xl font-semibold uppercase tracking-wide">
            Order summary
          </h2>
          <ul className="mt-4 divide-y divide-white/10">
            {lines.map((line) => (
              <li key={line.id} className="flex items-center gap-3 py-3">
                <div className="relative h-12 w-16 shrink-0 overflow-hidden rounded bg-ink-800">
                  {line.image ? (
                    <Image
                      src={line.image}
                      alt={line.name}
                      fill
                      sizes="64px"
                      className="object-cover"
                    />
                  ) : (
                    <span className="flex h-full items-center justify-center text-brand/70">
                      <Icon name="flame" size={18} />
                    </span>
                  )}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-base font-semibold">
                    {line.name}
                  </p>
                  <p className="text-xs text-white/50">
                    {line.qty} × {formatPrice(line.price)}
                  </p>
                </div>
                <p className="text-base font-semibold">
                  {formatPrice(line.price * line.qty)}
                </p>
              </li>
            ))}
          </ul>

          <dl className="mt-4 space-y-2 border-t border-white/10 pt-4 text-base">
            <div className="flex justify-between text-white/70">
              <dt>Subtotal</dt>
              <dd>{formatPrice(subtotal)}</dd>
            </div>
            {isDelivery && (
              <div className="flex justify-between text-white/70">
                <dt>Delivery</dt>
                <dd>{deliveryFee > 0 ? formatPrice(deliveryFee) : "Free"}</dd>
              </div>
            )}
            <div className="flex justify-between border-t border-white/10 pt-3 text-lg font-bold">
              <dt>Total</dt>
              <dd className="text-brand">{formatPrice(total)}</dd>
            </div>
          </dl>
          {isDelivery && deliveryFee > 0 && (
            <p className="mt-3 text-xs text-white/50">
              Free delivery on orders over{" "}
              {formatPrice(site.order.freeDeliveryOver)}.
            </p>
          )}
        </aside>
      </Container>
    </section>
  );
}
