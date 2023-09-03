"use client";

import { signIn } from "next-auth/react";
import { Button } from "./ui/button";

function WhopSignIn() {
  return <Button onClick={async () => await signIn("whop")}>Sign In</Button>;
}

export default WhopSignIn;
