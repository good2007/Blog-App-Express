import { z } from "zod";

export const blogSchema = z.object({
  title: z
    .string()
    .min(5, { message: "Title must be at least 5 characters long." })
    .max(100, { message: "Title cannot exceed 100 characters." }),
  excerpt: z
    .string()
    .min(10, { message: "Excerpt must be at least 10 characters long." })
    .max(200, { message: "Excerpt cannot exceed 200 characters." }),
  content: z
    .string()
    .min(20, { message: "Content must be at least 20 characters long." }),
  category: z
    .string()
    .min(2, { message: "Please specify a category." })
    .max(30, { message: "Category name is too long." }),
  readTime: z
    .string()
    .min(3, { message: "Please specify read time (e.g., '5 min read')." })
    .max(20, { message: "Read time format is too long." }),
  image: z
    .string()
    .url({ message: "Please provide a valid image URL." })
    .or(z.literal("")), // optional, defaults will be applied if empty
});

export function validateBlog(data) {
  return blogSchema.safeParse(data);
}
