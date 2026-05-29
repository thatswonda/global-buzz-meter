import { createFileRoute } from "@tanstack/react-router";
import { TopBar } from "@/components/av/TopBar";
import { CategoryTabs } from "@/components/av/CategoryTabs";
import { MarketStrip } from "@/components/av/MarketStrip";
import { TopicCarousel } from "@/components/av/TopicCarousel";
import { AttentionIndexTable } from "@/components/av/AttentionIndexTable";
import { TrendingProducts } from "@/components/av/TrendingProducts";
import { Breakouts } from "@/components/av/Breakouts";
import { Niches } from "@/components/av/Niches";
import { Regions } from "@/components/av/Regions";
import { LiveFeed } from "@/components/av/LiveFeed";
import { Watchlist } from "@/components/av/Watchlist";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "AttentionView — Social & Search Market Intelligence" },
      {
        name: "description",
        content:
          "Real-time attention, demand, and trend analytics across Google, YouTube, TikTok, Instagram, and Facebook. Trade insights like markets.",
      },
      { property: "og:title", content: "AttentionView — Market Intelligence for Attention" },
      {
        property: "og:description",
        content: "Attention Index, breakout keywords, trending products, niche rankings, regional demand — live.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen bg-surface">
      <TopBar />
      <MarketStrip />
      <CategoryTabs />

      <main className="mx-auto max-w-[1600px]">
        <TopicCarousel />

        <div className="grid grid-cols-1 xl:grid-cols-[1fr_360px] gap-4 px-4 lg:px-6 pb-8">
          <div className="space-y-4 min-w-0">
            <AttentionIndexTable />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <TrendingProducts />
              <Breakouts />
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <Niches />
              <Regions />
            </div>
            <LiveFeed />
          </div>

          <Watchlist />
        </div>

        <footer className="border-t mt-8 px-4 lg:px-6 py-8 text-xs text-muted-foreground flex flex-wrap gap-4 justify-between">
          <div className="flex items-center gap-2">
            <span className="size-1.5 rounded-full bg-bull animate-pulse" />
            Markets data updating in real time
          </div>
          <div className="flex gap-4">
            <a href="#" className="hover:text-foreground">About</a>
            <a href="#" className="hover:text-foreground">API</a>
            <a href="#" className="hover:text-foreground">Methodology</a>
            <a href="#" className="hover:text-foreground">Terms</a>
          </div>
          <div>© 2026 AttentionView</div>
        </footer>
      </main>
    </div>
  );
}
