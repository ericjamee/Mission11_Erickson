using Microsoft.EntityFrameworkCore;
using Mission11_Erickson.API.Data;

namespace Mission11_Erickson.API.Data
{
    public class BookStoreDbContext : DbContext
    {
        public BookStoreDbContext(DbContextOptions<BookStoreDbContext> options) : base(options)
        {
        }

        public DbSet<Book> Books { get; set; }  // Changed from `Books` to `Book`
    }
}
