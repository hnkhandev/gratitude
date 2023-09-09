"use client";

import { useEffect, useState } from "react";
import { Skeleton } from "./ui/skeleton";

export function Greeting() {
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) {
    return <Skeleton className="h-[2ch] w-[10ch]" />;
  }
  return <span className="text-sm">{getGreeting()}</span>;
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
