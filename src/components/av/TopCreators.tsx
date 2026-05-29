import { creators } from "@/lib/mock-data";
import { PlatformIcon } from "./PlatformIcon";
import { Users } from "lucide-react";

export function TopCreators() {
  return (
    <section className="rounded-2xl border bg-card">
      <div className="p-4 lg:p-5 border-b flex items-center justify-between">
        <div>
          <h2 className="font-display text-2xl font-bold flex items-center gap-2">
            Top creators <Users className="size-5 text-primary" />
          </h2>
          <p className="text-xs text-muted-foreground mt-0.5">Voices driving the conversation</p>
        </div>
      </div>
      <ul className="divide-y">
        {creators.map((c, i) => (
          <li key={c.handle} className="flex items-center gap-3 px-4 lg:px-5 py-3 hover:bg-muted/50 cursor-pointer">
            <div className="text-xs font-mono text-muted-foreground w-5">{i + 1}</div>
            <PlatformIcon platform={c.platform} size={30} />
            <div className="min-w-0 flex-1">
              <div className="font-semibold text-sm truncate">{c.handle}</div>
              <div className="text-[11px] text-muted-foreground truncate">
                {c.followers} followers · {c.topic}
              </div>
            </div>
            <div className="text-right shrink-0">
              <div className="text-sm font-bold num">{c.engagement}%</div>
              <div className="text-[10px] uppercase tracking-wider text-muted-foreground">Engage</div>
            </div>
            <div className={`text-sm font-bold num w-12 text-right ${c.growth >= 0 ? "text-bull" : "text-bear"}`}>
              {c.growth >= 0 ? "+" : ""}{c.growth}%
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
