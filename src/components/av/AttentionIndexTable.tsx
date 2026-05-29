import { topics } from "@/lib/mock-data";
import { PlatformIcon } from "./PlatformIcon";
import { Sparkline } from "./Sparkline";
import { SignalBadge } from "./SignalBadge";
import { ChevronRight } from "lucide-react";

const tfs = ["1D", "1W", "1M", "3M", "1Y"];

export function AttentionIndexTable() {
  return (
    <section className="rounded-2xl border bg-card">
      <div className="flex items-center justify-between p-4 lg:p-5 border-b">
        <div>
          <h2 className="font-display text-2xl font-bold">Attention Index ranking</h2>
          <p className="text-xs text-muted-foreground mt-0.5">
            Scored attention across Google · YouTube · TikTok · Instagram · Facebook
          </p>
        </div>
        <div className="hidden sm:flex items-center gap-1 rounded-full bg-muted p-1">
          {tfs.map((t, i) => (
            <button
              key={t}
              className={`px-3 py-1 text-xs font-semibold rounded-full ${
                i === 2 ? "bg-background shadow-sm" : "text-muted-foreground"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>
      <div className="overflow-x-auto scrollbar-thin">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-[11px] uppercase tracking-wider text-muted-foreground border-b">
              <th className="text-left font-medium px-4 lg:px-5 py-3">Symbol</th>
              <th className="text-left font-medium py-3 hidden md:table-cell">Platform</th>
              <th className="text-right font-medium py-3">Index</th>
              <th className="text-right font-medium py-3">Chg</th>
              <th className="text-right font-medium py-3">Chg %</th>
              <th className="text-right font-medium py-3 hidden lg:table-cell">Volume</th>
              <th className="text-left font-medium py-3 pl-6 hidden md:table-cell">Signal</th>
              <th className="text-right font-medium py-3 pr-4 lg:pr-5">30d</th>
            </tr>
          </thead>
          <tbody>
            {topics.map((t) => {
              const pos = t.change >= 0;
              return (
                <tr key={t.symbol} className="border-b last:border-0 hover:bg-muted/50 cursor-pointer group">
                  <td className="px-4 lg:px-5 py-3.5">
                    <div className="flex items-center gap-3">
                      <PlatformIcon platform={t.platform} size={32} />
                      <div className="min-w-0">
                        <div className="font-display font-bold flex items-center gap-1">
                          {t.symbol}
                          <ChevronRight className="size-3 opacity-0 group-hover:opacity-100 transition" />
                        </div>
                        <div className="text-xs text-muted-foreground truncate">
                          {t.name} · {t.category}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="py-3.5 hidden md:table-cell">
                    <span className="text-xs text-muted-foreground">{t.platform}</span>
                  </td>
                  <td className="py-3.5 text-right num font-semibold">{t.index.toFixed(2)}</td>
                  <td className={`py-3.5 text-right num font-medium ${pos ? "text-bull" : "text-bear"}`}>
                    {pos ? "+" : ""}{t.change.toFixed(2)}
                  </td>
                  <td className={`py-3.5 text-right num font-semibold ${pos ? "text-bull" : "text-bear"}`}>
                    {pos ? "+" : ""}{t.changePct.toFixed(2)}%
                  </td>
                  <td className="py-3.5 text-right num text-muted-foreground hidden lg:table-cell">{t.volume}</td>
                  <td className="py-3.5 pl-6 hidden md:table-cell">
                    <SignalBadge signal={t.signal} />
                  </td>
                  <td className="py-3.5 pr-4 lg:pr-5">
                    <div className="flex justify-end">
                      <Sparkline data={t.spark} width={100} height={32} />
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
}
