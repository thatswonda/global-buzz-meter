import { regions } from "@/lib/mock-data";

export function Regions() {
  return (
    <section className="rounded-2xl border bg-card">
      <div className="p-4 lg:p-5 border-b">
        <h2 className="font-display text-2xl font-bold">Regional interest</h2>
        <p className="text-xs text-muted-foreground mt-0.5">Where demand is rising or falling, country-level</p>
      </div>
      <div className="grid sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x [&>*:nth-child(n+3)]:sm:border-t">
        {regions.map((r) => {
          const pos = r.change >= 0;
          return (
            <div key={r.country} className="p-4 hover:bg-muted/50 cursor-pointer flex items-center gap-3">
              <div className="text-2xl">{r.flag}</div>
              <div className="min-w-0 flex-1">
                <div className="font-semibold text-sm truncate">{r.country}</div>
                <div className="text-[11px] text-muted-foreground truncate">Top: {r.topTopic}</div>
              </div>
              <div className="text-right">
                <div className="text-sm font-bold num">{r.index.toFixed(1)}</div>
                <div className={`text-xs font-semibold num ${pos ? "text-bull" : "text-bear"}`}>
                  {pos ? "+" : ""}{r.change.toFixed(1)}%
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
