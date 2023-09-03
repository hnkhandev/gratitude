"use client";

import { cn } from "@/lib/utils";
import { useState } from "react";
import { Task } from "./task";

export function RadialTaskBar() {
  const [tasks, setTasks] = useState<Task[]>([
    { id: "first", completed: true, description: "" },
    { id: "second", completed: true, description: "" },
    { id: "third", completed: false, description: "" },
    { id: "fourth", completed: false, description: "" },
    { id: "fifth", completed: false, description: "" },
  ]);
  return (
    <div className="relative w-full max-w-md h-52">
      <svg
        className="absolute top-0 left-0 h-full w-full"
        viewBox="0 0 120 120"
      >
        {tasks.map((task, i) => {
          const totalLength = 48 * 2 * Math.PI; // Total circumference
          const segmentLength = totalLength / 5; // Each segment should take up 1/5 of the total length
          const gapLength = 15; // Define the gap length
          const actualSegmentLength = segmentLength - gapLength; // Adjust the segment length to create a gap
          const offset = i * segmentLength + gapLength / 2; // Shift each segment by half of the gap's angular size

          return (
            <circle
              key={task.id}
              strokeWidth="8"
              fill="transparent"
              r="48"
              cx="60"
              cy="60"
              strokeLinecap="round"
              strokeDasharray={`${actualSegmentLength} ${
                totalLength - actualSegmentLength
              }`}
              strokeDashoffset={-offset}
              transform="rotate(-90 60 60)"
              className={cn(
                task.completed ? "stroke-primary" : "stroke-zinc-400"
              )}
            />
          );
        })}
        <text
          x="50%"
          y="50%"
          textAnchor="middle"
          dominantBaseline="middle"
          className="fill-foreground"
        >
          {`${tasks.filter((task) => task.completed).length}/5`}
        </text>
      </svg>
    </div>
  );
}
