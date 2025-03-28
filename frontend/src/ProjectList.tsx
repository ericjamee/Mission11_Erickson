import { useState, useEffect } from 'react';
import { Book } from './types/Book';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useCart } from './context/CartContext';
import CartSummary from './components/CartSummary';


function ProjectList() {
    const [books, setBooks] = useState<Book[]>([]);
    const [categories, setCategories] = useState<string[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<string>('');
    const [pageSize, setPageSize] = useState<number>(5);
    const [pageNum, setPageNum] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(0);
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
    const { addToCart } = useCart();


    // Fetch categories once
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await fetch(`https://localhost:5000/Bookstore/Categories`);
                if (!response.ok) throw new Error("Failed to fetch categories");
                const data = await response.json();
                setCategories(data);
            } catch (error) {
                console.error("Error fetching categories:", error);
            }
        };
        fetchCategories();
    }, []);

    // Fetch books whenever filters/pagination/sort change
    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const categoryQuery = selectedCategory ? `&category=${encodeURIComponent(selectedCategory)}` : '';
                const response = await fetch(`https://localhost:5000/Bookstore/AllBooks?pageSize=${pageSize}&pageNum=${pageNum}&sortOrder=${sortOrder}${categoryQuery}`);
                if (!response.ok) throw new Error("Failed to fetch data");
                const data = await response.json();
                setBooks(data.books);
                setTotalPages(Math.ceil(data.totalNumBooks / pageSize));
            } catch (error) {
                console.error("Error fetching books:", error);
            }
        };
        fetchBooks();
    }, [pageSize, pageNum, sortOrder, selectedCategory]);

    return (
        <div className="container mt-4">
            <h1 className="text-center">📚 Bookstore</h1>
            <CartSummary />

            {/* Category Filter */}
            <div className="row mb-3 justify-content-center">
                <div className="col-md-4">
                    <label className="form-label">Filter by Category:</label>
                    <select
                        className="form-select"
                        value={selectedCategory}
                        onChange={(e) => {
                            setSelectedCategory(e.target.value);
                            setPageNum(1); // Reset to first page when category changes
                        }}
                    >
                        <option value="">All Categories</option>
                        {categories.map((cat, idx) => (
                            <option key={idx} value={cat}>
                                {cat}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            {/* Sort Button */}
            <div className="text-center mb-3">
                <button className="btn btn-outline-secondary" onClick={() => {
                    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
                    setPageNum(1); // Reset to first page when sorting changes
                }}>
                    Sort by Title ({sortOrder === 'asc' ? 'A → Z' : 'Z → A'})
                </button>
            </div>

            {/* Book Cards */}
            <div className="row">
                {books.map((b) => (
                    <div className="col-md-4" key={b.bookID}>
                        <div className="card mb-3 shadow-sm">
                            <div className="card-body">
                                <h5 className="card-title">{b.title}</h5>
                                <p className="card-text"><strong>Author:</strong> {b.author}</p>
                                <p className="card-text"><strong>Publisher:</strong> {b.publisher}</p>
                                <p className="card-text"><strong>ISBN:</strong> {b.isbn}</p>
                                <p className="card-text"><strong>Category:</strong> {b.category}</p>
                                <p className="card-text"><strong>Pages:</strong> {b.pageCount}</p>
                                <p className="card-text"><strong>Price:</strong> ${b.price.toFixed(2)}</p>
                                <button className="btn btn-primary mt-2 w-100" onClick={() => addToCart(b)}>
                                    Add to Cart
                                </button>

                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Pagination Controls */}
            <div className="text-center">
                <button className="btn btn-secondary mx-1" disabled={pageNum === 1} onClick={() => setPageNum(pageNum - 1)}>← Previous</button>

                {[...Array(totalPages)].map((_, index) => (
                    <button key={index + 1} className={`btn mx-1 ${pageNum === (index + 1) ? "btn-primary" : "btn-outline-primary"}`} onClick={() => setPageNum(index + 1)}>
                        {index + 1}
                    </button>
                ))}

                <button className="btn btn-secondary mx-1" disabled={pageNum === totalPages} onClick={() => setPageNum(pageNum + 1)}>Next →</button>
            </div>

            <br />

            {/* Results Per Page */}
            <div className="text-center">
                <label className="form-label">
                    Results per page:
                    <select className="form-select d-inline w-auto mx-2" value={pageSize} onChange={(e) => {
                        setPageSize(Number(e.target.value));
                        setPageNum(1);
                    }}>
                        <option value="5">5</option>
                        <option value="10">10</option>
                        <option value="20">20</option>
                    </select>
                </label>
            </div>
        </div>
    );
}

export default ProjectList;
