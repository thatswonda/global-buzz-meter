// Mock data for AttentionView platform

export type Platform = "Google" | "YouTube" | "TikTok" | "Instagram" | "Facebook";
export type Signal = "Breakout" | "Rising" | "Watch" | "Declining" | "Fading";

export const PLATFORMS: Platform[] = ["Google", "YouTube", "TikTok", "Instagram", "Facebook"];

export const platformColor: Record<Platform, string> = {
  Google: "#4285F4",
  YouTube: "#FF0033",
  TikTok: "#25F4EE",
  Instagram: "#E1306C",
  Facebook: "#1877F2",
};

export type Topic = {
  symbol: string;
  name: string;
  category: string;
  platform: Platform;
  index: number;
  change: number;
  changePct: number;
  volume: string;
  signal: Signal;
  region: string;
  spark: number[];
};

const rand = (seed: number) => {
  let s = seed;
  return () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
};

export const makeSpark = (seed: number, len = 32, trend = 0): number[] => {
  const r = rand(seed);
  let v = 50 + r() * 20;
  const out: number[] = [];
  for (let i = 0; i < len; i++) {
    v += (r() - 0.5) * 8 + trend;
    out.push(Math.max(5, Math.min(100, v)));
  }
  return out;
};

export const topics: Topic[] = [
  { symbol: "AI.AGENTS", name: "AI Agents", category: "Tech", platform: "Google", index: 94.27, change: 8.42, changePct: 9.81, volume: "2.4M", signal: "Breakout", region: "Global", spark: makeSpark(1, 32, 1.2) },
  { symbol: "OZEMPIC", name: "GLP-1 / Ozempic", category: "Health", platform: "TikTok", index: 88.51, change: 4.21, changePct: 5.02, volume: "1.8M", signal: "Rising", region: "US", spark: makeSpark(2, 32, 0.8) },
  { symbol: "STANLEY.CUP", name: "Stanley Tumbler", category: "Lifestyle", platform: "Instagram", index: 76.34, change: -2.15, changePct: -2.74, volume: "920K", signal: "Declining", region: "US", spark: makeSpark(3, 32, -0.6) },
  { symbol: "LABUBU", name: "Labubu Plush", category: "Collectibles", platform: "TikTok", index: 91.08, change: 12.55, changePct: 15.97, volume: "3.1M", signal: "Breakout", region: "APAC", spark: makeSpark(4, 32, 1.8) },
  { symbol: "PADEL", name: "Padel Tennis", category: "Sports", platform: "YouTube", index: 72.18, change: 3.04, changePct: 4.39, volume: "640K", signal: "Rising", region: "EU", spark: makeSpark(5, 32, 0.7) },
  { symbol: "MATCHA", name: "Ceremonial Matcha", category: "Food & Bev", platform: "Instagram", index: 81.65, change: 5.92, changePct: 7.82, volume: "1.2M", signal: "Rising", region: "Global", spark: makeSpark(6, 32, 1.0) },
  { symbol: "CYBERTRUCK", name: "Cybertruck", category: "Auto", platform: "YouTube", index: 58.22, change: -4.83, changePct: -7.66, volume: "880K", signal: "Fading", region: "US", spark: makeSpark(7, 32, -1.1) },
  { symbol: "PILATES", name: "Reformer Pilates", category: "Fitness", platform: "TikTok", index: 84.49, change: 6.18, changePct: 7.89, volume: "1.5M", signal: "Rising", region: "Global", spark: makeSpark(8, 32, 0.9) },
  { symbol: "K-BEAUTY", name: "Korean Skincare", category: "Beauty", platform: "Instagram", index: 79.91, change: 2.34, changePct: 3.02, volume: "1.1M", signal: "Watch", region: "APAC", spark: makeSpark(9, 32, 0.4) },
  { symbol: "PICKLEBALL", name: "Pickleball", category: "Sports", platform: "Google", index: 87.04, change: 4.55, changePct: 5.52, volume: "1.7M", signal: "Rising", region: "US", spark: makeSpark(10, 32, 0.8) },
  { symbol: "SORA.AI", name: "Sora Video AI", category: "Tech", platform: "YouTube", index: 95.71, change: 14.21, changePct: 17.46, volume: "4.2M", signal: "Breakout", region: "Global", spark: makeSpark(11, 32, 2.0) },
  { symbol: "BIRKIN", name: "Hermès Birkin", category: "Luxury", platform: "Instagram", index: 68.42, change: 1.12, changePct: 1.66, volume: "410K", signal: "Watch", region: "EU", spark: makeSpark(12, 32, 0.2) },
  { symbol: "QUIET.LUX", name: "Quiet Luxury", category: "Fashion", platform: "TikTok", index: 62.18, change: -3.42, changePct: -5.21, volume: "720K", signal: "Declining", region: "Global", spark: makeSpark(13, 32, -0.7) },
  { symbol: "VISION.PRO", name: "Apple Vision Pro", category: "Tech", platform: "YouTube", index: 51.04, change: -6.21, changePct: -10.86, volume: "560K", signal: "Fading", region: "Global", spark: makeSpark(14, 32, -1.3) },
];

