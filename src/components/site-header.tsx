import { authConfig } from "@/auth/auth-config";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Skeleton } from "./ui/skeleton";
import { PersonIcon } from "@radix-ui/react-icons";
import { Button } from "./ui/button";
import { SignOut } from "./sign-out";
import { GratitudeLogo } from "@/svgs/gratitude-logo";

export async function SiteHeader() {
  const session = await getServerSession(authConfig);

  return (
    <header className="top-0 z-10 w-full py-1 border-b">
      <div className="container flex items-center h-10">
        <div className="flex items-center gap-1 ">
          <Link
            href="/"
            className="flex items-center gap-1 font-semibold text-primary"
          >
            <GratitudeLogo className="w-4 h-4 fill-primary" />
            Gratitude
          </Link>
        </div>
        <div className="flex items-center justify-end flex-1 gap-2 text-sm">
          {session ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="secondary"
                  className="relative rounded-full h-9 w-9"
                >
                  <Avatar className="w-8 h-8">
                    <AvatarImage
                      src={session.user.image}
                      alt={session.user.name ?? ""}
                    />
                    <AvatarFallback>
                      <Skeleton className="w-8 h-8" />
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel>{session.user.name}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem className="flex items-center gap-2" asChild>
                    <Link href="/profile">
                      <PersonIcon />
                      Profile
                    </Link>
                  </DropdownMenuItem>
                  <SignOut />
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Link href="/sign-in" className="font-semibold">
              Sign in
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
