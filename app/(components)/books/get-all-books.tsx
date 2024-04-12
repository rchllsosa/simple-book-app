"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { PencilIcon, PlusIcon, TrashIcon } from "@heroicons/react/24/outline";
import { Button, ButtonGroup, Table } from "flowbite-react";
import { HiOutlinePencil, HiOutlinePencilAlt } from "react-icons/hi";
import { IoTrashBinOutline } from "react-icons/io5";
import { fetchBooks } from "./(server-actions)/useBook";
import AddBookData from "./add-book";
import EditBookData from "./edit-book";
import DeleteBook from "./delete-book";

export default function BooksTable() {
  const [books, setBooks] = useState<any>([]);
  const [openAddModal, setOpenAddModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [selectedBookId, setSelectedBookId] = useState<any>(null);

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
      <div className="mt-5 mb-4">
        <div className="item-center">
          <h1>List of books</h1>
        </div>
        <div className="mb-4">
          <Button
            onClick={() => {
              setOpenAddModal(true);
            }}
          >
            Add book
          </Button>
          <AddBookData
            openModal={openAddModal}
            setOpenModal={setOpenAddModal}
          />
        </div>

        <div className="relative overflow-y-auto">
          <Table hoverable>
            <Table.Head>
              <Table.HeadCell>Title</Table.HeadCell>
              <Table.HeadCell>Author</Table.HeadCell>
              <Table.HeadCell>Published date</Table.HeadCell>
              <Table.HeadCell>Genre</Table.HeadCell>
              <Table.HeadCell>Actions</Table.HeadCell>
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
                        id="edit"
                        name="edit"
                        outline
                        onClick={() => {
                          setSelectedBookId(book.id), setOpenEditModal(true);
                        }}
                        size="md"
                      >
                        <HiOutlinePencilAlt />
                      </Button>
                      <EditBookData
                        bookId={selectedBookId}
                        openModal={openEditModal}
                        setOpenModal={setOpenEditModal}
                      />
                      <Button
                        id="delete"
                        name="delete"
                        outline
                        onClick={() => {
                          setSelectedBookId(book.id), setOpenDeleteModal(true);
                        }}
                        size="md"
                      >
                        <IoTrashBinOutline />
                      </Button>
                        <DeleteBook
                          bookId={selectedBookId}
                          openModal={openDeleteModal}
                          setOpenModal={setOpenDeleteModal}
                        />
                    </ButtonGroup>
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        </div>
      </div>
    </>
  );
}
