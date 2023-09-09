"use client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { CheckIcon, DotsVerticalIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { UserTask } from "@/app/dashboard/page";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTransition } from "react";
import { updateTask } from "@/actions/tasks";
import { cn } from "@/lib/utils";

export function Tasks({
  usersTasks,
  userId,
}: {
  usersTasks: UserTask[];
  userId: string;
}) {
  const [isPending, startTransition] = useTransition();

  return (
    <ul className="flex flex-col gap-4">
      <AnimatePresence>
        {usersTasks.map((task, index) => (
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
                  <CardTitle>Task #{index + 1}</CardTitle>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-auto p-2">
                        <DotsVerticalIcon className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                      className="w-48"
                      align="end"
                      forceMount
                    >
                      <DropdownMenuItem
                        className="flex items-center gap-2"
                        asChild
                      >
                        <button
                          className="flex items-center w-full gap-2"
                          onClick={async () => {
                            startTransition(() =>
                              updateTask(userId, task.id, !task.completed)
                            );
                          }}
                        >
                          <CheckIcon />
                          {task.completed
                            ? "Mark as incomplete"
                            : "Mark as complete"}
                        </button>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </CardHeader>
              <CardContent className="text-muted-foreground">
                {task.description}
              </CardContent>
              <CardFooter
                className={cn(
                  task.completed ? "text-green-500" : "text-yellow-500"
                )}
              >
                {task.completed ? "Complete" : "Incomplete"}
              </CardFooter>
            </Card>
          </motion.li>
        ))}
      </AnimatePresence>
    </ul>
  );
}
