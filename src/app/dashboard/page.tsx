import { ActionBar } from "@/components/action-bar";
import { PurchaseMembership } from "@/components/purchase-membership";
import { RadialTaskBar } from "@/components/radial-task-bar";
import { Tasks } from "@/components/tasks";
import { db } from "@/lib/db";
import { findProduct, getUserSdk, productSdk } from "@/lib/whop-sdk";
import { tasks, userTasks } from "@/schema/schema";
import { and, eq } from "drizzle-orm";

export type UserTask = {
  id: number;
  description: string;
  completed: number | null;
};

export default async function Dashboard() {
  const userInfo = await getUserSdk();
  const userSdk = userInfo?.userSdk;
  const user = userInfo?.user;

  let productMembership;
  if (userSdk) {
    productMembership = await findProduct(
      userSdk,
      process.env.NEXT_PUBLIC_REQUIRED_PRODUCT!
    );
  }

  let recommendedPlan;
  if (!productMembership) {
    recommendedPlan = await productSdk.plans.retrievePlan({
      id: process.env.NEXT_PUBLIC_RECOMMENDED_PLAN!,
    });
  }

  let purchaseMembership;
  if (recommendedPlan) {
    purchaseMembership = (
      <PurchaseMembership recommendedPlan={recommendedPlan} />
    );
  }

  let usersTasks: UserTask[] = [];
  if (productMembership && user) {
    usersTasks = await db
      .select({
        id: tasks.id,
        description: tasks.description,
        completed: userTasks.isComplete,
      })
      .from(tasks)
      .leftJoin(
        userTasks,
        and(eq(userTasks.taskId, tasks.id), eq(userTasks.userId, user.id))
      )
      .where(eq(tasks.date, getTodaysDate()))
      .limit(5);
  }

  return (
    <main className="container flex flex-col items-center flex-1 gap-4 sm:px-0">
      {productMembership && user ? (
        <div className="flex flex-col w-full max-w-md gap-4">
          <RadialTaskBar usersTasks={usersTasks} />
          <ActionBar />
          <Tasks usersTasks={usersTasks} userId={user?.id} />
        </div>
      ) : (
        purchaseMembership
      )}
    </main>
  );
}

function getTodaysDate() {
  const today = new Date();
  today.setUTCHours(0, 0, 0, 0);
  return today;
}
