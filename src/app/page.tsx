import { Hero } from "@/components/hero";

export default async function Home() {
  return (
    <main className="container flex flex-col items-center flex-1 gap-4 sm:px-0">
      <Hero />
    </main>
  );
}
