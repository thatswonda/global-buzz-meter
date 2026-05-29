import type { Platform } from "@/lib/mock-data";
import { platformColor } from "@/lib/mock-data";

const letter: Record<Platform, string> = {
  Google: "G",
  YouTube: "Y",
  TikTok: "T",
  Instagram: "I",
  Facebook: "F",
};

export function PlatformIcon({ platform, size = 24 }: { platform: Platform; size?: number }) {
  return (
    <div
      className="rounded-full flex items-center justify-center text-white font-bold shrink-0"
      style={{
        width: size,
        height: size,
        backgroundColor: platformColor[platform],
        fontSize: size * 0.5,
      }}
      aria-label={platform}
    >
      {letter[platform]}
    </div>
  );
}
