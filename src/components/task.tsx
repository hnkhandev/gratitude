"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useState } from "react";

import { ArrowRightIcon } from "@radix-ui/react-icons";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

export type Task = {
  id: string;
  completed: boolean;
  description: string;
};

export function Task() {
  const [tasks, setTasks] = useState<Task[]>([
    { id: "first", completed: true, description: "" },
    { id: "second", completed: true, description: "" },
    { id: "third", completed: false, description: "" },
    { id: "fourth", completed: false, description: "" },
    { id: "fifth", completed: false, description: "" },
  ]);
  return (
    <ul className="flex flex-col w-full max-w-md gap-4">
      <AnimatePresence>
        {tasks.map((task, index) => (
          <motion.li
            key={task.id}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 30,
              delay: index * 0.1, // stagger delay for each item
            }}
          >
            <Card className="text-sm">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Task #1</CardTitle>
                  <Button variant="ghost" className="h-auto p-2">
                    <ArrowRightIcon className="w-4 h-4" />
                  </Button>
                </div>
                <CardDescription>Card Description</CardDescription>
              </CardHeader>
              <CardFooter className="text-yellow-500">Incomplete</CardFooter>
            </Card>
          </motion.li>
        ))}
      </AnimatePresence>
    </ul>
  );
}
