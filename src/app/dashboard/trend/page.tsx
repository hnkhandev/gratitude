import { authConfig } from "@/auth/auth-config";
import { TaskTrend } from "@/components/task-trend";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { db } from "@/lib/db";
import { tasks, userTasks } from "@/schema/schema";
import { and, eq, inArray, sql } from "drizzle-orm";
import { getServerSession } from "next-auth";

export default async function Trend() {
  const session = await getServerSession(authConfig);
  const user = session && session.user;

  const pastSevenDays = getPastSevenDays();
  const offsetMinutes = new Date().getTimezoneOffset();
  const offsetMs = offsetMinutes * 60 * 1000;

  let tasksData;
  if (user) {
    tasksData = (
      await db
        .select({
          date: tasks.date,
          value: sql<number>`sum(${userTasks.isComplete})`,
        })
        .from(tasks)
        .leftJoin(
          userTasks,
          and(eq(userTasks.taskId, tasks.id), eq(userTasks.userId, user.id))
        )
        .where(inArray(tasks.date, pastSevenDays))
        .groupBy(tasks.date)
    ).map((d) => ({
      value: Number(d.value) ?? 0,
      date: new Date(d.date.getTime() + offsetMs),
    }));
  }

  return (
    <main className="container flex flex-col items-center flex-1 gap-4 sm:px-0">
      <div className="w-full max-w-md pt-8">
        <Card>
          <CardHeader>
            <CardTitle>Weekly Gratitude Progress</CardTitle>
            <CardDescription>
              Visualize your gratitude habits over the past week, highlighting
              daily completed tasks and consistency.
            </CardDescription>
          </CardHeader>
          {tasksData ? (
            <CardContent className="pb-6 pl-4 pr-6">
              <div className="h-60">
                <TaskTrend data={tasksData} />
              </div>
            </CardContent>
          ) : (
            <CardContent className="text-sm">
              Looks like you don&apos;t have any data.
            </CardContent>
          )}
        </Card>
      </div>
    </main>
  );
}

function getPastSevenDays() {
  const dates = [];
  const today = new Date();
  today.setUTCHours(0, 0, 0, 0);

  for (let i = 0; i < 7; i++) {
    const date = new Date(today);
    date.setUTCDate(today.getUTCDate() - i);
    dates.push(date);
  }

  return dates;
}
