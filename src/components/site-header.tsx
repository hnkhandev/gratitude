export async function SiteHeader() {
  return (
    <header className="top-0 z-10 w-full border-b">
      <div className="container flex items-center h-10">
        <div className="flex items-center gap-1 font-semibold text-primary">
          gratitude
        </div>
        <div className="flex items-center justify-end flex-1 gap-2 text-sm">
          <button>Login</button>
        </div>
      </div>
    </header>
  );
}
