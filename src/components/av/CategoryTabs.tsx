import { useState } from "react";
import { ChevronDown, Globe, Layers } from "lucide-react";
import { useFilters, REGIONS, NICHES } from "@/lib/filters";

const cats = ["All Platforms", "Google", "YouTube", "TikTok", "Instagram", "Facebook", "Products"];

export function CategoryTabs() {
  const [active, setActive] = useState("All Platforms");
  const { region, setRegion, niche, setNiche } = useFilters();

  return (
    <div className="border-b bg-background">
      <div className="flex items-center gap-1 px-4 lg:px-6 py-3 overflow-x-auto scrollbar-thin">
        {cats.map((c) => (
          <button
            key={c}
            onClick={() => setActive(c)}
            className={`px-3.5 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
              active === c
                ? "bg-foreground text-background"
                : "text-muted-foreground hover:bg-muted hover:text-foreground"
            }`}
          >
            {c}
          </button>
        ))}

        <div className="mx-1 h-5 w-px bg-border" />

        <FilterDropdown
          icon={<Globe className="size-3.5" />}
          label="Region"
          value={region}
          options={REGIONS as unknown as string[]}
          onChange={(v) => setRegion(v as typeof region)}
        />
        <FilterDropdown
          icon={<Layers className="size-3.5" />}
          label="Niche"
          value={niche}
          options={NICHES as unknown as string[]}
          onChange={(v) => setNiche(v as typeof niche)}
        />
      </div>
    </div>
  );
}

function FilterDropdown({
  icon,
  label,
  value,
  options,
  onChange,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  options: string[];
  onChange: (v: string) => void;
}) {
  const active = label === "Region" ? value !== "Global" : value !== "All";
  return (
    <div className="relative">
      <div
        className={`inline-flex items-center gap-1.5 pl-3 pr-2 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors border ${
          active
            ? "bg-foreground text-background border-foreground"
            : "text-muted-foreground border-transparent hover:bg-muted hover:text-foreground"
        }`}
      >
        {icon}
        <span>{label}:</span>
        <span className="font-semibold">{value}</span>
        <ChevronDown className="size-3.5 opacity-70" />
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="absolute inset-0 opacity-0 cursor-pointer"
          aria-label={label}
        >
          {options.map((o) => (
            <option key={o} value={o}>
              {o}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
