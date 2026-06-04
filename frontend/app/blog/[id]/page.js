import Link from "next/link";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import { getBlogBySlug } from "@/app/actions";

export const dynamic = "force-dynamic";

export default async function BlogDetailsPage({ params }) {
  const slug = await params;
  console.log("[BlogDetailsPage] This is the param ", slug.id)
  const blog = await getBlogBySlug(slug);
  console.log({blog})

  // Show a simple "not found" message if the blog doesn't exist
  if (!blog) {
    return (
      <div className="flex flex-col min-h-screen bg-[#fafafa] dark:bg-zinc-950">
        <Header />
        <main className="flex-1 flex flex-col items-center justify-center p-6 text-center">
          <h2 className="text-2xl font-bold text-zinc-950 dark:text-white mb-2">
            Article Not Found
          </h2>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-6">
            The article you are looking for does not exist or has been removed.
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-full bg-zinc-950 text-white font-semibold text-xs px-6 py-2.5 transition-all active:scale-95"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Articles</span>
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  // Split the content into paragraphs wherever there is a blank line
  const paragraphs = blog.content.split(/\n\s*\n/).filter((p) => p.trim());

  return (
    <div className="flex flex-col min-h-screen bg-[#fafafa] dark:bg-zinc-950">
      <Header />

      <main className="flex-1 w-full max-w-3xl mx-auto px-6 sm:px-8 py-10 md:py-16">

        {/* Back link */}
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-zinc-500 hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-zinc-200 transition-colors mb-8 group"
        >
          <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-0.5" />
          <span>Back to Articles</span>
        </Link>

        <article>

          {/* Title */}
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-zinc-950 dark:text-white leading-tight mb-4">
            {blog.title}
          </h1>

          {/* Author and read time */}
          <div className="flex items-center gap-3 text-sm text-zinc-500 dark:text-zinc-400 mb-8">
            <span>{blog.author}</span>
            <span>·</span>
            <span>{blog.readTime}</span>
          </div>

          {/* Cover image */}
          {blog.thumbnail && (
            <div className="relative w-full aspect-video rounded-2xl overflow-hidden border border-zinc-200/60 dark:border-zinc-800/60 mb-8 bg-zinc-100 dark:bg-zinc-900">
              <Image
                src={blog.thumbnail}
                alt={blog.title}
                fill
                priority
                className="object-cover object-center"
              />
            </div>
          )}

          {/* Summary — displayed as a highlighted intro line */}
          <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-300 leading-relaxed border-l-4 border-[#c2ff0c] pl-4 mb-8">
            {blog.summary}
          </p>

          {/* Main content — plain paragraphs, no markdown */}
          <div className="space-y-5">
            {paragraphs.map((paragraph, index) => (
              <p key={index} className="text-base leading-relaxed text-zinc-700 dark:text-zinc-300">
                {paragraph.trim()}
              </p>
            ))}
          </div>

        </article>
      </main>

      <Footer />
    </div>
  );
}
