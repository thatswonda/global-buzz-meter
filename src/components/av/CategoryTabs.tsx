import { useState } from "react";

const cats = ["All Platforms", "Google", "YouTube", "TikTok", "Instagram", "Facebook", "Niches", "Products", "Regions"];

export function CategoryTabs() {
  const [active, setActive] = useState("All Platforms");
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
      </div>
    </div>
  );
}
