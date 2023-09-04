import { authConfig } from "@/auth/auth-config";
import { RadialTaskBar } from "@/components/radial-task-bar";
import { Task } from "@/components/task";
import { getServerSession } from "next-auth";

export default async function Home() {
  const session = await getServerSession(authConfig);

  return (
    <main className="container flex flex-col items-center flex-1 gap-4 sm:px-0">
      <RadialTaskBar />
      <Task />
    </main>
  );
}
