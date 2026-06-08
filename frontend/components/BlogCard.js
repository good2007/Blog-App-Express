'use client';

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { handleDeleteBlog } from "@/app/admin/actions";

export default function BlogCard({ blog }) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this blog post? This action cannot be undone.")) {
      return;
    }

    setIsDeleting(true);
    try {
      const result = await handleDeleteBlog(blog._id);
      if (result.success) {
        window.location.reload();
      } else {
        alert("Failed to delete blog post: " + (result.error || "Unknown error"));
      }
    } catch (error) {
      console.error("Error deleting blog:", error);
      alert("Error deleting blog post");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-zinc-200/70 bg-white dark:bg-zinc-900 dark:border-zinc-800/60 transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 h-full">
      {/* Image Container */}
      <Link href={`/blog/${blog.slug}`} className="relative w-full aspect-4/3 overflow-hidden block shrink-0">
        <span className="absolute top-4 left-4 z-10 inline-flex items-center rounded-full bg-[#c2ff0c] px-3 py-1 text-[10px] font-extrabold uppercase tracking-wider text-black shadow-sm">
          {blog.category || "Updates"}
        </span>
        {blog.thumbnail ? (
          <Image
            src={blog.thumbnail}
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
        <Link href={`/blog/${blog.slug}`} className="block group/title mb-2">
          <h3 className="text-base font-bold leading-snug tracking-tight text-zinc-950 dark:text-zinc-50 group-hover/title:text-zinc-600 dark:group-hover/title:text-zinc-300 transition-colors duration-150">
            {blog.title}
          </h3>
        </Link>
        <p className="text-sm leading-relaxed text-zinc-500 dark:text-zinc-400 line-clamp-3">
          {blog.summary}
        </p>
      </div>

      {/* Action Buttons - Bottom Section */}
      <div className="mt-auto border-t border-zinc-200/70 dark:border-zinc-800/60 bg-gradient-to-r from-zinc-50 to-zinc-100 dark:from-zinc-900/50 dark:to-zinc-800/50 p-4">
        <div className="flex gap-3 items-center">
          <Link
            href={`/admin/edit/${blog._id}`}
            className="flex-1 inline-flex items-center justify-center gap-2 rounded-lg bg-blue-500 hover:bg-blue-600 active:bg-blue-700 text-white font-semibold text-sm py-2.5 px-4 transition-all duration-200 shadow-md hover:shadow-lg"
          >
            <span>✏️</span>
            <span>Edit</span>
          </Link>
          <button
            onClick={handleDelete}
            disabled={isDeleting}
            className="flex-1 inline-flex items-center justify-center gap-2 rounded-lg bg-red-500 hover:bg-red-600 active:bg-red-700 disabled:bg-red-400 disabled:cursor-not-allowed text-white font-semibold text-sm py-2.5 px-4 transition-all duration-200 shadow-md hover:shadow-lg"
          >
            <span>🗑️</span>
            <span>{isDeleting ? "Deleting..." : "Delete"}</span>
          </button>
        </div>
      </div>
    </article>
  );
}