export type TrendingProduct = {
  name: string;
  category: string;
  price: string;
  growth: number;
  platform: Platform;
  searches: string;
  spark: number[];
};

export const trendingProducts: TrendingProduct[] = [
  { name: "Stanley Quencher H2.0 40oz", category: "Drinkware", price: "$45", growth: 218, platform: "TikTok", searches: "1.2M", spark: makeSpark(21, 24, 1.4) },
  { name: "Labubu Series 3 Blind Box", category: "Collectibles", price: "$28", growth: 412, platform: "TikTok", searches: "2.8M", spark: makeSpark(22, 24, 2.1) },
  { name: "Lululemon Define Jacket", category: "Apparel", price: "$118", growth: 87, platform: "Instagram", searches: "640K", spark: makeSpark(23, 24, 0.8) },
  { name: "Dyson Airwrap Complete", category: "Beauty Tech", price: "$599", growth: 124, platform: "YouTube", searches: "890K", spark: makeSpark(24, 24, 1.1) },
  { name: "Meta Ray-Ban Smart Glasses", category: "Wearables", price: "$329", growth: 196, platform: "Instagram", searches: "1.1M", spark: makeSpark(25, 24, 1.6) },
  { name: "Owala FreeSip 24oz", category: "Drinkware", price: "$30", growth: 73, platform: "TikTok", searches: "520K", spark: makeSpark(26, 24, 0.6) },
];

export type Niche = {
  name: string;
  growth: number;
  topics: number;
  share: number;
  spark: number[];
};

export const niches: Niche[] = [
  { name: "Generative AI", growth: 184, topics: 412, share: 18.4, spark: makeSpark(31, 20, 1.8) },
  { name: "Wellness & Longevity", growth: 92, topics: 287, share: 12.1, spark: makeSpark(32, 20, 0.9) },
  { name: "Creator Economy", growth: 76, topics: 198, share: 9.8, spark: makeSpark(33, 20, 0.7) },
  { name: "Climate Tech", growth: 64, topics: 156, share: 7.4, spark: makeSpark(34, 20, 0.6) },
  { name: "Web3 / Crypto", growth: -22, topics: 234, share: 6.2, spark: makeSpark(35, 20, -0.3) },
  { name: "Home Fitness", growth: 48, topics: 142, share: 5.9, spark: makeSpark(36, 20, 0.4) },
];

export type Region = {
  country: string;
  flag: string;
  index: number;
  change: number;
  topTopic: string;
};

