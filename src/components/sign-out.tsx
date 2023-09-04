"use client";

import { signOut } from "next-auth/react";
import { DropdownMenuItem } from "./ui/dropdown-menu";
import { ExitIcon } from "@radix-ui/react-icons";

export function SignOut() {
  return (
    <DropdownMenuItem asChild>
      <button
        className="flex items-center gap-2 w-full"
        onClick={async () => await signOut()}
      >
        <ExitIcon />
        Sign out
      </button>
    </DropdownMenuItem>
  );
}
