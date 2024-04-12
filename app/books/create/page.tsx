"use client";

import { Button, Datepicker, Dropdown, Modal, TextInput } from "flowbite-react";
import Link from "next/link";

interface AddBookDataProps {
  openModal: boolean;
  setOpenModal: (open: boolean) => void;
}

export default function AddBookData({
  openModal,
  setOpenModal,
}: AddBookDataProps) {
  return (
    <>
      <Modal dismissible show={openModal} onClose={() => setOpenModal(false)}>
        <Modal.Header>Add book information</Modal.Header>
        <Modal.Body>
          <form>
            <div className="mb-4">
              <label htmlFor="title" className="mb-2 block text-sm font-medium">
                Title
              </label>
              <TextInput
                id="title"
                name="title"
                type="string"
                placeholder="Enter book title"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="author"
                className="mb-2 block text-sm font-medium"
              >
                Author
              </label>
              <TextInput
                id="author"
                name="author"
                type="string"
                placeholder="Enter the name of the author"
              />
            </div>
            <div className="flex flex-wrap -mx-2 mb-4">
              <div className="w-full md:w-1/2 px-2">
                <label
                  htmlFor="date"
                  className="mb-2 block text-sm font-medium"
                >
                  Published date
                </label>
                <Datepicker id="date" name="date" placeholder="Select date" />
              </div>
              <div className="w-full md:w-1/2 px-2">
                <label
                  htmlFor="genre"
                  className="mb-2 block text-sm font-medium"
                >
                  Genre
                </label>
                <Dropdown label="Select genre" outline dismissOnClick={false}>
                  <Dropdown.Item>Dashboard</Dropdown.Item>
                  <Dropdown.Item>Settings</Dropdown.Item>
                  <Dropdown.Item>Earnings</Dropdown.Item>
                  <Dropdown.Item>Sign out</Dropdown.Item>
                </Dropdown>
              </div>
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer className="justify-end">
          <Button color="gray" onClick={() => setOpenModal(false)}>
            Cancel
          </Button>
          <Button onClick={() => setOpenModal(false)}>Add</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
