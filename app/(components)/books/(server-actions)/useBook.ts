"use server";

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

export const fetchBookDetails = async (id: any) => {
const {data: book} = await supabase.from("books").select("*").eq("id", id);
return book;
}

export const handleCreate = async (formData : any) => {
  try {
    return await supabase.from('books').insert([formData]).select();
  } catch (error : any) {
    console.log(error.message);
  }
};

export const handleUpdate = async (id: any, formData : any) => {
  try {
    const res = await supabase.from("books").update(formData).eq("id", id);
// console.log(res);

  } catch (error : any) {
    console.log(error.message);
  }
};

export const removeBookRecord = async (id: any) => {
  const {data: book} = await supabase.from("books").delete().eq("id", id);
  return book;
  }