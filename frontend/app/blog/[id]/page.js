import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Clock, Calendar, User } from "lucide-react";
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import { getBlogById } from "../../../lib/db";

// Next.js page dynamic configuration
export const dynamic = "force-dynamic";

// Custom parser to render paragraph content blocks (headers, code blocks, lists, standard paragraphs)
function renderContentBlock(block, index) {
  block = block.trim();
  if (!block) return null;

  // Code block parsing
  if (block.startsWith("```")) {
    const lines = block.split("\n");
    const code = lines.slice(1, -1).join("\n");
    return (
      <pre key={index} className="bg-zinc-950 text-zinc-200 p-5 rounded-xl font-mono text-xs sm:text-sm overflow-x-auto border border-zinc-900 my-6 shadow-inner">
        <code>{code}</code>
      </pre>
    );
  }

  // Subheading parsing
  if (block.startsWith("###")) {
    const headingText = block.replace("###", "").trim();
    return (
      <h3 key={index} className="text-xl sm:text-2xl font-bold tracking-tight text-zinc-950 dark:text-white mt-8 mb-4">
        {headingText}
      </h3>
    );
  }

  // Bullet list parsing
  if (block.startsWith("-")) {
    const items = block
      .split("\n")
      .map(line => line.replace(/^-/, "").trim())
      .filter(Boolean);
    return (
      <ul key={index} className="list-disc pl-6 space-y-2 text-zinc-700 dark:text-zinc-300 my-4 text-base sm:text-md leading-relaxed">
        {items.map((item, idx) => (
          <li key={idx}>{item}</li>
        ))}
      </ul>
    );
  }

  // Ordered list parsing
  if (/^\d+\./.test(block)) {
    const items = block
      .split("\n")
      .map(line => line.replace(/^\d+\./, "").trim())
      .filter(Boolean);
    return (
      <ol key={index} className="list-decimal pl-6 space-y-2 text-zinc-700 dark:text-zinc-300 my-4 text-base sm:text-md leading-relaxed">
        {items.map((item, idx) => (
          <li key={idx}>{item}</li>
        ))}
      </ol>
    );
  }

  // Default paragraph formatting
  return (
    <p key={index} className="text-base sm:text-lg leading-relaxed text-zinc-750 dark:text-zinc-300 my-5">
      {block}
    </p>
  );
}

export default async function BlogDetailsPage({ params }) {
  const { id } = await params;
  console.log(id)
  const blog = await getBlogById(id);

  if (!blog) {
    return (
      <div className="flex flex-col min-h-screen bg-[#fafafa] dark:bg-zinc-950 font-sans transition-colors duration-250">
        <Header />
        <main className="flex-1 flex flex-col items-center justify-center p-6 text-center max-w-xl mx-auto">
          <div className="bg-[#c2ff0c]/10 text-black dark:text-[#c2ff0c] p-4 rounded-full mb-6">
            <svg className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-zinc-950 dark:text-white mb-2">Article Not Found</h2>
          <p className="text-sm text-zinc-500 dark:text-zinc-450 mb-6">
            The article you are trying to view does not exist or has been removed.
          </p>
          <Link href="/" className="inline-flex items-center gap-2 rounded-full bg-zinc-950 text-white dark:bg-white dark:text-black font-semibold text-xs px-6 py-2.5 transition-all active:scale-95">
            <ArrowLeft className="h-4 w-4" />
            <span>Return to Feed</span>
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  // Split content into paragraph segments
  const contentBlocks = blog.content.split(/\n\s*\n/);

  return (
    <div className="flex flex-col min-h-screen bg-[#fafafa] dark:bg-zinc-950 font-sans transition-colors duration-250">
      <Header />

      <main className="flex-1 w-full max-w-3xl mx-auto px-6 sm:px-8 py-10 md:py-16">
        
        {/* Back Link Button */}
        <Link 
          href="/" 
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-zinc-500 hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-zinc-200 transition-colors mb-8 group"
        >
          <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-0.5" />
          <span>Back to Articles</span>
        </Link>

        {/* Article Meta Header */}
        <article className="w-full">
          <header className="mb-8">
            {/* Category tag */}
            <span className="inline-flex items-center rounded-full bg-[#c2ff0c] px-3 py-0.5 text-[10px] font-extrabold uppercase tracking-wider text-black mb-4">
              {blog.category}
            </span>

            {/* Title */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-zinc-950 dark:text-white leading-tight mb-6">
              {blog.title}
            </h1>

            {/* Meta Row info */}
            <div className="flex flex-wrap items-center gap-y-2 gap-x-4 text-xs text-zinc-500 dark:text-zinc-450 border-y border-zinc-200/50 dark:border-zinc-800/50 py-4 font-medium">
              <div className="flex items-center gap-1.5">
                <User className="h-3.5 w-3.5 text-zinc-400" />
                <span>{blog.author}</span>
              </div>
              <span className="hidden sm:inline text-zinc-300 dark:text-zinc-800">•</span>
              <div className="flex items-center gap-1.5">
                <Calendar className="h-3.5 w-3.5 text-zinc-400" />
                <span>{blog.date}</span>
              </div>
              <span className="hidden sm:inline text-zinc-300 dark:text-zinc-800">•</span>
              <div className="flex items-center gap-1.5">
                <Clock className="h-3.5 w-3.5 text-zinc-400" />
                <span>{blog.readTime}</span>
              </div>
            </div>
          </header>

          {/* Article cover photo */}
          {blog.image && (
            <div className="relative w-full aspect-video rounded-2xl overflow-hidden border border-zinc-200/60 dark:border-zinc-800/60 mb-10 bg-zinc-100 dark:bg-zinc-900">
              <Image
                src={blog.image}
                alt={blog.title}
                fill
                priority
                className="object-cover object-center"
              />
            </div>
          )}

          {/* Article Main Content Body */}
          <div className="prose dark:prose-invert max-w-none text-zinc-800 dark:text-zinc-200 font-sans tracking-normal leading-relaxed">
            {contentBlocks.map((block, index) => renderContentBlock(block, index))}
          </div>
        </article>

      </main>

      <Footer />
    </div>
  );
}
