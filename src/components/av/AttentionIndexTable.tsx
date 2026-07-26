import { useState, useMemo } from "react";
import {
  topics,
  breakouts,
  trendingProducts,
  hashtags,
  niches,
  creators,
} from "@/lib/mock-data";
import { PlatformIcon } from "./PlatformIcon";
import { Sparkline } from "./Sparkline";
import { SignalBadge } from "./SignalBadge";
import { ChevronRight, Zap, Hash, Users, TrendingUp, Search, Layers } from "lucide-react";
import { useFilters } from "@/lib/filters";

const tfs = ["1D", "1W", "1M", "3M", "1Y"];

type TabKey =
  | "index"
  | "keywords"
  | "breakouts"
  | "products"
  | "hashtags"
  | "niches"
  | "creators";

const TABS: { key: TabKey; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
  { key: "index", label: "Attention Index", icon: Layers },
  { key: "keywords", label: "Trending Keywords", icon: Search },
  { key: "breakouts", label: "Breakout Words", icon: Zap },
  { key: "products", label: "Top Selling Products", icon: TrendingUp },
  { key: "hashtags", label: "Trending Hashtags", icon: Hash },
  { key: "niches", label: "Niche Ranking", icon: Layers },
  { key: "creators", label: "Top Creators", icon: Users },
];

const SUBTITLES: Record<TabKey, string> = {
  index: "Scored attention across Google · YouTube · TikTok · Instagram · Facebook",
  keywords: "Highest-searched terms ranked by attention volume",
  breakouts: "Early-entry signals before they peak",
  products: "Physical & digital products gaining momentum",
  hashtags: "Hashtag velocity across TikTok, Instagram, YouTube & Google",
  niches: "Broad market categories by growth velocity",
  creators: "Voices driving the conversation",
};

const PLACEHOLDERS: Record<TabKey, string> = {
  index: "Search symbols, topics, categories…",
  keywords: "Search keywords…",
  breakouts: "Search breakout keywords…",
  products: "Search products…",
  hashtags: "Search hashtags…",
  niches: "Search niches…",
  creators: "Search creators…",
};

function useFilteredTopics() {
  const { region, niche } = useFilters();
  return useMemo(
    () =>
      topics.filter(
        (t) =>
          (region === "Global" || t.region === region || t.region === "Global") &&
          (niche === "All" || t.category === niche)
      ),
    [region, niche]
  );
}

export function AttentionIndexTable() {
  const [tab, setTab] = useState<TabKey>("index");
  const [query, setQuery] = useState("");

  // reset query when switching tabs
  const changeTab = (t: TabKey) => {
    setTab(t);
    setQuery("");
  };

  return (
    <section className="rounded-2xl border bg-card">
      <div className="p-4 lg:p-5 border-b">
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div>
            <h2 className="font-display text-2xl font-bold">Attention Index ranking</h2>
            <p className="text-xs text-muted-foreground mt-0.5">{SUBTITLES[tab]}</p>
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
        <div className="mt-4 flex items-center gap-1.5 overflow-x-auto scrollbar-thin -mx-1 px-1">
          {TABS.map((t) => {
            const Icon = t.icon;
            const active = tab === t.key;
            return (
              <button
                key={t.key}
                onClick={() => changeTab(t.key)}
                className={`inline-flex items-center gap-1.5 shrink-0 px-3 py-1.5 rounded-full text-xs font-semibold border transition ${
                  active
                    ? "bg-foreground text-background border-foreground"
                    : "bg-transparent text-muted-foreground border-border hover:text-foreground hover:border-foreground/40"
                }`}
              >
                <Icon className="size-3.5" />
                {t.label}
              </button>
            );
          })}
        </div>

        <div className="mt-3 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={PLACEHOLDERS[tab]}
            className="w-full h-9 rounded-full bg-muted pl-9 pr-3 text-sm outline-none focus:ring-2 focus:ring-ring"
          />
        </div>
      </div>

      {tab === "index" && <IndexTable query={query} />}
      {tab === "keywords" && <KeywordsTable query={query} />}
      {tab === "breakouts" && <BreakoutsList query={query} />}
      {tab === "products" && <ProductsList query={query} />}
      {tab === "hashtags" && <HashtagsTable query={query} />}
      {tab === "niches" && <NichesList query={query} />}
      {tab === "creators" && <CreatorsList query={query} />}
    </section>
  );
}

function Empty({ label }: { label: string }) {
  return <div className="p-8 text-center text-sm text-muted-foreground">No {label} match your filters.</div>;
}

function matches(q: string, ...fields: (string | undefined)[]) {
  if (!q) return true;
  const needle = q.toLowerCase();
  return fields.some((f) => f?.toLowerCase().includes(needle));
}

