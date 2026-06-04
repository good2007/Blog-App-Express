export async function getBlogs() {
  try {
    console.log("[getBlogs] Server has successfully received the request to fetch the blog data")
    // Fetch Data from the Express Endpoint
    const res = await fetch(`${process.env.BACKEND_URL}/api/posts`);
    // Convert the raw response stream into a JavaScript Object
    const data = await res.json();

    // Return the 'data' array (your list of blog posts)
    console.log({data})
    return data;
  } catch (error) {
    console.error("Error reading database:", error);
    return [];
  }
}

export async function getBlogBySlug(slug) {
  const blogs = await getBlogs();
  console.log("[getBlogBySlug] This is the data", blogs)
  console.log('[getBlogBySlug] This is the slug', slug.id)
  const singleBlog = blogs.find((blog) => blog.slug === slug.id) || null;
  console.log({singleBlog})
  return singleBlog
}
