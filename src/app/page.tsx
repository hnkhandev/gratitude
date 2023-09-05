import { authConfig } from "@/auth/auth-config";
import { RadialTaskBar } from "@/components/radial-task-bar";
import { Task } from "@/components/task";
import { findProduct, getUserSdk, productSdk } from "@/lib/whop-sdk";
import { getServerSession } from "next-auth";

export default async function Home() {
  const session = await getServerSession(authConfig);

  const userSdk = await getUserSdk();

  let productMembership;
  if (userSdk) {
    productMembership = await findProduct(
      userSdk,
      process.env.NEXT_PUBLIC_REQUIRED_PRODUCT!
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
        <span>Looks like you dont have membership</span>
      )}
    </main>
  );
}
