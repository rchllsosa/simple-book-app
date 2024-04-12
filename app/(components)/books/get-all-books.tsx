import { Suspense, useEffect, useState } from "react";
import { Button, ButtonGroup, Spinner, Table, TableRow } from "flowbite-react";
import { HiOutlinePencilAlt } from "react-icons/hi";
import { IoTrashBinOutline } from "react-icons/io5";
import AddBookData from "./add-book";
import EditBookData from "./edit-book";
import DeleteBook from "./delete-book";
import { useBookStore } from "@/app/store";

export default function BooksTable() {
  const [openAddModal, setOpenAddModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [selectedBookId, setSelectedBookId] = useState<any>(null);
  const getAllBooks = useBookStore((state) => state.fetchAllBooks);
  const books = useBookStore((state) => state.books);
  const isLoading = useBookStore((state) => state.isLoading);

  useEffect(() => {
    getAllBooks();
  }, []);

  return (
    <>
      <div className="mt-4 mb-4 md:w-full">
        <div className="item-center">
          <h1>List of books</h1>
        </div>
        <div className="mt-4 mb-4">
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
              {isLoading ? (
                <TableRow className="content-center">
                  <Table.Cell colSpan={5}>
                    <Spinner aria-label="Spinner button example" size="sm" />
                    <span className="pl-3">Loading...</span>
                  </Table.Cell>
                </TableRow>
              ) : books.length === 0 ? (
                <TableRow>
                  <Table.Cell colSpan={5}>
                    No record found
                  </Table.Cell>
                </TableRow>
              ) : (
                books.map((book: any) => (
                  <Table.Row
                    key={book.id}
                    className="bg-white dark:border-gray-700 dark:bg-gray-800"
                  >
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
                            setSelectedBookId(book.id);
                            setOpenEditModal(true);
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
                            setSelectedBookId(book.id);
                            setOpenDeleteModal(true);
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
                )))}
            </Table.Body>
          </Table>
        </div>
      </div>
    </>
  );
}
