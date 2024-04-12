"use client";

import { Button, Modal } from "flowbite-react";
import { removeBookRecord } from "./(server-actions)/useBook";

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
          <Button type="submit" color="failure" onClick={() => (removeBookRecord(bookId), setOpenModal(false))}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
