"use client";

import { useState } from "react";
import Icon from "@/components/ui/Icon";
import Button from "@/components/ui/Button";

const initial = { name: "", email: "", phone: "", message: "" };

const inputClass =
  "w-full rounded-md border border-slate-200 bg-white px-3.5 py-2.5 text-base text-ink placeholder:text-slate-400 focus:border-brand focus:outline-none";

export default function ContactForm() {
  const [form, setForm] = useState(initial);
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error

  const update = (event) =>
    setForm((prev) => ({ ...prev, [event.target.name]: event.target.value }));

  const submit = async (event) => {
    event.preventDefault();
    setStatus("sending");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!response.ok) throw new Error("Request failed");
      setForm(initial);
      setStatus("sent");
    } catch (error) {
      setStatus("error");
    }
  };

  if (status === "sent") {
    return (
      <div className="flex h-full flex-col items-center justify-center rounded-lg bg-white p-10 text-center text-ink shadow-card">
        <span className="flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
          <Icon name="success" size={28} />
        </span>
        <h3 className="mt-4 text-xl font-bold">Message sent</h3>
        <p className="mt-1 text-base text-slate-600">
          Thanks for getting in touch. We will reply as soon as we can.
        </p>
        <Button
          type="button"
          className="mt-6"
          onClick={() => setStatus("idle")}
        >
          Send another message
        </Button>
      </div>
    );
  }

  return (
    <form
      onSubmit={submit}
      className="space-y-4 rounded-lg bg-white p-6 text-ink shadow-card base:p-8"
    >
      <h2 className="font-display text-2xl font-bold uppercase tracking-wide">
        Send us a message
      </h2>

      <div className="grid gap-4 base:grid-cols-2">
        <label className="block text-base font-medium">
          Name
          <input
            name="name"
            value={form.name}
            onChange={update}
            required
            autoComplete="name"
            className={`${inputClass} mt-1`}
          />
        </label>
        <label className="block text-base font-medium">
          Phone
          <input
            name="phone"
            value={form.phone}
            onChange={update}
            type="tel"
            autoComplete="tel"
            className={`${inputClass} mt-1`}
          />
        </label>
      </div>

      <label className="block text-base font-medium">
        Email
        <input
          name="email"
          value={form.email}
          onChange={update}
          type="email"
          required
          autoComplete="email"
          className={`${inputClass} mt-1`}
        />
      </label>

      <label className="block text-base font-medium">
        Message
        <textarea
          name="message"
          value={form.message}
          onChange={update}
          required
          rows={5}
          className={`${inputClass} mt-1 resize-y`}
        />
      </label>

      {status === "error" && (
        <p className="flex items-center gap-2 text-base text-red-600">
          <Icon name="warning" size={16} /> Something went wrong. Please try
          again.
        </p>
      )}

      <Button type="submit" size="lg" disabled={status === "sending"}>
        {status === "sending" ? "Sending..." : "Send Message"}
      </Button>
    </form>
  );
}
