import type { Metadata } from "next";
import { articles, publishingSchedule } from "../_data/sample";
import { EyeIcon, PlusIcon } from "../_components/icons";
import { Avatar, Card, CardHeader, PageHeader, buttonClass, cn } from "../_components/ui";
import { ArticleList } from "./_components/article-list";

export const metadata: Metadata = {
  title: "Editor",
};

export default function EditorPage() {
  const inReview = articles.filter((article) => article.status === "In review");

  return (
    <div className="flex flex-col gap-8">
      <PageHeader
        eyebrow="Editor"
        title="Help center"
        description="Draft, review and publish the articles members read when they need help signing in."
        actions={
          <>
            <button type="button" className={buttonClass()}>
              <EyeIcon className="size-4" />
              Preview site
            </button>
            <button type="button" className={buttonClass({ variant: "primary" })}>
              <PlusIcon className="size-4" />
              New article
            </button>
          </>
        }
      />

      <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <ArticleList articles={articles} />
        </div>

        <div className="flex flex-col gap-6">
          <Card>
            <CardHeader title="Waiting for your review" description={`${inReview.length} articles, oldest first`} />
            <ul className="flex flex-col px-5 pt-2 pb-2 sm:px-6">
              {[...inReview].reverse().map((article) => (
                <li key={article.title} className="flex items-start gap-3 border-b border-line-soft py-4 last:border-0">
                  <Avatar name={article.author} size="sm" />
                  <div className="flex min-w-0 flex-1 flex-col gap-2">
                    <div className="flex flex-col gap-0.5">
                      <p className="text-sm leading-5 font-medium text-pretty">{article.title}</p>
                      <p className="text-[13px] leading-4.5 text-muted">
                        {article.author} · {article.updated}
                      </p>
                    </div>
                    <button type="button" className={cn(buttonClass({ size: "sm" }), "w-fit")}>
                      Review
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </Card>

          <Card>
            <CardHeader title="Publishing schedule" description="Goes live automatically." />
            <ul className="flex flex-col gap-3 px-5 pt-4 pb-5 sm:px-6">
              {publishingSchedule.map((item) => {
                const [weekday, month, day] = item.date.replace(",", "").split(" ");
                return (
                  <li key={item.title} className="flex items-center gap-3">
                    <span className="flex w-12 shrink-0 flex-col items-center overflow-hidden rounded-xl border border-line-soft">
                      <span className="w-full bg-accent py-0.5 text-center text-[10px] leading-3 font-semibold tracking-[0.06em] text-white uppercase">
                        {month}
                      </span>
                      <span className="py-1 text-lg leading-6 font-semibold tabular-nums">{day}</span>
                    </span>
                    <div className="flex min-w-0 flex-col gap-0.5">
                      <p className="text-sm leading-5 font-medium text-pretty">{item.title}</p>
                      <p className="text-[13px] leading-4.5 text-muted">
                        {weekday} at {item.time}
                      </p>
                    </div>
                  </li>
                );
              })}
            </ul>
          </Card>
        </div>
      </div>
    </div>
  );
}
