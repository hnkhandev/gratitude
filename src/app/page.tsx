import { RadialTaskBar } from "@/components/radial-task-bar";
import { Task } from "@/components/task";

export default function Home() {
  return (
    <main className="container flex flex-col items-center flex-1 sm:px-0 gap-4">
      <RadialTaskBar />
      <Task />
    </main>
  );
}
