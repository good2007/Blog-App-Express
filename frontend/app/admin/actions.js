"use server";

import { redirect } from "next/navigation";
import { createBlog } from "../../lib/db";
import { blogSchema } from "../../lib/schema";

/**
 * Server Action to create a new blog article with Zod validation.
 * Supports standard form state integration.
 */
export async function handleCreateBlog(prevState, formData) {
  const rawData = {
    title: formData.get("title")?.toString() || "",
    excerpt: formData.get("excerpt")?.toString() || "",
    content: formData.get("content")?.toString() || "",
    category: formData.get("category")?.toString() || "",
    readTime: formData.get("readTime")?.toString() || "",
    image: formData.get("image")?.toString() || "",
  };

  // 1. Zod Gateway validation
  const result = blogSchema.safeParse(rawData);

  if (!result.success) {
    // Map Zod errors to field names
    const errors = {};
    result.error.issues.forEach((issue) => {
      const fieldName = issue.path[0];
      errors[fieldName] = issue.message;
    });

    return {
      success: false,
      errors,
      values: rawData,
    };
  }

  // 2. Perform write operation
  try {
    await createBlog(result.data);
  } catch (error) {
    console.error("Failed to create blog in server action:", error);
    return {
      success: false,
      errors: { _form: "Unable to save your post. Please check file permissions or try again." },
      values: rawData,
    };
  }

  // 3. Redirect back to homepage on success
  // (Redirect must be outside the try-catch block as it throws a redirect error to break execution flow)
  redirect("/");
}
