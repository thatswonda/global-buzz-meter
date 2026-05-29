import { niches } from "@/lib/mock-data";
import { Sparkline } from "./Sparkline";

export function Niches() {
  return (
    <section className="rounded-2xl border bg-card">
      <div className="p-4 lg:p-5 border-b">
        <h2 className="font-display text-2xl font-bold">Niche rankings</h2>
        <p className="text-xs text-muted-foreground mt-0.5">Broad market categories by growth velocity</p>
      </div>
      <ul className="divide-y">
        {niches.map((n, i) => {
          const pos = n.growth >= 0;
          return (
            <li key={n.name} className="flex items-center gap-4 px-4 lg:px-5 py-3.5 hover:bg-muted/50 cursor-pointer">
              <div className="text-xs font-mono text-muted-foreground w-5">{i + 1}</div>
              <div className="min-w-0 flex-1">
                <div className="font-semibold">{n.name}</div>
                <div className="text-xs text-muted-foreground">{n.topics} topics · {n.share}% share</div>
              </div>
              <Sparkline data={n.spark} width={80} height={28} />
              <div className={`text-sm font-bold num w-16 text-right ${pos ? "text-bull" : "text-bear"}`}>
                {pos ? "+" : ""}{n.growth}%
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
