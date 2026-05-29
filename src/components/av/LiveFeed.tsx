import { feed } from "@/lib/mock-data";
import { PlatformIcon } from "./PlatformIcon";
import { Radio } from "lucide-react";

const typeStyle: Record<string, string> = {
  breakout: "text-warn",
  rising: "text-bull",
  declining: "text-bear",
  alert: "text-info",
};

export function LiveFeed() {
  return (
    <section className="rounded-2xl border bg-card">
      <div className="p-4 lg:p-5 border-b flex items-center justify-between">
        <div>
          <h2 className="font-display text-2xl font-bold">Live activity</h2>
          <p className="text-xs text-muted-foreground mt-0.5">Real-time platform updates</p>
        </div>
        <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-bull">
          <Radio className="size-3.5 animate-pulse" /> LIVE
        </span>
      </div>
      <ul className="divide-y max-h-[420px] overflow-y-auto scrollbar-thin">
        {feed.map((f, i) => {
          const isPos = !f.delta.startsWith("-");
          return (
            <li key={i} className="flex items-center gap-3 px-4 lg:px-5 py-3 hover:bg-muted/50">
              <span className="text-[10px] font-mono text-muted-foreground w-10">{f.time}</span>
              <PlatformIcon platform={f.platform} size={22} />
              <div className="min-w-0 flex-1">
                <div className="text-sm font-medium truncate">{f.topic}</div>
                <div className={`text-[10px] uppercase tracking-wider font-semibold ${typeStyle[f.type]}`}>
                  {f.type}
                </div>
              </div>
              <span className={`text-sm font-bold num ${isPos ? "text-bull" : "text-bear"}`}>{f.delta}</span>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
