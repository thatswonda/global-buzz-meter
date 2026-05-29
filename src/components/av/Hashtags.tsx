import { hashtags } from "@/lib/mock-data";
import { PlatformIcon } from "./PlatformIcon";
import { Hash } from "lucide-react";

export function Hashtags() {
  return (
    <section className="rounded-2xl border bg-card">
      <div className="p-4 lg:p-5 border-b flex items-center justify-between">
        <div>
          <h2 className="font-display text-2xl font-bold flex items-center gap-2">
            Trending hashtags <Hash className="size-5 text-info" />
          </h2>
          <p className="text-xs text-muted-foreground mt-0.5">
            Hashtag velocity across TikTok, Instagram, YouTube & Google
          </p>
        </div>
      </div>
      <div className="overflow-x-auto scrollbar-thin">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-[11px] uppercase tracking-wider text-muted-foreground border-b">
              <th className="text-left font-medium px-4 lg:px-5 py-3">Hashtag</th>
              <th className="text-right font-medium py-3 hidden sm:table-cell">Posts</th>
              <th className="text-right font-medium py-3 hidden md:table-cell">Reach</th>
              <th className="text-left font-medium py-3 pl-6">Sentiment</th>
              <th className="text-right font-medium py-3 pr-4 lg:pr-5">30d</th>
            </tr>
          </thead>
          <tbody>
            {hashtags.map((h) => {
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
    </section>
  );
}
