import Link from "next/link";
import Image from "next/image";

export default function BlogCard({ blog }) {
  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-zinc-200/70 bg-white dark:bg-zinc-900 dark:border-zinc-800/60 transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 h-full">
      {/* Image Container */}
      <Link href={`/blog/${blog.id}`} className="relative w-full aspect-4/3 overflow-hidden block shrink-0">
        <span className="absolute top-4 left-4 z-10 inline-flex items-center rounded-full bg-[#c2ff0c] px-3 py-1 text-[10px] font-extrabold uppercase tracking-wider text-black shadow-sm">
          {blog.category || "Updates"}
        </span>
        {blog.image ? (
          <Image
            src={blog.image}
            alt={blog.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover object-center transition-transform duration-500 ease-out group-hover:scale-[1.04]"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-zinc-100 dark:bg-zinc-800 text-zinc-400 text-sm">
            No image available
          </div>
        )}
      </Link>

      {/* Card Text Content */}
      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <Link href={`/blog/${blog.id}`} className="block group/title mb-2">
          <h3 className="text-base font-bold leading-snug tracking-tight text-zinc-950 dark:text-zinc-50 group-hover/title:text-zinc-600 dark:group-hover/title:text-zinc-300 transition-colors duration-150">
            {blog.title}
          </h3>
        </Link>
        <p className="text-sm leading-relaxed text-zinc-500 dark:text-zinc-400 line-clamp-3">
          {blog.excerpt}
        </p>
      </div>
    </article>
  );
}

