"use server";
import { createClient } from "@/utils/supabase/server";

const supabase = createClient();

export const fetchBooks = async () => {
  const { data: books, error } = await supabase.from("books").select();

  if (error) {
    console.error("Error fetching books:", error);
    // Handle errors appropriately, e.g., display an error message to the user
    return;
  }

  return books;
};