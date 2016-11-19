using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using WebAPIApplication.DataAccess;

namespace WebAPIApplication.Controllers
{
    [Route("api/[controller]")]
    public class BooksController : Controller
    {
        private readonly IBookRepository _bookRepository;
        public BooksController(IBookRepository bookRepository)
        {
            _bookRepository = bookRepository;
        }

        [HttpGet]
        public List<BookView> Get()
        {
            IEnumerable<Book> booksFromDb = _bookRepository.GetBooks();

            List<BookView> bookViews = new List<BookView>();

            foreach (Book book in booksFromDb)
            {
                bookViews.Add(bookToBookView(book));
            }

            return bookViews;
        }

        [HttpPost]
        public IActionResult Post([FromBody]BookView bookView)
        {
            if (ModelState.IsValid)
            {
                Book book = bookViewToBook(bookView);

                Book savedBook = _bookRepository.Create(book);

                return new ObjectResult(bookToBookView(savedBook));
            }
            else
            {
                return handleModelStateError();
            }

        }

        [HttpPut("{id}")]
        public IActionResult Put(string id, [FromBody]BookView bookView)
        {
            if (ModelState.IsValid)
            {
                Book book = bookViewToBook(bookView);

                Book savedBook = _bookRepository.Update(id, book);

                return new ObjectResult(bookToBookView(savedBook));
            }
            else
            {
                return handleModelStateError();
            }

        }

        private IActionResult handleModelStateError()
        {
            List<ErrorView> listOfErrors = new List<ErrorView>();
            foreach (var modelError in ModelState)
            {
                string propertyName = modelError.Key;
                if (modelError.Value.Errors.Count > 0)
                {
                    ErrorView errorView = new ErrorView();
                    errorView.ErrorMessage = propertyName + " is not valid";
                    listOfErrors.Add(errorView);
                }
            }
            return new BadRequestObjectResult(listOfErrors);
        }

        [HttpDelete("{id}")]
        public void Delete(string id)
        {
            _bookRepository.Remove(id);
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
