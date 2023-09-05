"use client";

import { signIn } from "next-auth/react";
import { Button } from "./ui/button";
import { WhopLogo } from "@/svgs/whop-logo";

function WhopSignIn() {
  return (
    <Button
      onClick={async () => await signIn("whop")}
      className="gap-2 text-white bg-whop hover:bg-whop/90"
    >
      Sign in with <WhopLogo />
    </Button>
  );
}

export default WhopSignIn;
