import { topics } from "@/lib/mock-data";
import { PlatformIcon } from "./PlatformIcon";
import { Sparkline } from "./Sparkline";
import { ChevronRight } from "lucide-react";

export function TopicCarousel() {
  const featured = topics.slice(0, 8);
  return (
    <section className="px-4 lg:px-6 py-4">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
          Community trends
        </h2>
        <a href="#" className="text-xs text-muted-foreground hover:text-foreground inline-flex items-center gap-1">
          View all <ChevronRight className="size-3" />
        </a>
      </div>
      <div className="relative">
        <div className="grid grid-flow-col auto-cols-[minmax(260px,1fr)] gap-3 overflow-x-auto scrollbar-thin pb-2 -mx-1 px-1">
          {featured.map((t) => {
            const pos = t.change >= 0;
            return (
              <div
                key={t.symbol}
                className="rounded-2xl border bg-card p-4 hover:shadow-md hover:border-foreground/15 transition-all cursor-pointer group"
              >
                <div className="flex items-start gap-3">
                  <PlatformIcon platform={t.platform} size={36} />
                  <div className="min-w-0 flex-1">
                    <div className="font-display font-bold text-base truncate">{t.symbol}</div>
                    <div className="text-xs text-muted-foreground truncate">
                      {t.name} · {t.platform}
                    </div>
                  </div>
                </div>
                <div className="mt-4 flex items-end justify-between">
                  <div>
                    <div className="text-2xl font-display font-bold num">{t.index.toFixed(2)}</div>
                    <div className={`text-sm font-semibold num ${pos ? "text-bull" : "text-bear"}`}>
                      {pos ? "+" : ""}
                      {t.changePct.toFixed(2)}%
                    </div>
                  </div>
                  <Sparkline data={t.spark} width={90} height={32} />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
