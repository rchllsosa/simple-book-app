"use client";
import { Tabs } from "flowbite-react";
import BooksTable from "./get-all-books";

export default async function Books() {
  return (
    <div className="overflow-x-auto">
      <Tabs style="fullWidth">
        <Tabs.Item active title="First">
          <BooksTable />
        </Tabs.Item>
        <Tabs.Item title="Second">
          <BooksTable />
        </Tabs.Item>
        <Tabs.Item title="Third">
          <BooksTable />
        </Tabs.Item>
      </Tabs>
    </div>
  );
}
