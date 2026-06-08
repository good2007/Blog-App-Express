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
    <div className="flex flex-col min-h-screen bg-sky-400 font-sans transition-colors duration-250">
      <Header />

      <main className="flex-1 w-full px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-20 flex flex-col items-center">
        {/* Hero Section */}
        <div className="flex flex-col items-center text-center max-w-2xl mb-8 sm:mb-12 lg:mb-16 w-full">
          <span className="inline-flex items-center rounded-full bg-green-400 px-3 sm:px-3.5 py-1 text-[10px] sm:text-[11px] font-extrabold uppercase tracking-wider text-white mb-3 sm:mb-4">
            Blog
          </span>
          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white mb-2 sm:mb-4 px-2">
            Latest News
          </h1>
          <p className="text-xs sm:text-sm lg:text-base leading-relaxed text-white/90 px-2">
            Stay updated with the latest trends, tips, and insights in web design through our informative and inspiring blog articles.
          </p>
        </div>

        {/* Blog Grid */}
        {blogs.length > 0 ? (
          <div className="w-full max-w-7xl mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 w-full">
              {blogs.map((blog) => (
                <BlogCard key={blog.slug} blog={blog} />
              ))}
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-12 sm:py-20 text-center w-full max-w-2xl rounded-2xl border border-dashed border-white/50 p-6 sm:p-8 bg-white/10 backdrop-blur-sm mx-auto">
            <h3 className="text-base sm:text-lg font-bold text-white mb-1">
              No articles found
            </h3>
            <p className="text-xs sm:text-sm text-white/80">
              Be the first to publish a new article by visiting the admin panel.
            </p>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
