import { useState } from "react";
import { watchlist, featuredTopic } from "@/lib/mock-data";
import { Plus, Grid3x3, MoreHorizontal, Bookmark, Sparkles, Send } from "lucide-react";
import { AreaChart } from "./AreaChart";

const SUGGESTIONS = [
  "Which niches are breaking out this week?",
  "Compare AI.AGENTS vs SORA.AI",
  "Best products to launch in APAC",
];

export function Watchlist() {
  const [msg, setMsg] = useState("");
  return (
    <aside className="relative xl:sticky xl:top-4 xl:h-[calc(100vh-2rem)] flex flex-col gap-4">
      <div className="flex-1 min-h-0 overflow-y-auto scrollbar-thin space-y-4 pb-2 pr-1 -mr-1">

      {/* Watchlist */}
      <div className="rounded-2xl border bg-card overflow-hidden">
        <div className="flex items-center justify-between px-4 py-3 border-b">
          <button className="flex items-center gap-1.5 font-semibold text-sm">
            <Bookmark className="size-4 text-bear fill-bear" />
            Watch list
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
      </div>

      {/* AI analyst chat — pinned; watchlist scrolls behind */}
      <div className="rounded-2xl border bg-card/95 backdrop-blur-md shadow-lg overflow-hidden shrink-0">
        <div className="flex items-center gap-2 px-4 py-2.5 border-b bg-gradient-to-r from-primary/10 via-transparent to-info/10">
          <div className="size-6 rounded-full bg-foreground text-background grid place-items-center">
            <Sparkles className="size-3.5" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-sm font-bold font-display leading-tight">Attention AI</div>
            <div className="text-[10px] text-muted-foreground leading-tight">
              Analyzes trends · gives recommendations
            </div>
          </div>
          <span className="text-[10px] text-bull inline-flex items-center gap-1">
            <span className="size-1.5 rounded-full bg-bull animate-pulse" /> Live
          </span>
        </div>
        <div className="p-3 space-y-2">
          <div className="rounded-xl bg-muted/60 px-3 py-2 text-xs leading-relaxed">
            <span className="font-semibold">Insight:</span> AI.AGENTS is breaking out on Google
            (+9.8%). Consider entering before saturation in ~2 weeks.
          </div>
          <div className="flex flex-wrap gap-1.5">
            {SUGGESTIONS.map((s) => (
              <button
                key={s}
                onClick={() => setMsg(s)}
                className="text-[10px] px-2 py-1 rounded-full border border-border text-muted-foreground hover:text-foreground hover:border-foreground/40 transition"
              >
                {s}
              </button>
            ))}
          </div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setMsg("");
            }}
            className="relative"
          >
            <input
              value={msg}
              onChange={(e) => setMsg(e.target.value)}
              placeholder="Ask about any trend, niche, or keyword…"
              className="w-full h-9 rounded-full bg-muted pl-3 pr-10 text-xs outline-none focus:ring-2 focus:ring-ring"
            />
            <button
              type="submit"
              className="absolute right-1 top-1 size-7 rounded-full bg-foreground text-background grid place-items-center hover:opacity-90"
            >
              <Send className="size-3.5" />
            </button>
          </form>
        </div>
      </div>
    </aside>

  );
}
