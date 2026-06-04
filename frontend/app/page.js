import Header from "../components/Header";
import Footer from "../components/Footer";
import BlogCard from "../components/BlogCard";
import { getBlogs } from "./actions";

export const dynamic = "force-dynamic";

export default async function Home() {


  const blogs = await getBlogs();
  console.log("This is the data", {blogs})
  console.log(blogs)

  return (
    <div className="flex flex-col min-h-screen bg-[#fafafa] dark:bg-zinc-950 font-sans transition-colors duration-250">
      <Header />

      <main className="flex-1 w-full max-w-7xl mx-auto px-6 sm:px-8 py-12 md:py-20 flex flex-col items-center">
        {/* Hero Section */}
        <div className="flex flex-col items-center text-center max-w-2xl mb-12 md:mb-16">
          <span className="inline-flex items-center rounded-full bg-[#c2ff0c] px-3.5 py-1 text-[11px] font-extrabold uppercase tracking-wider text-black mb-4">
            Blog
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-zinc-950 dark:text-white mb-4">
            Latest News
          </h1>
          <p className="text-sm md:text-base leading-relaxed text-zinc-500 dark:text-zinc-400">
            Stay updated with the latest trends, tips, and insights in web design through our informative and inspiring blog articles.
          </p>
        </div>

        {/* Blog Grid */}
        {blogs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 w-full">
            {blogs.map((blog) => (
              <BlogCard key={blog.slug} blog={blog} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-center w-full rounded-2xl border border-dashed border-zinc-200 dark:border-zinc-800 p-8">
            <h3 className="text-lg font-bold text-zinc-800 dark:text-zinc-200 mb-1">
              No articles found
            </h3>
            <p className="text-sm text-zinc-500 dark:text-zinc-450">
              Be the first to publish a new article by visiting the admin panel.
            </p>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}

