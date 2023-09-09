"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { UserTask } from "@/app/dashboard/page";

export function RadialTaskBar({ usersTasks }: { usersTasks: UserTask[] }) {
  const tasksCompleted = usersTasks.filter((task) => task.completed).length;

  return (
    <div className="relative h-52">
      <svg
        className="absolute top-0 left-0 w-full h-full"
        viewBox="0 0 120 120"
      >
        {usersTasks.map((task, index) => {
          const totalLength = 48 * 2 * Math.PI; // Total circumference
          const segmentLength = totalLength / 5; // Each segment should take up 1/5 of the total length
          const gapLength = 15; // Define the gap length
          const actualSegmentLength = segmentLength - gapLength; // Adjust the segment length to create a gap
          const offset = index * segmentLength + gapLength / 2; // Shift each segment by half of the gap's angular size

          return (
            <motion.circle
              key={task.id}
              initial={{ strokeDasharray: `0 ${totalLength}`, opacity: 0 }}
              animate={{
                strokeDasharray: `${actualSegmentLength} ${
                  totalLength - actualSegmentLength
                }`,
                opacity: 1,
              }}
              transition={{
                duration: 0.8,
              }}
              fill="transparent"
              r="48"
              cx="60"
              cy="60"
              strokeLinecap="round"
              strokeWidth={8}
              strokeDashoffset={-offset}
              transform="rotate(-90 60 60)"
              className={cn(
                index < tasksCompleted ? "stroke-primary" : "stroke-zinc-400"
              )}
            />
          );
        })}
        <motion.text
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            duration: 0.8,
          }}
          x="50%"
          y="50%"
          textAnchor="middle"
          dominantBaseline="middle"
          className="fill-foreground"
        >
          {`${tasksCompleted}/5`}
        </motion.text>
      </svg>
    </div>
  );
}
