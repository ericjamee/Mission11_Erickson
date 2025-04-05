import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { fetchCategories, fetchBookById, addBook, updateBook } from '../api/ProjectsAPI';
import { Book } from '../types/Book';

interface FormErrors {
  [key: string]: string;
}

const BookForm = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isEditing = id !== undefined;

  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [book, setBook] = useState<Book>({
    bookID: 0,
    title: '',
    author: '',
    publisher: '',
    isbn: '',
    classification: '',
    category: '',
    pageCount: 0,
    price: 0
  });

  useEffect(() => {
    // Fetch categories and book data if editing
    const loadData = async () => {
      try {
        // Load categories
        const categoriesData = await fetchCategories();
        setCategories(categoriesData);
        
        // Load book data if editing
        if (isEditing && id) {
          setLoading(true);
          try {
            const bookData = await fetchBookById(id);
            setBook(bookData);
          } finally {
            setLoading(false);
          }
        }
      } catch (err) {
        console.error('Error loading data:', err);
      }
    };
    
    loadData();
  }, [id, isEditing]);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    
    if (!book.title.trim()) newErrors.title = 'Title is required';
    if (!book.author.trim()) newErrors.author = 'Author is required';
    if (!book.publisher.trim()) newErrors.publisher = 'Publisher is required';
    if (!book.isbn.trim()) newErrors.isbn = 'ISBN is required';
    if (!book.classification.trim()) newErrors.classification = 'Classification is required';
    if (!book.category.trim()) newErrors.category = 'Category is required';
    if (book.pageCount <= 0) newErrors.pageCount = 'Valid page count is required';
    if (book.price <= 0) newErrors.price = 'Valid price is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    let parsedValue: string | number = value;
    
    // Convert numeric fields to numbers
    if (name === 'pageCount' || name === 'price') {
      parsedValue = value === '' ? 0 : parseFloat(value);
    }
    
    setBook(prev => ({ ...prev, [name]: parsedValue }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setLoading(true);
    try {
      if (isEditing && id) {
        await updateBook(id, book);
      } else {
        await addBook(book);
      }
      
      // Redirect to admin books page after successful operation
      navigate('/adminbooks');
      
    } catch (err) {
      console.error('Error saving book:', err);
      alert('Failed to save book. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (loading && isEditing) {
    return <div className="container mt-4">Loading book data...</div>;
  }

  return (
    <div className="container mt-4">
      <h1>{isEditing ? 'Edit Book' : 'Add New Book'}</h1>
      
      <Link to="/adminbooks" className="btn btn-secondary mb-3">
        Back to Book List
      </Link>
      
      <form onSubmit={handleSubmit} className="card p-4 bg-light">
        <div className="mb-3">
          <label htmlFor="title" className="form-label">Title</label>
          <input
            type="text"
            className={`form-control ${errors.title ? 'is-invalid' : ''}`}
            id="title"
            name="title"
            value={book.title}
            onChange={handleInputChange}
          />
          {errors.title && <div className="invalid-feedback">{errors.title}</div>}
        </div>
        
        <div className="mb-3">
          <label htmlFor="author" className="form-label">Author</label>
          <input
            type="text"
            className={`form-control ${errors.author ? 'is-invalid' : ''}`}
            id="author"
            name="author"
            value={book.author}
            onChange={handleInputChange}
          />
          {errors.author && <div className="invalid-feedback">{errors.author}</div>}
        </div>
        
        <div className="mb-3">
          <label htmlFor="publisher" className="form-label">Publisher</label>
          <input
            type="text"
            className={`form-control ${errors.publisher ? 'is-invalid' : ''}`}
            id="publisher"
            name="publisher"
            value={book.publisher}
            onChange={handleInputChange}
          />
          {errors.publisher && <div className="invalid-feedback">{errors.publisher}</div>}
        </div>
        
        <div className="mb-3">
          <label htmlFor="isbn" className="form-label">ISBN</label>
          <input
            type="text"
            className={`form-control ${errors.isbn ? 'is-invalid' : ''}`}
            id="isbn"
            name="isbn"
            value={book.isbn}
            onChange={handleInputChange}
          />
          {errors.isbn && <div className="invalid-feedback">{errors.isbn}</div>}
        </div>
        
        <div className="mb-3">
          <label htmlFor="classification" className="form-label">Classification</label>
          <input
            type="text"
            className={`form-control ${errors.classification ? 'is-invalid' : ''}`}
            id="classification"
            name="classification"
            value={book.classification}
            onChange={handleInputChange}
          />
          {errors.classification && <div className="invalid-feedback">{errors.classification}</div>}
        </div>
        
        <div className="mb-3">
          <label htmlFor="category" className="form-label">Category</label>
          <select
            className={`form-select ${errors.category ? 'is-invalid' : ''}`}
            id="category"
            name="category"
            value={book.category}
            onChange={handleInputChange}
          >
            <option value="">Select a category</option>
            {categories.map((category, index) => (
              <option key={index} value={category}>{category}</option>
            ))}
          </select>
          {errors.category && <div className="invalid-feedback">{errors.category}</div>}
        </div>
        
        <div className="mb-3">
          <label htmlFor="pageCount" className="form-label">Page Count</label>
          <input
            type="number"
            className={`form-control ${errors.pageCount ? 'is-invalid' : ''}`}
            id="pageCount"
            name="pageCount"
            value={book.pageCount || ''}
            onChange={handleInputChange}
            min="1"
          />
          {errors.pageCount && <div className="invalid-feedback">{errors.pageCount}</div>}
        </div>
        
        <div className="mb-3">
          <label htmlFor="price" className="form-label">Price</label>
          <div className="input-group">
            <span className="input-group-text">$</span>
            <input
              type="number"
              className={`form-control ${errors.price ? 'is-invalid' : ''}`}
              id="price"
              name="price"
              value={book.price || ''}
              onChange={handleInputChange}
              min="0.01"
              step="0.01"
            />
            {errors.price && <div className="invalid-feedback">{errors.price}</div>}
          </div>
        </div>
        
        <div className="d-grid gap-2">
          <button 
            type="submit" 
            className="btn btn-primary" 
            disabled={loading}
          >
            {loading ? 'Saving...' : 'Save Book'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default BookForm; 