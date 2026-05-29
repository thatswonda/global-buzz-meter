import { breakouts } from "@/lib/mock-data";
import { PlatformIcon } from "./PlatformIcon";
import { Zap } from "lucide-react";

export function Breakouts() {
  return (
    <section className="rounded-2xl border bg-card">
      <div className="p-4 lg:p-5 border-b flex items-center justify-between">
        <div>
          <h2 className="font-display text-2xl font-bold flex items-center gap-2">
            Breakout keywords <Zap className="size-5 text-warn fill-warn" />
          </h2>
          <p className="text-xs text-muted-foreground mt-0.5">Early-entry signals before they peak</p>
        </div>
      </div>
      <ul className="divide-y">
        {breakouts.map((b, i) => (
          <li key={b.keyword} className="flex items-center gap-3 px-4 lg:px-5 py-3 hover:bg-muted/50 cursor-pointer">
            <div className="text-xs font-mono text-muted-foreground w-6">{String(i + 1).padStart(2, "0")}</div>
            <PlatformIcon platform={b.platform} size={26} />
            <div className="min-w-0 flex-1">
              <div className="font-semibold text-sm truncate">{b.keyword}</div>
              <div className="text-[11px] text-muted-foreground">{b.platform} · emerged {b.age} ago</div>
            </div>
            <div className="text-right">
              <div className="text-sm font-bold text-bull num">{b.growth}</div>
              <div className="text-[10px] text-muted-foreground uppercase tracking-wider">Score {b.score}</div>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
