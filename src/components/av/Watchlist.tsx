import { watchlist, featuredTopic } from "@/lib/mock-data";
import { Plus, Grid3x3, MoreHorizontal, Bookmark } from "lucide-react";
import { AreaChart } from "./AreaChart";

export function Watchlist() {
  return (
    <aside className="space-y-4">
      {/* Watchlist */}
      <div className="rounded-2xl border bg-card overflow-hidden">
        <div className="flex items-center justify-between px-4 py-3 border-b">
          <button className="flex items-center gap-1.5 font-semibold text-sm">
            <Bookmark className="size-4 text-bear fill-bear" />
            Trend list
          </button>
          <div className="flex items-center gap-1 text-muted-foreground">
            <button className="size-7 grid place-items-center rounded hover:bg-muted"><Plus className="size-4" /></button>
            <button className="size-7 grid place-items-center rounded hover:bg-muted"><Grid3x3 className="size-4" /></button>
            <button className="size-7 grid place-items-center rounded hover:bg-muted"><MoreHorizontal className="size-4" /></button>
          </div>
        </div>
        <table className="w-full text-xs">
          <thead>
            <tr className="text-[10px] uppercase tracking-wider text-muted-foreground">
              <th className="text-left font-medium px-4 py-2">Symbol</th>
              <th className="text-right font-medium py-2">Last</th>
              <th className="text-right font-medium py-2">Chg</th>
              <th className="text-right font-medium py-2 pr-4">Chg%</th>
            </tr>
          </thead>
          <tbody>
            {watchlist.map((w) => {
              const pos = w.chg >= 0;
              return (
                <tr key={w.symbol} className="hover:bg-muted/50 cursor-pointer border-t">
                  <td className="px-4 py-2.5 flex items-center gap-2">
                    <span className={`size-1 rounded-full ${pos ? "bg-bull" : "bg-bear"}`} />
                    <span className="font-semibold font-display">{w.symbol}</span>
                  </td>
                  <td className="py-2.5 text-right num">{w.last.toFixed(2)}</td>
                  <td className={`py-2.5 text-right num ${pos ? "text-bull" : "text-bear"}`}>
                    {pos ? "+" : ""}{w.chg.toFixed(2)}
                  </td>
                  <td className={`py-2.5 text-right num pr-4 font-semibold ${pos ? "text-bull" : "text-bear"}`}>
                    {pos ? "+" : ""}{w.chgPct.toFixed(2)}%
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Featured detail */}
      <div className="rounded-2xl border bg-card p-4">
        <div className="flex items-center justify-between mb-1">
          <div className="flex items-center gap-2">
            <div className="size-8 rounded-full bg-foreground text-background grid place-items-center text-xs font-bold">
              AI
            </div>
            <span className="font-bold font-display">{featuredTopic.symbol}</span>
          </div>
          <button className="text-muted-foreground hover:text-foreground"><MoreHorizontal className="size-4" /></button>
        </div>
        <div className="text-[11px] text-muted-foreground mb-2">
          {featuredTopic.name} · Cross-Platform Index
        </div>
        <div className="flex items-end gap-2 mb-1">
          <div className="text-3xl font-display font-bold num">{featuredTopic.index.toFixed(2)}</div>
          <div className="text-sm font-semibold text-bull num mb-1.5">
            +{featuredTopic.change.toFixed(2)} +{featuredTopic.changePct.toFixed(2)}%
          </div>
        </div>
        <div className="text-[11px] text-bull mb-3 inline-flex items-center gap-1">
          <span className="size-1.5 rounded-full bg-bull animate-pulse" /> Live · Breakout signal
        </div>
        <div className="-mx-1">
          <AreaChart data={featuredTopic.series} height={120} />
        </div>
        <p className="mt-3 text-xs text-muted-foreground leading-relaxed">{featuredTopic.blurb}</p>
      </div>
    </aside>
  );
}
