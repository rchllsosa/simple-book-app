"use client";

import { Button, Datepicker, Dropdown, Modal, TextInput } from "flowbite-react";
import { useState } from "react";
import { useBookStore } from "@/app/store";

interface AddBookDataProps {
  openModal: boolean;
  setOpenModal: (open: boolean) => void;
}

export default function AddBookData({
  openModal,
  setOpenModal,
}: AddBookDataProps) {
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

  const handleCreate = useBookStore((state) => state.handleCreate);

  const handleSubmit = (data: any) => {
    handleCreate(data);
    setOpenModal(false);
  }
  

  return (
    <>
      <Modal show={openModal} onClose={() => setOpenModal(false)}>
        <Modal.Header>Add book information</Modal.Header>
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
              value={formData?.author}
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
                defaultDate={formData?.published_date}
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
              handleSubmit(formData);
            }}
          >
            Add
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
