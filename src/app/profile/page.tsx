import { findProduct, getUserSdk, productSdk } from "@/lib/whop-sdk";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArrowRightIcon } from "@radix-ui/react-icons";

export default async function Profile() {
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

  let currentPlan;
  if (productMembership?.plan) {
    currentPlan = await productSdk.plans.retrievePlan({
      id: productMembership.plan,
    });
  }

  return (
    <main className="container flex flex-col items-center flex-1 gap-4 sm:px-0">
      <div className="flex flex-col w-full max-w-md gap-8">
        <section className="flex flex-col gap-4 pt-8" key="profile">
          <h1 className="text-xl">Profile</h1>
          <hr className="shrink-0 bg-border h-[1px] w-full" />
          <div className="flex flex-col gap-4 text-sm">
            <div className="flex items-center justify-between">
              Username
              <span className="text-muted-foreground">{user?.name}</span>
            </div>
            <div className="flex items-center justify-between">
              Email
              <span className="text-muted-foreground">{user?.email}</span>
            </div>
            <div className="flex items-center justify-between">
              Membership status
              {productMembership?.status ? (
                <Badge className="text-white bg-yellow-500 hover:bg-yellow-500/80">
                  {productMembership?.status}
                </Badge>
              ) : (
                <Badge variant={"destructive"}>Not subscribed</Badge>
              )}
            </div>
            {productMembership?.renewal_period_end && (
              <div className="flex items-center justify-between">
                Renewal in
                <Badge className="text-white">
                  {`${daysUntil(
                    productMembership?.renewal_period_end || 0
                  )} days`}
                </Badge>
              </div>
            )}
          </div>
        </section>
        {currentPlan && (
          <section className="flex flex-col gap-4" key="current-plan">
            <h1 className="text-xl">Current Plan</h1>
            <hr className="shrink-0 bg-border h-[1px] w-full" />
            <Card className="w-full max-w-md">
              <CardHeader>
                <CardTitle>Zen</CardTitle>
                <CardDescription>
                  Perfect for individuals who are looking to dip their toes into
                  the transformative power of daily gratitude practices.
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col gap-2 text-sm">
                {`$${Number(currentPlan.renewal_price).toFixed(
                  2
                )} ${currentPlan.base_currency?.toUpperCase()} every ${
                  currentPlan.billing_period
                } days`}
                <a
                  href={currentPlan.direct_link}
                  target="_blank"
                  className="flex items-center gap-1 text-yellow-500 text-muted-foreground hover:transition-transform hover:translate-x-1"
                >
                  Change subscription <ArrowRightIcon className="w-4 h-4" />
                </a>
              </CardContent>
            </Card>
          </section>
        )}
      </div>
    </main>
  );
}

function daysUntil(futureEpochInSeconds: number): number {
  const futureEpochInMilliseconds = futureEpochInSeconds * 1000;

  const currentEpochInMilliseconds = Date.now();

  const remainingTimeInMilliseconds =
    futureEpochInMilliseconds - currentEpochInMilliseconds;

  const millisecondsPerDay = 24 * 60 * 60 * 1000;
  const remainingDays = remainingTimeInMilliseconds / millisecondsPerDay;

  return Math.floor(remainingDays);
}
