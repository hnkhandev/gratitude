import * as d3 from "d3";
import { format } from "date-fns";
import { CSSProperties } from "react";

export function TaskTrend({ data }: { data: { value: number; date: Date }[] }) {
  let xScale = d3
    .scaleTime()
    .domain([data[0].date, data[data.length - 1].date])
    .range([0, 100]);
  let yScale = d3.scaleLinear().domain([0, 5]).range([100, 0]);

  let line = d3
    .line<(typeof data)[number]>()
    .x((d) => xScale(d.date))
    .y((d) => yScale(d.value))
    .curve(d3.curveCatmullRom);

  let d = line(data);

  if (!d) {
    return null;
  }

  return (
    <div
      className="relative w-full h-full"
      style={
        {
          "--marginTop": "6px",
          "--marginRight": "8px",
          "--marginBottom": "25px",
          "--marginLeft": "35px",
        } as CSSProperties
      }
    >
      {/* X axis */}
      <svg
        className="absolute inset-0
          h-[calc(100%-var(--marginTop))]
          w-[calc(100%-var(--marginLeft)-var(--marginRight))]
          translate-x-[var(--marginLeft)]
          translate-y-[var(--marginTop)]
          overflow-visible
        "
      >
        {data.map((day, i) => (
          <g key={i} className="overflow-visible font-medium text-gray-500">
            <text
              x={`${xScale(day.date)}%`}
              y="100%"
              textAnchor={"middle"}
              className="hidden text-xs sm:inline fill-muted-foreground"
            >
              {format(day.date, "EEE")}
            </text>
            <text
              x={`${xScale(day.date)}%`}
              y="100%"
              textAnchor={"middle"}
              className="text-xs sm:hidden fill-muted-foreground"
            >
              {format(day.date, "EEEEE")}
            </text>
          </g>
        ))}
      </svg>

      {/* Y axis */}
      <svg
        className="absolute inset-0
          h-[calc(100%-var(--marginTop)-var(--marginBottom))]
          translate-y-[var(--marginTop)]
          overflow-visible
        "
      >
        <g className="translate-x-4">
          {yScale
            .ticks(8)
            .map(yScale.tickFormat(8, "d"))
            .map((value, i) => (
              <text
                key={i}
                y={`${yScale(+value)}%`}
                alignmentBaseline="middle"
                textAnchor="end"
                className="text-xs fill-muted-foreground tabular-nums"
              >
                {value}
              </text>
            ))}
        </g>
      </svg>

      {/* Chart area */}
      <svg
        className="absolute inset-0
          h-[calc(100%-var(--marginTop)-var(--marginBottom))]
          w-[calc(100%-var(--marginLeft)-var(--marginRight))]
          translate-x-[var(--marginLeft)]
          translate-y-[var(--marginTop)]
          overflow-visible
        "
      >
        <svg
          viewBox="0 0 100 100"
          className="overflow-visible"
          preserveAspectRatio="none"
        >
          {/* Line */}
          <path
            d={d}
            fill="none"
            className="text-gray-600 stroke-primary"
            strokeWidth="2"
            vectorEffect="non-scaling-stroke"
          />

          {/* Circles */}
          {data.map((d) => (
            <path
              key={d.date.toString()}
              d={`M ${xScale(d.date)} ${yScale(d.value)} l 0.01 0`}
              vectorEffect="non-scaling-stroke"
              strokeWidth="8"
              strokeLinecap="round"
              className="text-gray-400 fill-primary stroke-primary"
            />
          ))}
        </svg>
      </svg>
    </div>
  );
}
