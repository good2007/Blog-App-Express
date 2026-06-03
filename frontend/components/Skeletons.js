export function BlogCardSkeleton() {
  return (
    <div className="flex flex-col overflow-hidden rounded-xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-black h-full animate-pulse">
      {/* Visual Image Area */}
      <div className="w-full aspect-video bg-zinc-200 dark:bg-zinc-800" />
      
      {/* Content Space */}
      <div className="flex flex-1 flex-col p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div className="h-4 w-16 rounded bg-zinc-200 dark:bg-zinc-800" />
          <div className="h-3 w-12 rounded bg-zinc-200 dark:bg-zinc-800" />
        </div>
        
        <div className="space-y-2">
          <div className="h-5 w-5/6 rounded bg-zinc-200 dark:bg-zinc-800" />
          <div className="h-5 w-3/4 rounded bg-zinc-200 dark:bg-zinc-800" />
        </div>
        
        <div className="space-y-1.5 pt-2">
          <div className="h-3.5 w-full rounded bg-zinc-200 dark:bg-zinc-800" />
          <div className="h-3.5 w-full rounded bg-zinc-200 dark:bg-zinc-800" />
          <div className="h-3.5 w-2/3 rounded bg-zinc-200 dark:bg-zinc-800" />
        </div>

        <div className="flex justify-between items-center pt-4 border-t border-zinc-150 dark:border-zinc-900 mt-auto">
          <div className="h-3 w-20 rounded bg-zinc-200 dark:bg-zinc-800" />
          <div className="h-3.5 w-16 rounded bg-zinc-200 dark:bg-zinc-800" />
        </div>
      </div>
    </div>
  );
}

export function BlogGridSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 6 }).map((_, i) => (
        <BlogCardSkeleton key={i} />
      ))}
    </div>
  );
}

export function BlogHeroSkeleton() {
  return (
    <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 overflow-hidden rounded-xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-black p-6 sm:p-8 animate-pulse">
      <div className="w-full lg:w-1/2 aspect-video lg:aspect-auto lg:h-[350px] rounded-lg bg-zinc-200 dark:bg-zinc-800" />
      <div className="flex flex-1 flex-col justify-center space-y-4 py-2">
        <div className="h-4 w-20 rounded bg-zinc-200 dark:bg-zinc-800" />
        <div className="space-y-2">
          <div className="h-7 w-11/12 rounded bg-zinc-200 dark:bg-zinc-800" />
          <div className="h-7 w-4/5 rounded bg-zinc-200 dark:bg-zinc-800" />
        </div>
        <div className="space-y-1.5">
          <div className="h-4 w-full rounded bg-zinc-200 dark:bg-zinc-800" />
          <div className="h-4 w-5/6 rounded bg-zinc-200 dark:bg-zinc-800" />
        </div>
        <div className="h-3 w-16 rounded bg-zinc-200 dark:bg-zinc-800 pt-4" />
      </div>
    </div>
  );
}
