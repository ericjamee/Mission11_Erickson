import { useState, useEffect } from 'react';
import { Book } from './types/Book';
import 'bootstrap/dist/css/bootstrap.min.css';

function ProjectList() {
    const [books, setBooks] = useState<Book[]>([]);
    const [pageSize, setPageSize] = useState<number>(5);
    const [pageNum, setPageNum] = useState<number>(1);
    const [totalItems, setTotalItems] = useState<number>(0);
    const [totalPages, setTotalPages] = useState<number>(0);
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');


    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const response = await fetch(`https://localhost:5000/Bookstore/AllBooks??pagesize=${pageSize}&pageNum=${pageNum}&sortOrder=${sortOrder}`);
                if (!response.ok) throw new Error("Failed to fetch data");
                const data = await response.json();
                setBooks(data.books);
                setTotalItems(data.totalNumBooks);
                setTotalPages(Math.ceil(data.totalNumBooks / pageSize));
            } catch (error) {
                console.error("Error fetching books:", error);
            }
        };

        fetchBooks();
    }, [pageSize, pageNum, sortOrder]);

    return (
        <div className="container mt-4">
            <h1 className="text-center">📚 Bookstore</h1>
            <div className="text-center mb-3">
                <button className="btn btn-outline-secondary" onClick={() => {
                    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
                    setPageNum(1); // Reset to first page when sorting changes
                }}>
                    Sort by Title ({sortOrder === 'asc' ? 'A → Z' : 'Z → A'})
                </button>
            </div>

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
