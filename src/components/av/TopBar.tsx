import { Search, Bell, Settings, Plus } from "lucide-react";

export function TopBar() {
  return (
    <header className="sticky top-0 z-50 border-b bg-background/85 backdrop-blur supports-[backdrop-filter]:bg-background/70">
      <div className="flex h-14 items-center gap-4 px-4 lg:px-6">
        <a href="/" className="flex items-center gap-2 mr-2">
          <div className="size-7 rounded-md bg-foreground text-background grid place-items-center font-bold font-display">
            A
          </div>
          <span className="font-display font-bold text-lg tracking-tight">AttentionView</span>
        </a>

        <nav className="hidden md:flex items-center gap-1 text-sm">
          {["Products", "Community", "Markets", "Screener", "More"].map((l) => (
            <a
              key={l}
              href="#"
              className={`px-3 py-1.5 rounded-md font-medium ${
                l === "Markets" ? "text-primary" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {l}
            </a>
          ))}
        </nav>

        <div className="flex-1 max-w-md mx-auto hidden lg:block">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
            <input
              placeholder="Search topics, keywords, niches…"
              className="w-full h-9 rounded-full bg-muted pl-9 pr-16 text-sm outline-none focus:ring-2 focus:ring-ring"
            />
            <kbd className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] text-muted-foreground border rounded px-1.5 py-0.5">
              ⌘K
            </kbd>
          </div>
        </div>

        <div className="ml-auto flex items-center gap-2">
          <button className="hidden sm:inline-flex items-center gap-1.5 h-9 rounded-full bg-primary text-primary-foreground px-4 text-sm font-semibold hover:opacity-90">
            <Plus className="size-4" /> Upgrade
          </button>
          <button className="size-9 grid place-items-center rounded-full hover:bg-muted">
            <Bell className="size-4" />
          </button>
          <button className="size-9 grid place-items-center rounded-full hover:bg-muted">
            <Settings className="size-4" />
          </button>
          <div className="size-8 rounded-full bg-gradient-to-br from-info to-primary grid place-items-center text-primary-foreground text-xs font-bold">
            AV
          </div>
        </div>
      </div>
    </header>
  );
}
