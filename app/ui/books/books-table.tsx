"use client";
import { fetchBooks } from "@/app/lib/data";
import Link from "next/link";
import { useEffect, useState } from "react";
import { PencilIcon, PlusIcon, TrashIcon } from "@heroicons/react/24/outline";
import { Button, ButtonGroup, Table } from "flowbite-react";
import AddBookData from "@/app/books/add-book";
import EditBookData from "@/app/books/edit-book";
import { HiOutlinePencil, HiOutlinePencilAlt } from "react-icons/hi";
import { IoTrashBinOutline } from "react-icons/io5";

export default function BooksTable() {
  const [books, setBooks] = useState<any>([]);
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    const fetchData = () => {
      fetchBooks()
        .then((fetchedBooks) => {
          setBooks(fetchedBooks);
        })
        .catch((error) => {
          console.error("Unexpected error fetching books:", error);
          // Handle unexpected errors
        });
    };

    fetchData();
  }, []);

  return (
    <>
      <h1>List of books</h1>
      <Button onClick={() => setOpenModal(true)}>Add book</Button>
      <AddBookData openModal={openModal} setOpenModal={setOpenModal} />

      <div className="relative overflow-y-auto">
        <Table hoverable>
          <Table.Head>
            <Table.HeadCell>Title</Table.HeadCell>
            <Table.HeadCell>Author</Table.HeadCell>
            <Table.HeadCell>Published date</Table.HeadCell>
            <Table.HeadCell>Genre</Table.HeadCell>
            <Table.HeadCell>
              <span className="sr-only">Edit</span>
            </Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">
            {books?.map((book: any) => (
              <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                  {book.title}
                </Table.Cell>
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                  {book.author}
                </Table.Cell>
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                  {book.published_date}
                </Table.Cell>
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                  {book.genre}
                </Table.Cell>
                <Table.Cell>
                  <ButtonGroup>
                    <Button
                      outline
                      onClick={() => setOpenModal(true)}
                      size="sm"
                    >
                      <HiOutlinePencilAlt />
                      
                    </Button>
                    <EditBookData
                      openModal={openModal}
                      setOpenModal={setOpenModal}
                    />
                    <Button
                      outline
                      onClick={() => setOpenModal(true)}
                      size="sm"
                    >
                      <IoTrashBinOutline />
                      
                    </Button>
                  </ButtonGroup>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </div>
    </>
  );
}
