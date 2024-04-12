"use client";
import BooksTable from "./get-all-books";

export default async function Books() {
  return (
    <div className="mt-10">
      <BooksTable />
    </div>
  );
}
