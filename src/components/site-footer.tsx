import { ThemeToggle } from "./theme-toggle";

export async function SiteFooter() {
  return (
    <footer className="w-full py-4">
      <div className="container flex items-center h-10">
        <div className="flex items-center text-sm font-semibold gap-1">
          Built by hnkhandev
        </div>
        <div className="flex items-center justify-end flex-1 text-sm gap-2">
          <ThemeToggle />
        </div>
      </div>
    </footer>
  );
}
