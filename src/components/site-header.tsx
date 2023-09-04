import { authConfig } from "@/auth/auth-config";
import { getServerSession } from "next-auth";
import Link from "next/link";

export async function SiteHeader() {
  const session = await getServerSession(authConfig);

  return (
    <header className="top-0 z-10 w-full border-b">
      <div className="container flex items-center h-10">
        <div className="flex items-center gap-1 ">
          <Link href="/" className="font-semibold text-primary">
            Gratitude
          </Link>
        </div>
        <div className="flex items-center justify-end flex-1 gap-2 text-sm">
          <Link href="/sign-in" className="font-semibold">
            Sign in
          </Link>
        </div>
      </div>
    </header>
  );
}
