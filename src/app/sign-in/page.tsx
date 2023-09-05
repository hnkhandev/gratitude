import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import WhopSignIn from "@/components/whop-sign-in";

export default async function SignIn() {
  return (
    <main className="container flex flex-col items-center justify-center flex-1 gap-4 sm:px-0">
      <Card className="w-full max-w-md">
        <CardHeader className="flex flex-col gap-4 text-xl">
          <CardTitle className="">Welcome back!</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-3 text-sm">
          <p>
            If you&apos;ve bought&nbsp;
            <span className="font-semibold text-primary">Gratitude</span>
            &nbsp;access through&nbsp;
            <span className="font-semibold text-whop">Whop</span>, sign in to
            start your journey of thanks.
          </p>
          <WhopSignIn />
        </CardContent>
      </Card>
    </main>
  );
}
