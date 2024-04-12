"use client";

import { Button, Modal } from "flowbite-react";
import { removeBookRecord } from "./(server-actions)/data";
import { useBookStore } from "@/app/store";

interface EditBookDataProps {
  bookId: any;
  openModal: boolean;
  setOpenModal: (open: boolean) => void;
}

export default function DeleteBook({
  bookId,
  openModal,
  setOpenModal,
}: EditBookDataProps) {
  const handleDelete = useBookStore((state) => state.handleDelete);
  
  const handleSubmit = async () => {
    await handleDelete(bookId);
    setOpenModal(false);
  };
  return (
    <>
      <Modal show={openModal} onClose={() => setOpenModal(false)}>
        <Modal.Header>Delete book</Modal.Header>
        <Modal.Body>
          <div className="space-y-6">
            <center>
              <strong className="font-bold">Warning!</strong>
              <span className="block sm:inline">
                Are you sure you want to delete this book record?
              </span>
            </center>
          </div>
        </Modal.Body>
        <Modal.Footer className="justify-end">
          <Button color="gray" onClick={() => setOpenModal(false)}>
            Cancel
          </Button>
          <Button type="submit" color="failure" onClick={() => (handleSubmit())}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
