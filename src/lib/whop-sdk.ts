import { authConfig } from "@/auth/auth-config";
import { WhopSDK } from "@whop-sdk/core";
import { getServerSession } from "next-auth";
import { db } from "./db";
import { accounts } from "@/schema/schema";
import { eq } from "drizzle-orm";
import type { UserOAuthService } from "@whop-sdk/core";

export const productSdk = new WhopSDK({
  TOKEN: process.env.WHOP_API_KEY,
});

export async function getUserSdk() {
  const session = await getServerSession(authConfig);

  if (!session) return null;

  const { accessToken } = (
    await db
      .select({ accessToken: accounts.access_token })
      .from(accounts)
      .where(eq(accounts.userId, session?.user.id))
      .limit(1)
  )[0];

  if (!accessToken) return null;

  return {
    userSdk: new WhopSDK({ TOKEN: accessToken }).userOAuth,
    user: session.user,
  };
}

export async function findProduct(
  sdk: UserOAuthService,
  allowedProducts: string | string[]
) {
  if (typeof allowedProducts === "string") allowedProducts = [allowedProducts];
  const memberships = (await sdk.listUsersMemberships({ valid: true })).data;
  return (
    memberships?.find(
      (membership) =>
        membership.product && allowedProducts.includes(membership.product)
    ) || null
  );
}
