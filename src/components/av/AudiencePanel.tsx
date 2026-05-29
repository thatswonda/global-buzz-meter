import { demographics, formats } from "@/lib/mock-data";
import { Users2, PieChart } from "lucide-react";

export function AudiencePanel() {
  const { age, gender, sentiment } = demographics;
  const maxAge = Math.max(...age.map((a) => a.pct));

  return (
    <section className="rounded-2xl border bg-card">
      <div className="p-4 lg:p-5 border-b flex items-center justify-between">
        <div>
          <h2 className="font-display text-2xl font-bold flex items-center gap-2">
            Audience & sentiment <Users2 className="size-5 text-info" />
          </h2>
          <p className="text-xs text-muted-foreground mt-0.5">Who's driving attention on the featured topic</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 divide-y lg:divide-y-0 lg:divide-x">
        {/* Age */}
        <div className="p-4 lg:p-5">
          <div className="text-[11px] uppercase tracking-wider text-muted-foreground font-semibold mb-3">
            Age distribution
          </div>
          <div className="space-y-2">
            {age.map((a) => (
              <div key={a.bucket} className="flex items-center gap-3">
                <span className="text-xs font-mono text-muted-foreground w-12">{a.bucket}</span>
                <div className="flex-1 h-2 rounded-full bg-muted overflow-hidden">
                  <div
                    className="h-full bg-primary"
                    style={{ width: `${(a.pct / maxAge) * 100}%` }}
                  />
                </div>
                <span className="text-xs num font-semibold w-8 text-right">{a.pct}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* Gender + sentiment */}
        <div className="p-4 lg:p-5 space-y-5">
          <div>
            <div className="text-[11px] uppercase tracking-wider text-muted-foreground font-semibold mb-3">
              Gender split
            </div>
            <div className="flex h-3 rounded-full overflow-hidden">
              <div className="bg-info" style={{ width: `${gender[0].pct}%` }} />
              <div className="bg-primary" style={{ width: `${gender[1].pct}%` }} />
              <div className="bg-warn" style={{ width: `${gender[2].pct}%` }} />
            </div>
            <div className="mt-2 grid grid-cols-3 gap-2 text-[11px]">
              {gender.map((g, i) => (
                <div key={g.label} className="flex items-center gap-1.5">
                  <span
                    className={`size-2 rounded-sm ${
                      i === 0 ? "bg-info" : i === 1 ? "bg-primary" : "bg-warn"
                    }`}
                  />
                  <span className="text-muted-foreground">{g.label}</span>
                  <span className="num font-semibold ml-auto">{g.pct}%</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <div className="text-[11px] uppercase tracking-wider text-muted-foreground font-semibold mb-3">
              Sentiment
            </div>
            <div className="flex h-3 rounded-full overflow-hidden">
              <div className="bg-bull" style={{ width: `${sentiment.positive}%` }} />
              <div className="bg-muted-foreground/40" style={{ width: `${sentiment.neutral}%` }} />
              <div className="bg-bear" style={{ width: `${sentiment.negative}%` }} />
            </div>
            <div className="mt-2 flex justify-between text-[11px]">
              <span className="text-bull font-semibold num">▲ {sentiment.positive}% positive</span>
              <span className="text-muted-foreground num">{sentiment.neutral}% neutral</span>
              <span className="text-bear font-semibold num">▼ {sentiment.negative}% negative</span>
            </div>
          </div>
        </div>

        {/* Format breakdown */}
        <div className="p-4 lg:p-5">
          <div className="text-[11px] uppercase tracking-wider text-muted-foreground font-semibold mb-3 flex items-center gap-1.5">
            <PieChart className="size-3" /> Content formats
          </div>
          <ul className="space-y-2">
            {formats.map((f) => (
              <li key={f.format} className="flex items-center gap-3">
                <span className="text-xs flex-1 truncate">{f.format}</span>
                <div className="w-20 h-1.5 rounded-full bg-muted overflow-hidden">
                  <div className="h-full bg-foreground" style={{ width: `${f.share * 2.6}%` }} />
                </div>
                <span className="text-xs num w-8 text-right">{f.share}%</span>
                <span className={`text-[11px] num w-10 text-right font-semibold ${f.growth >= 0 ? "text-bull" : "text-bear"}`}>
                  {f.growth >= 0 ? "+" : ""}{f.growth}%
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
