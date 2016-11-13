using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using WebAPIApplication.DataAccess;

namespace WebAPIApplication.Controllers
{
    [Route("api/[controller]")]
    public class BookController : Controller
    {
        private readonly IBookRepository _bookRepsitory;
        public BookController(IBookRepository bookRepository)
        {
            _bookRepsitory = bookRepository;
        }

        [HttpGet]
        public List<BookView> Get()
        {
            IEnumerable<Book> booksFromDb = _bookRepsitory.GetBooks();

            List<BookView> bookViews = new List<BookView>();

            foreach (Book book in booksFromDb)
            {
                bookViews.Add(bookToBookView(book));
            }

            return bookViews;
        }

        [HttpGet("{id}")]
        public BookView Get(string id)
        {
            Book book = _bookRepsitory.GetBook(id);

            return bookToBookView(book);
        }

        [HttpPost]
        public void Post([FromBody]BookView bookView)
        {
            Book book = bookViewToBook(bookView);

            _bookRepsitory.Create(book);
        }

        [HttpPut("{id}")]
        public void Put(string id, [FromBody]BookView bookView)
        {
            Book book = bookViewToBook(bookView);

            _bookRepsitory.Update(id, book);
        }

        [HttpDelete("{id}")]
        public void Delete(string id)
        {
            _bookRepsitory.Remove(id);
        }

        private BookView bookToBookView(Book dbBook)
        {
            BookView bookView = new BookView();
            bookView.Id = dbBook.Id.ToString();
            bookView.author = dbBook.author;
            bookView.Title = dbBook.Title;
            bookView.isbn = dbBook.isbn;

            return bookView;
        }

        private Book bookViewToBook(BookView bookView)
        {
            Book dbBook = new Book();

            dbBook.author = bookView.author;
            dbBook.Title = bookView.Title;
            dbBook.isbn = bookView.isbn;

            return dbBook;
        }
    }
}
