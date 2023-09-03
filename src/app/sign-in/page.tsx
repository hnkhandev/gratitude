import { authConfig } from "@/auth/auth-config";
import WhopSignIn from "@/components/whop-sign-in";
import { getServerSession } from "next-auth";

export default async function SignIn() {
  const session = await getServerSession(authConfig);
  console.log(session);

  return (
    <main className="container flex flex-col items-center flex-1 sm:px-0 gap-4">
      <WhopSignIn />
    </main>
  );
}
