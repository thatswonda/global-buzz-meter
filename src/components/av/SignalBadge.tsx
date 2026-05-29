import type { Signal } from "@/lib/mock-data";

const styles: Record<Signal, string> = {
  Breakout: "bg-bull/10 text-bull",
  Rising: "bg-bull/10 text-bull",
  Watch: "bg-info/10 text-info",
  Declining: "bg-bear/10 text-bear",
  Fading: "bg-bear/10 text-bear",
};

export function SignalBadge({ signal }: { signal: Signal }) {
  return (
    <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-semibold ${styles[signal]}`}>
      <span className="size-1.5 rounded-full bg-current" />
      {signal}
    </span>
  );
}
