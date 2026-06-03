import { redirect } from "next/navigation";

/**
 * Compatibility redirect handler.
 * Routes users who hit '/create' directly to the '/admin' panel.
 */
export default function CreateRedirectPage() {
  redirect("/admin");
}