function IndexTable({ query }: { query: string }) {
  const filteredTopics = useFilteredTopics();
  const rows = filteredTopics.filter((t) => matches(query, t.symbol, t.name, t.category, t.platform));
  if (!rows.length) return <Empty label="topics" />;
  return (
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
          {rows.map((t) => {
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
  );
}

function KeywordsTable({ query }: { query: string }) {
  const filteredTopics = useFilteredTopics();
  const keywords = [...filteredTopics]
    .sort((a, b) => b.index - a.index)
    .filter((t) => matches(query, t.symbol, t.name, t.category, t.platform, t.region));
  if (!keywords.length) return <Empty label="keywords" />;
  return (
    <div className="overflow-x-auto scrollbar-thin">
      <table className="w-full text-sm">
        <thead>
          <tr className="text-[11px] uppercase tracking-wider text-muted-foreground border-b">
            <th className="text-left font-medium px-4 lg:px-5 py-3">#</th>
            <th className="text-left font-medium py-3">Keyword</th>
            <th className="text-left font-medium py-3 hidden md:table-cell">Platform</th>
            <th className="text-right font-medium py-3">Search Volume</th>
            <th className="text-right font-medium py-3">Attention</th>
            <th className="text-right font-medium py-3 pr-4 lg:pr-5">Chg %</th>
          </tr>
        </thead>
        <tbody>
          {keywords.map((t, i) => {
            const pos = t.changePct >= 0;
            return (
              <tr key={t.symbol} className="border-b last:border-0 hover:bg-muted/50 cursor-pointer">
                <td className="px-4 lg:px-5 py-3.5 text-xs font-mono text-muted-foreground">
                  {String(i + 1).padStart(2, "0")}
                </td>
                <td className="py-3.5">
                  <div className="flex items-center gap-2.5">
                    <PlatformIcon platform={t.platform} size={26} />
                    <div className="min-w-0">
                      <div className="font-semibold truncate">{t.name}</div>
                      <div className="text-[11px] text-muted-foreground">{t.category} · {t.region}</div>
                    </div>
                  </div>
                </td>
                <td className="py-3.5 hidden md:table-cell text-xs text-muted-foreground">{t.platform}</td>
                <td className="py-3.5 text-right num font-medium">{t.volume}</td>
                <td className="py-3.5 text-right num font-semibold">{t.index.toFixed(1)}</td>
                <td className={`py-3.5 text-right num font-bold pr-4 lg:pr-5 ${pos ? "text-bull" : "text-bear"}`}>
                  {pos ? "+" : ""}{t.changePct.toFixed(2)}%
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

function BreakoutsList({ query }: { query: string }) {
  const rows = breakouts.filter((b) => matches(query, b.keyword, b.platform));
  if (!rows.length) return <Empty label="breakouts" />;
  return (
    <ul className="divide-y">
      {rows.map((b, i) => {
        const vol = `${(b.score * 3.2).toFixed(0)}K`;
        return (
          <li key={b.keyword} className="flex items-center gap-3 px-4 lg:px-5 py-3.5 hover:bg-muted/50 cursor-pointer">
            <div className="text-xs font-mono text-muted-foreground w-6">{String(i + 1).padStart(2, "0")}</div>
            <PlatformIcon platform={b.platform} size={28} />
            <div className="min-w-0 flex-1">
              <div className="font-semibold text-sm truncate">{b.keyword}</div>
              <div className="text-[11px] text-muted-foreground">{b.platform} · emerged {b.age} ago</div>
            </div>
            <div className="text-right shrink-0 w-20 hidden sm:block">
              <div className="text-sm font-semibold num">{vol}</div>
              <div className="text-[10px] text-muted-foreground uppercase tracking-wider">Volume</div>
            </div>
            <div className="text-right">
              <div className="text-sm font-bold text-bull num">{b.growth}</div>
              <div className="text-[10px] text-muted-foreground uppercase tracking-wider">Score {b.score}</div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}


function ProductsList({ query }: { query: string }) {
  const { niche } = useFilters();
  const rows = trendingProducts.filter(
    (p) =>
      (niche === "All" || p.category === niche) &&
      matches(query, p.name, p.category, p.platform)
  );
  if (!rows.length) return <Empty label="products" />;
  return (
    <ul className="divide-y">
      {rows.map((p) => (
        <li key={p.name} className="flex items-center gap-3 px-4 lg:px-5 py-3.5 hover:bg-muted/50 cursor-pointer">
          <PlatformIcon platform={p.platform} size={32} />
          <div className="min-w-0 flex-1">
            <div className="font-semibold truncate">{p.name}</div>
            <div className="text-xs text-muted-foreground">
              {p.category} · {p.price}
            </div>
          </div>
          <Sparkline data={p.spark} width={70} height={28} />
          <div className="text-right shrink-0 w-20 hidden sm:block">
            <div className="text-sm font-semibold num">{p.searches}</div>
            <div className="text-[10px] text-muted-foreground uppercase tracking-wider">Search vol</div>
          </div>
          <div className="text-right shrink-0 w-20">
            <div className="text-sm font-bold text-bull num">+{p.growth}%</div>
            <div className="text-[10px] text-muted-foreground uppercase tracking-wider">30d</div>
          </div>
        </li>
      ))}
    </ul>
  );
}


function HashtagsTable({ query }: { query: string }) {
  const rows = hashtags.filter((h) => matches(query, h.tag, h.platform));
  if (!rows.length) return <Empty label="hashtags" />;
  return (
    <div className="overflow-x-auto scrollbar-thin">
      <table className="w-full text-sm">
        <thead>
          <tr className="text-[11px] uppercase tracking-wider text-muted-foreground border-b">
            <th className="text-left font-medium px-4 lg:px-5 py-3">Hashtag</th>
            <th className="text-right font-medium py-3 hidden sm:table-cell">Posts</th>
            <th className="text-right font-medium py-3 hidden md:table-cell">Reach</th>
            <th className="text-right font-medium py-3 hidden lg:table-cell">Search Vol</th>
            <th className="text-left font-medium py-3 pl-6">Sentiment</th>
            <th className="text-right font-medium py-3 pr-4 lg:pr-5">30d</th>

          </tr>
        </thead>
        <tbody>
          {rows.map((h) => {
            const pos = h.growth >= 0;
            const sentColor =
              h.sentiment >= 75 ? "bg-bull" : h.sentiment >= 55 ? "bg-warn" : "bg-bear";
            return (
              <tr key={h.tag} className="border-b last:border-0 hover:bg-muted/50 cursor-pointer">
                <td className="px-4 lg:px-5 py-3">
                  <div className="flex items-center gap-2.5">
                    <PlatformIcon platform={h.platform} size={24} />
                    <span className="font-display font-bold">{h.tag}</span>
                  </div>
                </td>
                <td className="py-3 text-right num text-muted-foreground hidden sm:table-cell">{h.posts}</td>
                <td className="py-3 text-right num text-muted-foreground hidden md:table-cell">{h.reach}</td>
                <td className="py-3 text-right num text-muted-foreground hidden lg:table-cell">{h.reach.replace("M", "K").replace("B", "M")}</td>

                <td className="py-3 pl-6">
                  <div className="flex items-center gap-2">
                    <div className="h-1.5 w-20 rounded-full bg-muted overflow-hidden">
                      <div className={`h-full ${sentColor}`} style={{ width: `${h.sentiment}%` }} />
                    </div>
                    <span className="text-[11px] num text-muted-foreground w-6">{h.sentiment}</span>
                  </div>
                </td>
                <td className={`py-3 text-right num font-bold pr-4 lg:pr-5 ${pos ? "text-bull" : "text-bear"}`}>
                  {pos ? "+" : ""}{h.growth}%
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

function NichesList({ query }: { query: string }) {
  const { niche } = useFilters();
  const rows = niches.filter(
    (n) => (niche === "All" || n.name.toLowerCase().includes(niche.toLowerCase())) && matches(query, n.name)
  );
  if (!rows.length) return <Empty label="niches" />;
  return (
    <ul className="divide-y">
      {rows.map((n, i) => {
        const pos = n.growth >= 0;
        return (
          <li key={n.name} className="flex items-center gap-4 px-4 lg:px-5 py-3.5 hover:bg-muted/50 cursor-pointer">
            <div className="text-xs font-mono text-muted-foreground w-5">{i + 1}</div>
            <div className="min-w-0 flex-1">
              <div className="font-semibold">{n.name}</div>
              <div className="text-xs text-muted-foreground">{n.topics} topics · {n.share}% share</div>
            </div>
            <Sparkline data={n.spark} width={80} height={28} />
            <div className={`text-sm font-bold num w-16 text-right ${pos ? "text-bull" : "text-bear"}`}>
              {pos ? "+" : ""}{n.growth}%
            </div>
          </li>
        );
      })}
    </ul>
  );
}

function CreatorsList({ query }: { query: string }) {
  const { niche } = useFilters();
  const rows = creators.filter(
    (c) =>
      (niche === "All" || c.topic.toLowerCase().includes(niche.toLowerCase())) &&
      matches(query, c.handle, c.platform, c.topic)
  );
  if (!rows.length) return <Empty label="creators" />;
  return (
    <ul className="divide-y">
      {rows.map((c, i) => (
        <li key={c.handle} className="flex items-center gap-3 px-4 lg:px-5 py-3.5 hover:bg-muted/50 cursor-pointer">
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
  );
}
