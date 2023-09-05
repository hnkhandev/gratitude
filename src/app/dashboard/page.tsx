import { PurchaseMembership } from "@/components/purchase-membership";
import { RadialTaskBar } from "@/components/radial-task-bar";
import { Task } from "@/components/task";
import { findProduct, getUserSdk, productSdk } from "@/lib/whop-sdk";

export default async function Dashboard() {
  const userInfo = await getUserSdk();
  const userSdk = userInfo?.userSdk;

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

  return (
    <main className="container flex flex-col items-center flex-1 gap-4 sm:px-0">
      {productMembership ? (
        <>
          <RadialTaskBar />
          <Task />
        </>
      ) : (
        purchaseMembership
      )}
    </main>
  );
}
