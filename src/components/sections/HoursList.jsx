"use client";

import { useEffect, useState } from "react";
import site from "@/data/site.json";

export default function HoursList() {
  const [today, setToday] = useState(null);

  useEffect(() => {
    try {
      setToday(
        new Intl.DateTimeFormat("en-AU", {
          weekday: "long",
          timeZone: site.timezone,
        }).format(new Date())
      );
    } catch (error) {
      setToday(null);
    }
  }, []);

  return (
    <ul className="mt-3 space-y-1.5">
      {site.hours.map((row) => {
        const isToday = today === row.day;
        return (
          <li
            key={row.day}
            className={`flex justify-between gap-4 rounded px-2 py-0.5 text-base transition-colors ${
              isToday ? "bg-brand/10 font-bold text-brand" : "text-slate-600"
            }`}
          >
            <span>{row.day}</span>
            <span className="tabular-nums">{row.time}</span>
          </li>
        );
      })}
    </ul>
  );
}
