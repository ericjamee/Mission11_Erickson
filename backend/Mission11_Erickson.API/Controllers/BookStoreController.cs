using Microsoft.AspNetCore.Mvc;
using Mission11_Erickson.API.Data;

namespace Mission11_Erickson.API.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class BookStoreController : ControllerBase
    {
        private BookStoreDbContext _bookContext;
        public BookStoreController(BookStoreDbContext temp) => _bookContext = temp;

        [HttpGet("AllBooks")]
        public IActionResult GetBooks(int pageSize = 5, int pageNum = 1, string sortOrder = "asc")
        {
            IQueryable<Book> query = _bookContext.Books;

            // Sorting by title
            if (sortOrder == "desc")
            {
                query = query.OrderByDescending(b => b.Title);
            }
            else
            {
                query = query.OrderBy(b => b.Title);
            }

            var books = query
                .Skip((pageNum - 1) * pageSize)
                .Take(pageSize)
                .ToList();

            var totalNumBooks = _bookContext.Books.Count();

            var response = new
            {
                Books = books,
                TotalNumBooks = totalNumBooks
            };

            return Ok(response);
        }

    }
}
