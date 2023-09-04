import { ThemeToggle } from "./theme-toggle";

export async function SiteFooter() {
  return (
    <footer className="w-full py-4">
      <div className="container flex items-center h-10">
        <div className="flex items-center gap-1 text-sm font-semibold">
          Built by hnkhandev
        </div>
        <div className="flex items-center justify-end flex-1 gap-2 text-sm">
          <ThemeToggle />
        </div>
      </div>
    </footer>
  );
}
