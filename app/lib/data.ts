"use server";

import { createClient } from "@/utils/supabase/server";
import { Book } from "./definitions";
import { useRouter } from "next/navigation";

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

export const handleCreate = async (formData : any) => {
  console.log("test", formData);

  try {
    const test = await supabase.from("books").insert([formData]);
    console.log("test", test);
  } catch (error : any) {
    console.log(error.message);
  }
};