"use client";

import { useActionState } from "react";
import Link from "next/link";
import { ArrowLeft, Loader2, Send } from "lucide-react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { handleCreateBlog } from "./actions";

export default function AdminPage() {
  // Use React 19 useActionState to manage action state and pending state
  const [state, formAction, isPending] = useActionState(handleCreateBlog, null);

  const errors = state?.errors || {};
  const values = state?.values || {};

  return (
    <div className="flex flex-col min-h-screen bg-[#fafafa] dark:bg-zinc-950 font-sans transition-colors duration-250">
      <Header />

      <main className="flex-1 w-full max-w-2xl mx-auto px-6 sm:px-8 py-10 md:py-16">
        
        {/* Back Link */}
        <Link 
          href="/" 
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-zinc-500 hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-zinc-200 transition-colors mb-6 group"
        >
          <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-0.5" />
          <span>Back to Articles</span>
        </Link>

        {/* Header Title */}
        <div className="mb-8">
          <h1 className="text-3xl font-extrabold tracking-tight text-zinc-950 dark:text-white mb-2">
            Publish New Article
          </h1>
          <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-450">
            Create and publish a new article to the nexus website instantly.
          </p>
        </div>

        {/* Main Card Wrapper */}
        <div className="bg-white dark:bg-zinc-900/40 border border-zinc-200/60 dark:border-zinc-800/60 rounded-2xl p-6 sm:p-8">
          
          {/* General Form-Level Error */}
          {errors._form && (
            <div className="mb-6 p-4 rounded-xl bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900/30 text-xs sm:text-sm text-red-650 dark:text-red-400">
              {errors._form}
            </div>
          )}

          {/* Single Column Form */}
          <form action={formAction} className="space-y-6">
            
            {/* Title Input */}
            <div className="flex flex-col gap-1.5">
              <label htmlFor="title" className="text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-450">
                Article Title
              </label>
              <input
                id="title"
                name="title"
                type="text"
                defaultValue={values.title || ""}
                disabled={isPending}
                className={`w-full px-4 py-2.5 rounded-xl border bg-transparent text-sm text-zinc-900 dark:text-white focus:outline-none transition-colors ${
                  errors.title
                    ? "border-red-500 focus:border-red-500"
                    : "border-zinc-200 dark:border-zinc-800 focus:border-zinc-950 dark:focus:border-white"
                }`}
                required
              />
              {errors.title && (
                <span className="text-xs font-medium text-red-500 mt-1">{errors.title}</span>
              )}
            </div>

            {/* Row structure for Category & Read Time to keep height consistent but aligned */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Category */}
              <div className="flex flex-col gap-1.5">
                <label htmlFor="category" className="text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-450">
                  Category
                </label>
                <input
                  id="category"
                  name="category"
                  type="text"
                  placeholder="e.g. Updates, Tech, Design"
                  defaultValue={values.category || "Updates"}
                  disabled={isPending}
                  className={`w-full px-4 py-2.5 rounded-xl border bg-transparent text-sm text-zinc-900 dark:text-white focus:outline-none transition-colors ${
                    errors.category
                      ? "border-red-500 focus:border-red-500"
                      : "border-zinc-200 dark:border-zinc-800 focus:border-zinc-950 dark:focus:border-white"
                  }`}
                  required
                />
                {errors.category && (
                  <span className="text-xs font-medium text-red-500 mt-1">{errors.category}</span>
                )}
              </div>

              {/* Read Time */}
              <div className="flex flex-col gap-1.5">
                <label htmlFor="readTime" className="text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-450">
                  Read Time
                </label>
                <input
                  id="readTime"
                  name="readTime"
                  type="text"
                  placeholder="e.g. 5 min read"
                  defaultValue={values.readTime || ""}
                  disabled={isPending}
                  className={`w-full px-4 py-2.5 rounded-xl border bg-transparent text-sm text-zinc-900 dark:text-white focus:outline-none transition-colors ${
                    errors.readTime
                      ? "border-red-500 focus:border-red-500"
                      : "border-zinc-200 dark:border-zinc-800 focus:border-zinc-950 dark:focus:border-white"
                  }`}
                  required
                />
                {errors.readTime && (
                  <span className="text-xs font-medium text-red-500 mt-1">{errors.readTime}</span>
                )}
              </div>
            </div>

            {/* Image URL Input */}
            <div className="flex flex-col gap-1.5">
              <label htmlFor="image" className="text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-450">
                Image URL
              </label>
              <input
                id="image"
                name="image"
                type="url"
                placeholder="https://images.unsplash.com/photo-..."
                defaultValue={values.image || ""}
                disabled={isPending}
                className={`w-full px-4 py-2.5 rounded-xl border bg-transparent text-sm text-zinc-900 dark:text-white focus:outline-none transition-colors ${
                  errors.image
                    ? "border-red-500 focus:border-red-500"
                    : "border-zinc-200 dark:border-zinc-800 focus:border-zinc-950 dark:focus:border-white"
                }`}
              />
              {errors.image && (
                <span className="text-xs font-medium text-red-500 mt-1">{errors.image}</span>
              )}
            </div>

            {/* Excerpt Summary Input */}
            <div className="flex flex-col gap-1.5">
              <label htmlFor="excerpt" className="text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-450">
                Excerpt
              </label>
              <textarea
                id="excerpt"
                name="excerpt"
                rows="2"
                maxLength="200"
                placeholder="A brief 1-2 sentence description of the article..."
                defaultValue={values.excerpt || ""}
                disabled={isPending}
                className={`w-full px-4 py-2.5 rounded-xl border bg-transparent text-sm text-zinc-900 dark:text-white focus:outline-none transition-colors resize-none ${
                  errors.excerpt
                    ? "border-red-500 focus:border-red-500"
                    : "border-zinc-200 dark:border-zinc-800 focus:border-zinc-950 dark:focus:border-white"
                }`}
                required
              />
              {errors.excerpt && (
                <span className="text-xs font-medium text-red-500 mt-1">{errors.excerpt}</span>
              )}
            </div>

            {/* Article Content Textarea */}
            <div className="flex flex-col gap-1.5">
              <label htmlFor="content" className="text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-450">
                Article Body Content
              </label>
              <textarea
                id="content"
                name="content"
                rows="10"
                placeholder="Write your article body content here. Use ### for subheaders, - for bullet lists, and ```css for code blocks..."
                defaultValue={values.content || ""}
                disabled={isPending}
                className={`w-full px-4 py-2.5 rounded-xl border bg-transparent text-sm text-zinc-900 dark:text-white focus:outline-none transition-colors ${
                  errors.content
                    ? "border-red-500 focus:border-red-500"
                    : "border-zinc-200 dark:border-zinc-800 focus:border-zinc-950 dark:focus:border-white"
                }`}
                required
              />
              {errors.content && (
                <span className="text-xs font-medium text-red-500 mt-1">{errors.content}</span>
              )}
            </div>

            {/* Form Action Controls */}
            <div className="pt-4 border-t border-zinc-100 dark:border-zinc-800/80 flex items-center justify-end gap-4">
              <Link
                href="/"
                className="px-5 py-2.5 rounded-full text-xs font-bold text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 transition-colors"
              >
                Cancel
              </Link>
              
              <button
                type="submit"
                disabled={isPending}
                className="inline-flex items-center gap-2 rounded-full bg-[#c2ff0c] hover:bg-[#b0eb00] text-black font-bold text-xs px-6 py-2.5 transition-all duration-150 active:scale-95 disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed shadow-sm hover:shadow"
              >
                {isPending ? (
                  <>
                    <Loader2 className="h-3.5 w-3.5 animate-spin" />
                    <span>Publishing...</span>
                  </>
                ) : (
                  <>
                    <Send className="h-3.5 w-3.5" />
                    <span>Publish Post</span>
                  </>
                )}
              </button>
            </div>

          </form>
        </div>

      </main>

      <Footer />
    </div>
  );
}
