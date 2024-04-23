"use server";

import { redirect } from "next/navigation";
import { saveMeal } from "./meals";
import { revalidatePath } from "next/cache";

function isInvalidText(text) {
  return text?.trim() === "";
}
export async function shareMeal(prevState, formData) {
  //   "use server"; // we use it for the server action that we use in form action
  const meal = {
    title: formData.get("title"),
    summary: formData.get("summary"),
    instructions: formData.get("instructions"),
    image: formData.get("image"),
    creator: formData.get("name"),
    creator_email: formData.get("email"),
  };
  if (
    isInvalidText(meal?.title) ||
    isInvalidText(meal?.summary) ||
    isInvalidText(meal?.creator) ||
    isInvalidText(meal?.creator_email) ||
    !meal?.creator_email.includes("@") ||
    !meal?.image ||
    meal?.image.size === 0
  ) {
    return {
      message: "Invalid input"
    }
  }
  await saveMeal(meal);
  revalidatePath('/meals', 'layout'); 
  // This function tells nextjs  revalide caches specific path
  // Second argument is next should revalidate cache based on page or layout
  /** Differences between page and layout
   * Page revalidation is only revalidate the specific page (default)
   * layout revalidation is cover all nested routes as well
   */
  redirect("/meals");
}
/** To move this function seperate file because maybe we want to use use client on main component */
