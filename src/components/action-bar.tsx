"use client";

import { BarChartIcon } from "@radix-ui/react-icons";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import Link from "next/link";
import { Greeting } from "./greeting";

export function ActionBar() {
  return (
    <Card>
      <CardContent className="flex items-center justify-between w-full px-6 py-2">
        <Greeting />
        <Button variant="secondary" className="h-auto p-2" asChild>
          <Link href="/dashboard/trend">
            <BarChartIcon className="w-4 h-4" />
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
}
