"use client";

import { BarChartIcon } from "@radix-ui/react-icons";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import Link from "next/link";

export function ActionBar() {
  return (
    <Card>
      <CardContent className="flex items-center justify-between w-full px-6 py-2">
        <span className="text-sm">{getGreeting()}</span>
        <Button variant="secondary" className="h-auto p-2" asChild>
          <Link href="/dashboard/trend">
            <BarChartIcon className="w-4 h-4" />
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
}

function getGreeting(): string {
  const currentHour = new Date().getHours();

  if (currentHour >= 5 && currentHour < 12) {
    return "Good morning!";
  } else if (currentHour >= 12 && currentHour < 17) {
    return "Good afternoon!";
  } else if (currentHour >= 17 && currentHour < 22) {
    return "Good evening!";
  } else {
    return "Good night!";
  }
}
