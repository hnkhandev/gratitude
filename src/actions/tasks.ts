"use server";

import { db } from "@/lib/db";
import { userTasks } from "@/schema/schema";
import { and, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function updateTask(
  userId: string,
  taskId: number,
  isCompleteBool: boolean
) {
  const isComplete = +isCompleteBool;
  const taskExists = (
    await db
      .select()
      .from(userTasks)
      .where(and(eq(userTasks.userId, userId), eq(userTasks.taskId, taskId)))
      .limit(1)
  )[0];

  if (!taskExists) {
    await db.insert(userTasks).values({ userId, taskId, isComplete }).execute();

    revalidatePath("/dashboard");
    return;
  }

  await db
    .update(userTasks)
    .set({ isComplete })
    .where(and(eq(userTasks.userId, userId), eq(userTasks.taskId, taskId)));

  revalidatePath("/dashboard");
  return;
}
