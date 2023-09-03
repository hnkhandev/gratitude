"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useState } from "react";

import { ArrowRightIcon } from "@radix-ui/react-icons";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";

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
    <div className="w-full max-w-md flex flex-col gap-4">
      {tasks.map((task) => (
        <Card className=" text-sm">
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>Task #1</CardTitle>
              <Button variant="ghost" className="p-2 h-auto">
                <ArrowRightIcon className="h-4 w-4" />
              </Button>
            </div>
            <CardDescription>Card Description</CardDescription>
          </CardHeader>
        </Card>
      ))}
    </div>
  );
}
