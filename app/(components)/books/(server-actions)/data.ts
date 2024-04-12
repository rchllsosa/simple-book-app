"use server";
import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'
import { createClient } from "@/utils/supabase/server";

const supabase = createClient();

export const fetchBooks = async () => {
  await new Promise((resolve) => setTimeout(resolve, 3000));

  const { data: books, error } = await supabase.from("books").select();

  if (error) {
    console.error("Error fetching books:", error);
    // Handle errors appropriately, e.g., display an error message to the user
    return;
  }

  return books;
};

export const fetchBookDetails = async (id: Int32Array) => {
try {
  const {data: book} = await supabase.from("books").select("*").eq("id", id);
  console.log("res123", book);
  return book;
} catch (error : any) {
  console.log(error.message);
}
}

export const handleCreate = async (formData : any) => {
  try {
    const result = await supabase.from('books').insert([formData]).select();
    return result;

  } catch (error : any) {
    console.log(error.message);
  }
  
};

export const handleUpdate = async (id: any, formData : any) => {
  try {
    const result = await supabase.from("books").update(formData).eq("id", id);
    return result;
  } catch (error : any) {
    console.log(error.message);
  }
};

export const removeBookRecord = async (id: any) => {
  const {data: bookToRemove} = await supabase.from("books").delete().eq("id", id);
  return bookToRemove;
  }