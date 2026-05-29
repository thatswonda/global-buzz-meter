type Props = {
  data: number[];
  height?: number;
};

export function AreaChart({ data, height = 280 }: Props) {
  const width = 800;
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;
  const stepX = width / (data.length - 1);
  const points = data.map((v, i) => [i * stepX, height - ((v - min) / range) * (height - 30) - 15] as const);
  const path = points.map((p, i) => `${i === 0 ? "M" : "L"} ${p[0]} ${p[1]}`).join(" ");
  const area = `${path} L ${width} ${height} L 0 ${height} Z`;
  const isPos = data[data.length - 1] >= data[0];
  const color = isPos ? "var(--bull)" : "var(--bear)";

  // Horizontal gridlines
  const gridLines = 4;
  const grids = Array.from({ length: gridLines + 1 }, (_, i) => (height / gridLines) * i);

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto" preserveAspectRatio="none">
      <defs>
        <linearGradient id="area-grad" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.35" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      {grids.map((y, i) => (
        <line key={i} x1="0" x2={width} y1={y} y2={y} stroke="var(--border)" strokeWidth="1" strokeDasharray="3 4" />
      ))}
      <path d={area} fill="url(#area-grad)" />
      <path d={path} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      {/* End dot */}
      <circle cx={points[points.length - 1][0]} cy={points[points.length - 1][1]} r="4" fill={color} />
      <circle cx={points[points.length - 1][0]} cy={points[points.length - 1][1]} r="8" fill={color} opacity="0.2" />
    </svg>
  );
}
