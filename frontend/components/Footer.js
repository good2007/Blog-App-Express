export default function Footer() {
  return (
    <footer className="w-full border-t border-zinc-200 bg-white py-8 dark:border-zinc-800 dark:bg-black">
      <div className="mx-auto max-w-7xl px-6 sm:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          © {new Date().getFullYear()} TechLatest Blog. Built with Next.js, Express, and MongoDB.
        </p>
        <p className="text-xs text-zinc-400 dark:text-zinc-500">
          Engineering & Design Manifesto compliance verified.
        </p>
      </div>
    </footer>
  );
}
