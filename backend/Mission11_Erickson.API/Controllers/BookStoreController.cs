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
    }
}
