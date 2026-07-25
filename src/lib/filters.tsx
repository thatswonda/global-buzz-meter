import { createContext, useContext, useState, ReactNode } from "react";

export const REGIONS = ["Global", "US", "EU", "APAC"] as const;
export type Region = (typeof REGIONS)[number];

export const NICHES = [
  "All",
  "Tech",
  "Health",
  "Lifestyle",
  "Collectibles",
  "Sports",
  "Food & Bev",
  "Auto",
  "Fitness",
  "Beauty",
  "Luxury",
  "Fashion",
] as const;
export type Niche = (typeof NICHES)[number];

type Ctx = {
  region: Region;
  setRegion: (r: Region) => void;
  niche: Niche;
  setNiche: (n: Niche) => void;
};

const FilterCtx = createContext<Ctx | null>(null);

export function FilterProvider({ children }: { children: ReactNode }) {
  const [region, setRegion] = useState<Region>("Global");
  const [niche, setNiche] = useState<Niche>("All");
  return (
    <FilterCtx.Provider value={{ region, setRegion, niche, setNiche }}>
      {children}
    </FilterCtx.Provider>
  );
}

export function useFilters() {
  const ctx = useContext(FilterCtx);
  if (!ctx) throw new Error("useFilters must be used within FilterProvider");
  return ctx;
}
