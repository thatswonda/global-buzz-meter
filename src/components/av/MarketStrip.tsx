import { topics } from "@/lib/mock-data";

export function MarketStrip() {
  // Duplicate for seamless marquee
  const items = [...topics.slice(0, 10), ...topics.slice(0, 10)];
  return (
    <div className="border-b bg-surface overflow-hidden">
      <div className="flex gap-8 px-6 py-2 animate-[scroll_60s_linear_infinite] whitespace-nowrap">
        {items.map((t, i) => {
          const pos = t.change >= 0;
          return (
            <div key={i} className="flex items-center gap-2 text-xs shrink-0">
              <span className="font-bold font-display">{t.symbol}</span>
              <span className="num text-muted-foreground">{t.index.toFixed(2)}</span>
              <span className={`num font-semibold ${pos ? "text-bull" : "text-bear"}`}>
                {pos ? "+" : ""}{t.changePct.toFixed(2)}%
              </span>
            </div>
          );
        })}
      </div>
      <style>{`@keyframes scroll { from { transform: translateX(0); } to { transform: translateX(-50%); } }`}</style>
    </div>
  );
}
