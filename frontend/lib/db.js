import fs from "fs/promises";
import path from "path";

const dbPath = path.join(process.cwd(), "lib", "db.json");

export async function getBlogs() {
  try {
    const data = await fs.readFile(dbPath, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    console.error("Error reading database:", error);
    return [];
  }
}

export async function getBlogById(id) {
  const blogs = await getBlogs();
  return blogs.find((blog) => blog.id === id) || null;
}

export async function createBlog(newBlog) {
  try {
    const blogs = await getBlogs();
    // Generate a simple URL-safe slug for the ID
    let slug = newBlog.title
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
    
    // Ensure uniqueness of slug
    let uniqueSlug = slug;
    let counter = 1;
    while (blogs.some(b => b.id === uniqueSlug)) {
      uniqueSlug = `${slug}-${counter}`;
      counter++;
    }

    const blogWithId = {
      id: uniqueSlug,
      date: new Date().toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
      isFeatured: false,
      author: "Admin User",
      ...newBlog,
    };
    
    blogs.unshift(blogWithId); // Add new blog to the beginning
    await fs.writeFile(dbPath, JSON.stringify(blogs, null, 2), "utf-8");
    return blogWithId;
  } catch (error) {
    console.error("Error writing to database:", error);
    throw new Error("Failed to save blog post to file");
  }
}
