"use client";

import { useState } from "react";
import { cn } from "@/app/_lib/cn";

type Point = { day: string; date: string; count: number };

const TICKS = [0, 200, 400, 600];
const MAX = TICKS[TICKS.length - 1];

const pct = (value: number) => `${(value / MAX) * 100}%`;

/** Single-series column chart: one color, hover/focus tooltip per column, table fallback. */
export function SignInsChart({ data }: { data: Point[] }) {
  const [active, setActive] = useState<number | null>(null);
  const peak = data.reduce((best, point, i) => (point.count > data[best].count ? i : best), 0);

  return (
    <div className="flex flex-col gap-4 px-5 pt-6 pb-5 sm:px-6">
      <div className="flex gap-3">
        <div aria-hidden="true" className="relative h-56 w-7 shrink-0 text-right text-[11px] leading-4 text-muted tabular-nums">
          {TICKS.map((tick) => (
            <span key={tick} className="absolute right-0 translate-y-1/2" style={{ bottom: pct(tick) }}>
              {tick}
            </span>
          ))}
        </div>

        <div className="flex min-w-0 flex-1 flex-col gap-2">
          <div className="relative h-56">
            {TICKS.map((tick) => (
              <div
                key={tick}
                aria-hidden="true"
                className={cn("absolute inset-x-0 h-px", tick === 0 ? "bg-line" : "bg-line-soft")}
                style={{ bottom: pct(tick) }}
              />
            ))}

            <div role="list" aria-label="Successful sign-ins per day" className="absolute inset-0 flex items-end">
              {data.map((point, i) => {
                const isActive = active === i;
                const align = i < 2 ? "left-0" : i > data.length - 3 ? "right-0" : "left-1/2 -translate-x-1/2";
                return (
                  <div
                    key={point.date}
                    role="listitem"
                    tabIndex={0}
                    aria-label={`${point.day}, ${point.date}: ${point.count.toLocaleString("en-US")} sign-ins`}
                    onPointerEnter={() => setActive(i)}
                    onPointerLeave={() => setActive(null)}
                    onFocus={() => setActive(i)}
                    onBlur={() => setActive(null)}
                    className="relative flex h-full flex-1 cursor-default items-end justify-center rounded-md outline-none focus-visible:bg-accent/5"
                  >
                    <div
                      className={cn(
                        "w-[70%] max-w-6 rounded-t-sm transition-colors duration-150",
                        isActive ? "bg-accent-hover" : "bg-accent",
                      )}
                      style={{ height: pct(point.count) }}
                    />

                    {i === peak && !isActive && (
                      <span
                        aria-hidden="true"
                        className="absolute left-1/2 -translate-x-1/2 text-[11px] leading-4 font-medium text-body tabular-nums"
                        style={{ bottom: `calc(${pct(point.count)} + 4px)` }}
                      >
                        {point.count}
                      </span>
                    )}

                    {isActive && (
                      <div
                        aria-hidden="true"
                        className={cn(
                          "pointer-events-none absolute z-10 rounded-lg border border-ink/6 bg-white px-2.5 py-1.5 whitespace-nowrap shadow-popover",
                          align,
                        )}
                        style={{ bottom: `calc(${pct(point.count)} + 8px)` }}
                      >
                        <p className="text-sm leading-5 font-semibold tabular-nums">
                          {point.count.toLocaleString("en-US")}
                        </p>
                        <p className="text-[11px] leading-4 text-muted">
                          {point.day}, {point.date}
                        </p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          <div aria-hidden="true" className="flex text-[11px] leading-4 text-muted tabular-nums">
            {data.map((point, i) => {
              const [month, day] = point.date.split(" ");
              const showMonth = i === 0 || month !== data[i - 1].date.split(" ")[0];
              return (
                <span
                  key={point.date}
                  className={cn("flex-1 text-center whitespace-nowrap", i % 2 === 1 && "max-sm:invisible")}
                >
                  {showMonth ? `${month} ${day}` : day}
                </span>
              );
            })}
          </div>
        </div>
      </div>

      <details className="group">
        <summary className="w-fit cursor-pointer rounded text-[13px] leading-4.5 font-medium text-accent hover:text-accent-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent">
          Show as table
        </summary>
        <div className="mt-3 max-h-64 overflow-auto rounded-xl border border-line-soft">
          <table className="w-full text-left text-[13px] leading-4.5">
            <thead className="sticky top-0 bg-fill-faint text-muted">
              <tr>
                <th scope="col" className="px-3 py-2 font-medium">Date</th>
                <th scope="col" className="px-3 py-2 text-right font-medium">Sign-ins</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line-soft">
              {data.map((point) => (
                <tr key={point.date}>
                  <td className="px-3 py-2 text-body">
                    {point.day}, {point.date}
                  </td>
                  <td className="px-3 py-2 text-right font-medium tabular-nums">
                    {point.count.toLocaleString("en-US")}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </details>
    </div>
  );
}
