import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArrowRightIcon } from "@radix-ui/react-icons";
import { Plan } from "@whop-sdk/core";

export function PurchaseMembership({
  recommendedPlan,
}: {
  recommendedPlan: Plan;
}) {
  return (
    <div className="flex flex-col gap-4 pt-8">
      <h1 className="text-xl">It looks like you don&apos;t have membership!</h1>
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Zen</CardTitle>
          <CardDescription>
            Perfect for individuals who are looking to dip their toes into the
            transformative power of daily gratitude practices.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-2 text-sm">
          {`$${Number(recommendedPlan.renewal_price).toFixed(
            2
          )} ${recommendedPlan.base_currency?.toUpperCase()} every ${
            recommendedPlan.billing_period
          } days`}

          <a
            href={recommendedPlan.direct_link}
            target="_blank"
            className="flex items-center gap-1 text-yellow-500 text-muted-foreground hover:transition-transform hover:translate-x-1"
          >
            Subscribe now <ArrowRightIcon className="w-4 h-4" />
          </a>
        </CardContent>{" "}
      </Card>
    </div>
  );
}
