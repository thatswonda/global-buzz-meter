import { useEffect, useState } from "react";
import { topics } from "@/lib/mock-data";
import { PlatformIcon } from "./PlatformIcon";
import { Sparkline } from "./Sparkline";
import { ChevronRight, Megaphone, ExternalLink } from "lucide-react";

const ADS = [
  {
    tag: "Sponsored",
    brand: "Semrush",
    title: "Track any keyword across 142 countries",
    cta: "Start free trial",
    accent: "from-info/20 to-info/5",
  },
  {
    tag: "Promoted",
    brand: "Notion AI",
    title: "Turn attention signals into content briefs",
    cta: "Try it now",
    accent: "from-primary/20 to-primary/5",
  },
  {
    tag: "Sponsored",
    brand: "Shopify",
    title: "Launch a store around trending products in minutes",
    cta: "Get started",
    accent: "from-bull/20 to-bull/5",
  },
  {
    tag: "Ad",
    brand: "Meta Ads",
    title: "Reach breakout audiences before your competitors",
    cta: "Create campaign",
    accent: "from-warn/25 to-warn/5",
  },
  {
    tag: "Sponsored",
    brand: "HubSpot",
    title: "Convert trend spikes into pipeline",
    cta: "Book a demo",
    accent: "from-bear/20 to-bear/5",
  },
];

function AdSlot({ ad }: { ad: (typeof ADS)[number] }) {
  return (
    <div
      className={`relative rounded-2xl border p-4 h-full bg-gradient-to-br ${ad.accent} cursor-pointer hover:border-foreground/25 transition overflow-hidden`}
    >
      <div className="flex items-center justify-between mb-3">
        <span className="inline-flex items-center gap-1 text-[10px] uppercase tracking-wider font-semibold text-muted-foreground bg-background/80 backdrop-blur px-2 py-0.5 rounded-full">
          <Megaphone className="size-3" /> {ad.tag}
        </span>
        <ExternalLink className="size-3.5 text-muted-foreground" />
      </div>
      <div className="text-xs font-semibold text-muted-foreground mb-1">{ad.brand}</div>
      <div className="font-display font-bold text-base leading-snug mb-4 line-clamp-2">
        {ad.title}
      </div>
      <button className="text-xs font-semibold px-3 py-1.5 rounded-full bg-foreground text-background hover:opacity-90">
        {ad.cta}
      </button>
    </div>
  );
}

function AdsReel() {
  const [offset, setOffset] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setOffset((o) => (o + 1) % ADS.length), 3500);
    return () => clearInterval(id);
  }, []);
  // Duplicate for seamless loop
  const loop = [...ADS, ...ADS];
  return (
    <div className="rounded-2xl border bg-card/50 p-2 overflow-hidden self-start">
      <div className="flex items-center justify-between px-2 pb-2">
        <span className="text-[10px] uppercase tracking-wider font-semibold text-muted-foreground">
          Sponsored
        </span>
        <div className="flex gap-1">
          {ADS.map((_, i) => (
            <span
              key={i}
              className={`size-1 rounded-full transition ${
                i === offset % ADS.length ? "bg-foreground" : "bg-muted-foreground/30"
              }`}
            />
          ))}
        </div>
      </div>
      <div className="overflow-hidden">
        <div
          className="grid grid-flow-col auto-cols-[75%] gap-2 transition-transform duration-700 ease-in-out"
          style={{ transform: `translateX(calc(-${offset} * (75% + 8px)))` }}
        >
          {loop.map((ad, i) => (
            <AdSlot key={i} ad={ad} />
          ))}
        </div>
      </div>
    </div>
  );
}

export function TopicCarousel() {
  const featured = topics.slice(0, 5);
  return (
    <section className="px-4 lg:px-6 py-4">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
          Community trends
        </h2>
        <a href="#" className="text-xs text-muted-foreground hover:text-foreground inline-flex items-center gap-1">
          View all <ChevronRight className="size-3" />
        </a>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_220px] gap-3 items-start">
        <div className="grid grid-flow-col auto-cols-[minmax(240px,1fr)] gap-3 overflow-x-auto scrollbar-thin pb-2 -mx-1 px-1">
          {featured.map((t, i) => {
            const pos = t.change >= 0;
            return (
              <div
                key={t.symbol}
                className="relative rounded-2xl border bg-card p-4 hover:shadow-md hover:border-foreground/15 transition-all cursor-pointer group"
              >
                <div className="absolute top-3 right-3 size-6 rounded-full bg-muted text-foreground text-[11px] font-bold font-mono grid place-items-center">
                  {i + 1}
                </div>
                <div className="flex items-start gap-3 pr-8">
                  <PlatformIcon platform={t.platform} size={36} />
                  <div className="min-w-0 flex-1">
                    <div className="font-display font-bold text-base truncate">{t.symbol}</div>
                    <div className="text-xs text-muted-foreground truncate">
                      {t.name} · {t.platform}
                    </div>
                  </div>
                </div>
                <div className="mt-4 flex items-end justify-between">
                  <div>
                    <div className="text-2xl font-display font-bold num">{t.index.toFixed(2)}</div>
                    <div className={`text-sm font-semibold num ${pos ? "text-bull" : "text-bear"}`}>
                      {pos ? "+" : ""}
                      {t.changePct.toFixed(2)}%
                    </div>
                  </div>
                  <Sparkline data={t.spark} width={90} height={32} />
                </div>
              </div>
            );
          })}
        </div>
        <AdsReel />
      </div>
    </section>
  );
}
