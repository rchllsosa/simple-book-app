"use client";
import { fetchBooks } from "@/app/lib/data";
import { useEffect, useState } from "react";

export default function BooksTable(){
  const [books, setBooks] = useState<any>([]);

  useEffect(() => {
      const fetchData = () => {
          fetchBooks()
              .then(fetchedBooks => {
                  setBooks(fetchedBooks);
              })
              .catch(error => {
                  console.error("Unexpected error fetching books:", error);
                  // Handle unexpected errors
              });
      };

      fetchData();
  }, []);

return(
<div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
            <h1>List of books</h1>
          </div>
          <table className="hidden min-w-full text-gray-900 md:table">
            <thead className="rounded-lg text-left text-sm font-normal">
              <tr>
                <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                  Title
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Author
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Date Published
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Genre
                </th>
                <th scope="col" className="relative py-3 pl-6 pr-3">
                  <span className="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
            {books.map((book: any) => (
                <tr key={book.id}>
                  <td>{book.title}</td>
                  <td>{book.author}</td>
                  <td>{book.published_date}</td>
                  <td>{book.genre}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
);
}