using System.ComponentModel.DataAnnotations;

namespace Mission11_Erickson.API.Data
{
    public class Book
    {
        [Key]
        public int BookID { get; set; } // Primary Key

        [Required]
        public string Title { get; set; } // Book Title

        [Required]
        public string Author { get; set; } // Author Name

        [Required]
        public string Publisher { get; set; } // Publisher

        [Required]
        public string ISBN { get; set; } // ISBN Number

        [Required]
        public string Classification { get; set; } // Added this field to match DB

        [Required]
        public string Category { get; set; } // Classification/Category

        [Required]
        public int PageCount { get; set; } // Changed from "NumberOfPages" to "PageCount"

        [Required]
        public decimal Price { get; set; } // Price
    }
}
