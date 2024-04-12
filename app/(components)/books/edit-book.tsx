"use client";

import { Button, Datepicker, Modal, TextInput } from "flowbite-react";
import { useEffect, useState } from "react";
import { fetchBookDetails, handleUpdate } from "./(server-actions)/useBook";

interface EditBookDataProps {
  bookId: any;
  openModal: boolean;
  setOpenModal: (open: boolean) => void;
}

export default function EditBookData({
  bookId,
  openModal,
  setOpenModal,
}: EditBookDataProps) {
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    genre: "",
    published_date: new Date(),
  });
  const genres = [
    "Fantasy",
    "Science Fiction",
    "Mystery",
    "Thriller",
    "Romance",
    "Horror",
    "Adventure",
  ];
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleGenreChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFormData({ ...formData, genre: e.target.value });
  };

  useEffect(() => {
    // Fetch book details when the component mounts
    fetchBookDetails(bookId)
      .then((book: any) => {
        // Populate the form fields with fetched book details
        setFormData({
          title: book[0].title,
          author: book[0].author,
          genre: book[0].genre,
          published_date: new Date(book[0].published_date),
        });
      })
      .catch((error) => {
        console.error("Error fetching book details:", error);
        // Handle error
      });
  }, [bookId]); // Run the effect when bookId changes

  return (
    <>
      <Modal show={openModal} onClose={() => setOpenModal(false)}>
        <Modal.Header>Edit book information</Modal.Header>
        <Modal.Body>
          <div className="mb-4">
            <label htmlFor="title" className="mb-2 block text-sm font-medium">
              Title
            </label>
            <TextInput
              id="title"
              name="title"
              type="string"
              placeholder="Enter book title"
              value={formData?.title}
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="author" className="mb-2 block text-sm font-medium">
              Author
            </label>
            <TextInput
              id="author"
              name="author"
              type="string"
              placeholder="Enter the name of the author"
              value={formData.author}
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-wrap -mx-2 mb-4">
            <div className="w-full md:w-1/2 px-2">
              <label htmlFor="date" className="mb-2 block text-sm font-medium">
                Published date
              </label>
              <Datepicker
                id="date"
                name="date"
                placeholder="Select date"
                defaultDate={formData.published_date}
                onChange={handleChange}
              />
            </div>
            <div className="w-full md:w-1/2 px-2">
              <label htmlFor="genre" className="mb-2 block text-sm font-medium">
                Genre
              </label>
              <select
                id="genre"
                name="genre"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                value={formData.genre}
                onChange={handleGenreChange}
              >
                <option value="" disabled>
                  Select a genre
                </option>
                {genres.map((genre) => (
                  <option key={genre} value={genre}>
                    {genre}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer className="justify-end">
          <Button color="gray" onClick={() => setOpenModal(false)}>
            Cancel
          </Button>
          <Button
            type="submit"
            onClick={() => {
                handleUpdate(bookId, formData), setOpenModal(false);
            }}
          >
            Save changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
