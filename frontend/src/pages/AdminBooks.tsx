import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

interface Book {
  bookID: number;
  title: string;
  author: string;
  publisher: string;
  isbn: string;
  classification: string;
  category: string;
  pageCount: number;
  price: number;
}

const AdminBooks = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      setLoading(true);
      console.log("Admin: Fetching books...");
      const url = 'https://mission13erickson-backend2-fdcpbta9cpgqafdu.eastus-01.azurewebsites.net/BookStore/AllBooks?pageSize=100';
      console.log("Admin: Fetching URL:", url);
      const response = await fetch(url);
      console.log("Admin: Books response:", response);
      
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      
      const data = await response.json();
      console.log("Admin: Books data:", data);
      setBooks(data.books);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch books. Please try again later.');
      setLoading(false);
      console.error('Error fetching books:', err);
    }
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this book?')) {
      try {
        console.log(`Admin: Deleting book ${id}...`);
        const url = `https://mission13erickson-backend2-fdcpbta9cpgqafdu.eastus-01.azurewebsites.net/BookStore/DeleteBook/${id}`;
        console.log("Admin: Delete URL:", url);
        const response = await fetch(url, {
          method: 'DELETE',
        });
        console.log("Admin: Delete response:", response);
        
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        
        // Update the books list after successful deletion
        setBooks(books.filter(book => book.bookID !== id));
        
      } catch (err) {
        console.error('Error deleting book:', err);
        alert('Failed to delete book. Please try again.');
      }
    }
  };

  if (loading) return <div className="container mt-4">Loading...</div>;
  if (error) return <div className="container mt-4 text-danger">{error}</div>;

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>Manage Books</h1>
        <Link to="/adminbooks/add" className="btn btn-primary">
          Add New Book
        </Link>
      </div>

      <Link to="/" className="btn btn-secondary mb-3">
        Back to Store
      </Link>

      <div className="table-responsive">
        <table className="table table-striped table-hover">
          <thead className="table-dark">
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Author</th>
              <th>Category</th>
              <th>Price</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {books.map(book => (
              <tr key={book.bookID}>
                <td>{book.bookID}</td>
                <td>{book.title}</td>
                <td>{book.author}</td>
                <td>{book.category}</td>
                <td>${book.price.toFixed(2)}</td>
                <td>
                  <div className="btn-group" role="group">
                    <Link to={`/adminbooks/edit/${book.bookID}`} className="btn btn-warning btn-sm me-1">
                      Edit
                    </Link>
                    <button 
                      onClick={() => handleDelete(book.bookID)} 
                      className="btn btn-danger btn-sm"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminBooks; 