export const regions: Region[] = [
  { country: "United States", flag: "🇺🇸", index: 92.4, change: 4.2, topTopic: "AI Agents" },
  { country: "United Kingdom", flag: "🇬🇧", index: 84.1, change: 2.8, topTopic: "Padel Tennis" },
  { country: "Japan", flag: "🇯🇵", index: 88.7, change: 6.1, topTopic: "Labubu" },
  { country: "Germany", flag: "🇩🇪", index: 79.3, change: 1.4, topTopic: "Reformer Pilates" },
  { country: "Brazil", flag: "🇧🇷", index: 81.5, change: 5.7, topTopic: "Sora AI" },
  { country: "India", flag: "🇮🇳", index: 89.2, change: 7.3, topTopic: "AI Agents" },
  { country: "France", flag: "🇫🇷", index: 76.8, change: -1.2, topTopic: "Quiet Luxury" },
  { country: "Australia", flag: "🇦🇺", index: 82.6, change: 3.4, topTopic: "Matcha" },
];

export type Breakout = {
  keyword: string;
  score: number;
  growth: string;
  platform: Platform;
  age: string;
};

export const breakouts: Breakout[] = [
  { keyword: "agentic workflows", score: 96, growth: "+1,240%", platform: "Google", age: "3d" },
  { keyword: "GLP-1 microdosing", score: 92, growth: "+820%", platform: "TikTok", age: "5d" },
  { keyword: "AI wearable pin", score: 88, growth: "+640%", platform: "YouTube", age: "1w" },
  { keyword: "labubu series 3", score: 94, growth: "+1,580%", platform: "TikTok", age: "2d" },
  { keyword: "cortisol face", score: 81, growth: "+412%", platform: "Instagram", age: "6d" },
  { keyword: "sora 2 prompts", score: 90, growth: "+910%", platform: "YouTube", age: "4d" },
  { keyword: "tradwife aesthetic", score: 74, growth: "+288%", platform: "TikTok", age: "1w" },
  { keyword: "mob wife coat", score: 69, growth: "+220%", platform: "Instagram", age: "2w" },
];

export type FeedItem = {
  time: string;
  platform: Platform;
  topic: string;
  delta: string;
  type: "breakout" | "rising" | "declining" | "alert";
};

export const feed: FeedItem[] = [
  { time: "now", platform: "TikTok", topic: "Labubu Series 3", delta: "+18.4%", type: "breakout" },
  { time: "12s", platform: "YouTube", topic: "Sora 2 tutorial", delta: "+12.1%", type: "rising" },
  { time: "44s", platform: "Google", topic: "agentic workflows", delta: "+9.7%", type: "breakout" },
  { time: "1m", platform: "Instagram", topic: "K-Beauty routine", delta: "+5.3%", type: "rising" },
  { time: "2m", platform: "TikTok", topic: "Cortisol face", delta: "+4.8%", type: "alert" },
  { time: "3m", platform: "YouTube", topic: "Cybertruck review", delta: "-6.2%", type: "declining" },
  { time: "4m", platform: "Facebook", topic: "Pickleball groups", delta: "+3.1%", type: "rising" },
  { time: "5m", platform: "Google", topic: "quiet luxury", delta: "-4.4%", type: "declining" },
];

export const watchlist = [
  { symbol: "AI.AGENTS", last: 94.27, chg: 8.42, chgPct: 9.81 },
  { symbol: "SORA.AI", last: 95.71, chg: 14.21, chgPct: 17.46 },
  { symbol: "LABUBU", last: 91.08, chg: 12.55, chgPct: 15.97 },
  { symbol: "PILATES", last: 84.49, chg: 6.18, chgPct: 7.89 },
  { symbol: "MATCHA", last: 81.65, chg: 5.92, chgPct: 7.82 },
  { symbol: "OZEMPIC", last: 88.51, chg: 4.21, chgPct: 5.02 },
  { symbol: "CYBERTRUCK", last: 58.22, chg: -4.83, chgPct: -7.66 },
  { symbol: "VISION.PRO", last: 51.04, chg: -6.21, chgPct: -10.86 },
];

export const featuredTopic = {
  symbol: "AI.AGENTS",
  name: "AI Agents",
  index: 94.27,
  change: 8.42,
  changePct: 9.81,
  blurb:
    "Attention around autonomous AI agents surged 184% in 30 days, led by US developer communities on YouTube and Google. Breakout terms include agentic workflows, multi-agent systems, and computer-use agents.",
  series: makeSpark(99, 90, 0.6),
};
