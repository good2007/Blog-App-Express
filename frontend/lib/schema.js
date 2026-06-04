import { z } from "zod";

// These field names must match exactly what the form sends and what
// the backend (app.js) expects to receive in req.body.
export const blogSchema = z.object({
  title: z
    .string()
    .min(5, { message: "Title must be at least 5 characters long." })
    .max(100, { message: "Title cannot exceed 100 characters." }),
  author: z
    .string()
    .min(2, { message: "Author name must be at least 2 characters long." })
    .max(60, { message: "Author name is too long." }),
  thumbnail: z
    .string()
    .min(1, { message: "Please provide an image link." }),
  summary: z
    .string()
    .min(10, { message: "Summary must be at least 10 characters long." })
    .max(200, { message: "Summary cannot exceed 200 characters." }),
  readTime: z
    .string()
    .min(3, { message: "Please specify read time (e.g., '5 min read')." })
    .max(20, { message: "Read time format is too long." }),
  content: z
    .string()
    .min(20, { message: "Content must be at least 20 characters long." }),
});

export function validateBlog(data) {
  return blogSchema.safeParse(data);
}
