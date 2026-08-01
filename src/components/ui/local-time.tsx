"use client";

import { useEffect, useState } from "react";
import { site } from "@/data/site";

/**
 * Local time in Mallorca.
 *
 * Renders nothing until mounted, because the server has no way to know the
 * clock the visitor will see and a mismatch would hydrate incorrectly.
 */
export function LocalTime() {
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    function update() {
      setTime(
        new Intl.DateTimeFormat("en-GB", {
          hour: "2-digit",
          minute: "2-digit",
          timeZone: site.timezone,
        }).format(new Date()),
      );
    }
    update();
    const id = setInterval(update, 30_000);
    return () => clearInterval(id);
  }, []);

  if (!time) return null;

  return (
    <span className="label text-content-muted">
      Mallorca <span className="text-content">{time}</span>
    </span>
  );
}
