import { trendingProducts } from "@/lib/mock-data";
import { PlatformIcon } from "./PlatformIcon";
import { Sparkline } from "./Sparkline";
import { TrendingUp } from "lucide-react";

export function TrendingProducts() {
  return (
    <section className="rounded-2xl border bg-card">
      <div className="flex items-center justify-between p-4 lg:p-5 border-b">
        <div>
          <h2 className="font-display text-2xl font-bold">Trending products</h2>
          <p className="text-xs text-muted-foreground mt-0.5">
            Physical & digital products gaining momentum
          </p>
        </div>
        <span className="text-xs font-medium text-bull bg-bull/10 px-2 py-1 rounded-full inline-flex items-center gap-1">
          <TrendingUp className="size-3" /> Live
        </span>
      </div>
      <ul className="divide-y">
        {trendingProducts.map((p) => (
          <li key={p.name} className="flex items-center gap-3 px-4 lg:px-5 py-3.5 hover:bg-muted/50 cursor-pointer">
            <PlatformIcon platform={p.platform} size={32} />
            <div className="min-w-0 flex-1">
              <div className="font-semibold truncate">{p.name}</div>
              <div className="text-xs text-muted-foreground">
                {p.category} · {p.price} · {p.searches} searches
              </div>
            </div>
            <Sparkline data={p.spark} width={70} height={28} />
            <div className="text-right shrink-0 w-20">
              <div className="text-sm font-bold text-bull num">+{p.growth}%</div>
              <div className="text-[10px] text-muted-foreground uppercase tracking-wider">30d</div>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
