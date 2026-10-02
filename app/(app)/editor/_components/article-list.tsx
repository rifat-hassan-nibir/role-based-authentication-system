"use client";

import { useState } from "react";
import type { Article, ArticleStatus } from "../../_data/sample";
import { Avatar, Badge, Card, CardHeader, cn, type Tone } from "../../_components/ui";

export const articleTone: Record<ArticleStatus, Tone> = {
  Draft: "neutral",
  "In review": "warning",
  Scheduled: "accent",
  Published: "success",
};

const tabs: { label: string; status: ArticleStatus | null }[] = [
  { label: "All", status: null },
  { label: "Drafts", status: "Draft" },
  { label: "In review", status: "In review" },
  { label: "Scheduled", status: "Scheduled" },
  { label: "Published", status: "Published" },
];

export function ArticleList({ articles }: { articles: Article[] }) {
  const [status, setStatus] = useState<ArticleStatus | null>(null);
  const rows = status ? articles.filter((article) => article.status === status) : articles;

  return (
    <Card>
      <CardHeader title="Articles" description={`${articles.length} articles in the help center`} />

      <div className="overflow-x-auto px-5 pt-4 sm:px-6">
        <div className="flex w-max gap-1 rounded-[10px] bg-fill p-1" role="group" aria-label="Filter by status">
          {tabs.map((tab) => {
            const selected = status === tab.status;
            const count = tab.status ? articles.filter((a) => a.status === tab.status).length : articles.length;
            return (
              <button
                key={tab.label}
                type="button"
                aria-pressed={selected}
                onClick={() => setStatus(tab.status)}
                className={cn(
                  "flex h-8 items-center gap-1.5 rounded-[7px] px-3 text-[13px] font-medium transition-colors duration-150 focus-visible:ring-2 focus-visible:ring-accent focus-visible:outline-none sm:h-7",
                  selected ? "bg-white text-ink shadow-control" : "text-body hover:text-ink",
                )}
              >
                {tab.label}
                <span className={cn("text-[12px] tabular-nums", selected ? "text-muted" : "text-placeholder")}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <ul className="mt-3 flex flex-col border-t border-line-soft">
        {rows.map((article) => (
          <li
            key={article.title}
            className="flex flex-col gap-3 border-b border-line-soft px-5 py-4 transition-colors duration-150 last:border-0 hover:bg-fill-faint sm:flex-row sm:items-center sm:gap-6 sm:px-6"
          >
            <div className="flex min-w-0 flex-1 flex-col gap-1">
              <a
                href="#"
                className="w-fit rounded text-sm leading-5 font-medium text-ink text-pretty hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
              >
                {article.title}
              </a>
              <p className="text-[13px] leading-4.5 text-muted">
                {article.category} · {article.readTime} read · Updated {article.updated}
              </p>
            </div>
            <div className="flex items-center justify-between gap-4 sm:justify-end">
              <span className="flex items-center gap-2 text-[13px] leading-4.5 text-body">
                <Avatar name={article.author} size="sm" />
                <span className="sm:hidden lg:inline">{article.author}</span>
              </span>
              <span className="sm:w-24 sm:text-right">
                <Badge tone={articleTone[article.status]} dot>
                  {article.status}
                </Badge>
              </span>
            </div>
          </li>
        ))}
      </ul>
    </Card>
  );
}
