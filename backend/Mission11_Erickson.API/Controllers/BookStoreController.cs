using Microsoft.AspNetCore.Mvc;
using Mission11_Erickson.API.Data;
using System.Linq;

namespace Mission11_Erickson.API.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class BookStoreController : ControllerBase
    {
        private BookStoreDbContext _bookContext;
        public BookStoreController(BookStoreDbContext temp)
        {
            _bookContext = temp;
        }

        // GET: /BookStore/AllBooks
        [HttpGet("AllBooks")]
        public IActionResult GetBooks(
            int pageSize = 5,
            int pageNum = 1,
            string sortOrder = "asc",
            string? category = null)
        {
            IQueryable<Book> query = _bookContext.Books;

            // Filter by category if provided
            if (!string.IsNullOrEmpty(category))
            {
                query = query.Where(b => b.Category == category);
            }

            // Sort alphabetically by Title
            if (sortOrder == "desc")
            {
                query = query.OrderByDescending(b => b.Title);
            }
            else
            {
                query = query.OrderBy(b => b.Title);
            }

            // Pagination
            var books = query
                .Skip((pageNum - 1) * pageSize)
                .Take(pageSize)
                .ToList();

            // Count after filtering
            var totalNumBooks = query.Count();

            var response = new
            {
                Books = books,
                TotalNumBooks = totalNumBooks
            };

            return Ok(response);
        }

        // GET: /BookStore/Categories
        [HttpGet("Categories")]
        public IActionResult GetCategories()
        {
            var categories = _bookContext.Books
                .Select(b => b.Category)
                .Distinct()
                .OrderBy(c => c)
                .ToList();

            return Ok(categories);
        }

        // GET: /BookStore/Book/5
        [HttpGet("Book/{id}")]
        public IActionResult GetBook(int id)
        {
            var book = _bookContext.Books.FirstOrDefault(b => b.BookID == id);
            
            if (book == null)
            {
                return NotFound();
            }
            
            return Ok(book);
        }

        // POST: /BookStore/AddBook
        [HttpPost("AddBook")]
        public IActionResult AddBook([FromBody] Book book)
        {
            if (ModelState.IsValid)
            {
                _bookContext.Books.Add(book);
                _bookContext.SaveChanges();
                
                return CreatedAtAction(nameof(GetBook), new { id = book.BookID }, book);
            }
            
            return BadRequest(ModelState);
        }

        // PUT: /BookStore/UpdateBook/5
        [HttpPut("UpdateBook/{id}")]
        public IActionResult UpdateBook(int id, [FromBody] Book book)
        {
            if (id != book.BookID)
            {
                return BadRequest();
            }

            if (ModelState.IsValid)
            {
                var existingBook = _bookContext.Books.FirstOrDefault(b => b.BookID == id);
                
                if (existingBook == null)
                {
                    return NotFound();
                }
                
                existingBook.Title = book.Title;
                existingBook.Author = book.Author;
                existingBook.Publisher = book.Publisher;
                existingBook.ISBN = book.ISBN;
                existingBook.Classification = book.Classification;
                existingBook.Category = book.Category;
                existingBook.PageCount = book.PageCount;
                existingBook.Price = book.Price;
                
                _bookContext.SaveChanges();
                
                return NoContent();
            }
            
            return BadRequest(ModelState);
        }

        // DELETE: /BookStore/DeleteBook/5
        [HttpDelete("DeleteBook/{id}")]
        public IActionResult DeleteBook(int id)
        {
            var book = _bookContext.Books.FirstOrDefault(b => b.BookID == id);
            
            if (book == null)
            {
                return NotFound();
            }
            
            _bookContext.Books.Remove(book);
            _bookContext.SaveChanges();
            
            return NoContent();
        }
    }
}
