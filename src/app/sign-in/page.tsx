import { authConfig } from "@/auth/auth-config";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import WhopSignIn from "@/components/whop-sign-in";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function SignIn() {
  const session = await getServerSession(authConfig);
  if (session) {
    redirect("/");
  }

  return (
    <main className="container flex flex-col items-center justify-center flex-1 gap-4 sm:px-0">
      <Card className="w-full max-w-md">
        <CardHeader className="flex flex-col gap-4">
          <CardTitle className="">Welcome back!</CardTitle>
          <CardContent className="flex flex-col gap-2 p-0 text-sm">
            <div>
              If you&apos;ve bought&nbsp;
              <span className="font-semibold text-primary">Gratitude</span>
              &nbsp;access through&nbsp;
              <span className="font-semibold text-whop">Whop</span>, sign in to
              start your journey of thanks.
            </div>
            <WhopSignIn />
          </CardContent>
        </CardHeader>
      </Card>
    </main>
  );
}
