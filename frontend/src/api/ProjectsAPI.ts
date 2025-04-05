import { Book } from '../types/Book';

interface FetchBooksResponse {
  books: Book[];
  totalNumBooks: number;
}

const API_URL = 'https://mission13erickson-backend2-fdcpbta9cpgqafdu.eastus-01.azurewebsites.net/BookStore';

export const fetchBooks = async (
  pageSize: number,
  pageNum: number,
  sortOrder: string,
  selectedCategory: string
): Promise<FetchBooksResponse> => {
  try {
    console.log("API: Fetching books...");
    const categoryQuery = selectedCategory ? `&category=${encodeURIComponent(selectedCategory)}` : '';
    const url = `${API_URL}/AllBooks?pageSize=${pageSize}&pageNum=${pageNum}&sortOrder=${sortOrder}${categoryQuery}`;
    console.log("API: Fetching URL:", url);
    
    const response = await fetch(url);
    console.log("API: Books response:", response);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch data: ${response.status}`);
    }
    
    const data = await response.json();
    console.log("API: Books data:", data);
    return data;
  } catch (error) {
    console.error('Error fetching books:', error);
    throw error;
  }
};

export const fetchCategories = async (): Promise<string[]> => {
  try {
    console.log("API: Fetching categories...");
    const url = `${API_URL}/Categories`;
    console.log("API: Categories URL:", url);
    
    const response = await fetch(url);
    console.log("API: Categories response:", response);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch categories: ${response.status}`);
    }
    
    const data = await response.json();
    console.log("API: Categories data:", data);
    return data;
  } catch (error) {
    console.error('Error fetching categories:', error);
    throw error;
  }
};

export const fetchBookById = async (id: string): Promise<Book> => {
  try {
    console.log(`API: Fetching book ${id}...`);
    const url = `${API_URL}/Book/${id}`;
    console.log("API: Book URL:", url);
    
    const response = await fetch(url);
    console.log("API: Book response:", response);
    
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    
    const data = await response.json();
    console.log("API: Book data:", data);
    return data;
  } catch (error) {
    console.error('Error fetching book:', error);
    throw error;
  }
};

export const addBook = async (book: Book): Promise<void> => {
  try {
    console.log("API: Adding book...");
    const url = `${API_URL}/AddBook`;
    console.log("API: Add URL:", url);
    console.log("API: Book data:", book);
    
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(book),
    });
    
    console.log("API: Add response:", response);
    
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
  } catch (error) {
    console.error('Error adding book:', error);
    throw error;
  }
};

export const updateBook = async (id: string, book: Book): Promise<void> => {
  try {
    console.log(`API: Updating book ${id}...`);
    const url = `${API_URL}/UpdateBook/${id}`;
    console.log("API: Update URL:", url);
    console.log("API: Book data:", book);
    
    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(book),
    });
    
    console.log("API: Update response:", response);
    
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
  } catch (error) {
    console.error('Error updating book:', error);
    throw error;
  }
};

export const deleteBook = async (id: number): Promise<void> => {
  try {
    console.log(`API: Deleting book ${id}...`);
    const url = `${API_URL}/DeleteBook/${id}`;
    console.log("API: Delete URL:", url);
    
    const response = await fetch(url, {
      method: 'DELETE',
    });
    
    console.log("API: Delete response:", response);
    
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
  } catch (error) {
    console.error('Error deleting book:', error);
    throw error;
  }
}; 