import {create} from 'zustand';
import { fetchBookDetails, fetchBooks, handleCreate, handleUpdate, removeBookRecord } from './(components)/books/(server-actions)/data';
import { Book } from './lib/definitions';

type BookStore = {
    books: any[];
    isLoading: boolean;
    fetchAllBooks: () => Promise<any>;
    handleCreate: (payload: any) => Promise<any>;
    getBookById: (id: Int32Array) => Book | undefined;
    handleUpdate: (id: Int32Array, payload: any) => Promise<any>;
    handleDelete: (id: Int32Array) => Promise<any>;
}

export const useBookStore = create<BookStore>((set, get) => ({
    books: [],
    isLoading: false,
    fetchAllBooks: async () => {
        set({ isLoading: true });
        try {
            const response = await fetchBooks();
            set(() => ({books: response, isLoading: false}));
            
        } catch (error) {
            console.error("Error fetching books:", error);
      set({ isLoading: false });
        }
    },
    handleCreate: async (payload: any) => {
        const response = await handleCreate(payload);
        if (response && response.data && response.data.length > 0) {
            const newBook = response.data[0]; // Get the first element from the array
            set((state) => ({ books: [...state.books, newBook] }));
        }
    },
    handleUpdate: async (id: Int32Array, payload: any) => {
        try {
            // Perform the update operation
            await handleUpdate(id, payload);
            
            // Fetch the updated book data after the update operation is successful
            const response = await fetchBookDetails(id);

            if (response && response.length > 0) {
                const updatedBook = response[0]; // Get the first element from the array
                // Update the book data in the store
                set((state) => ({
                    books: state.books.map((book) => (book.id === id ? updatedBook : book)),
                }));
            }
        } catch (error) {
            console.error('Error updating book:', error);
            // Handle errors appropriately, e.g., display an error message to the user
        }
    },
    handleDelete: async (id: Int32Array) => {
        try {
            // Perform the delete operation
            await removeBookRecord(id);
            
            // Update the book data in the store after successful deletion
            set((state) => ({
                books: state.books.filter((book) => book.id !== id),
            }));
            
            console.log('Book deleted successfully');
        } catch (error) {
            console.error('Error deleting book:', error);
            // Handle errors appropriately, e.g., display an error message to the user
        }
    },
    
    getBookById: (id: Int32Array) => {
        const books = get().books;
        return books.find(book => book.id === id);
    },
}));

