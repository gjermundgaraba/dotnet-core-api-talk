using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using WebAPIApplication.DataAccess;

namespace WebAPIApplication.Controllers
{
    [Route("api/[controller]")]
    public class BookController : Controller
    {
        [HttpGet]
        public List<JsonBook> Get()
        {
            MongoAccess da = new MongoAccess();
            IEnumerable<Book> booksFromDb = da.GetBooks();

            List<JsonBook> jsonBooks = new List<JsonBook>();

            foreach (Book book in booksFromDb)
            {
                jsonBooks.Add(dbBookToJsonBook(book));
            }

            return jsonBooks;
        }

        [HttpGet("{id}")]
        public JsonBook Get(string id)
        {
            MongoAccess da = new MongoAccess();
            Book dbBook = da.GetBook(id);

            return dbBookToJsonBook(dbBook);
        }

        [HttpPost]
        public void Post([FromBody]JsonBook jsonBook)
        {
            MongoAccess da = new MongoAccess();
            Book dbBook = jsonBookToDbBook(jsonBook);
            
            da.Create(dbBook);
        }

        [HttpPut("{id}")]
        public void Put(string id, [FromBody]JsonBook jsonBook)
        {
            MongoAccess da = new MongoAccess();
            Book dbBook = jsonBookToDbBook(jsonBook);

            da.Update(id, dbBook);
        }

        [HttpDelete("{id}")]
        public void Delete(string id)
        {
            MongoAccess da = new MongoAccess();

            da.Remove(id);
        }

        private JsonBook dbBookToJsonBook(Book dbBook)
        {
            JsonBook jsonBook = new JsonBook();
            jsonBook.Id = dbBook.Id.ToString();
            jsonBook.author = dbBook.author;
            jsonBook.Title = dbBook.Title;
            jsonBook.isbn = dbBook.isbn;

            return jsonBook;
        }

        private Book jsonBookToDbBook(JsonBook jsonBook) {
            Book dbBook = new Book();

            dbBook.author = jsonBook.author;
            dbBook.Title = jsonBook.Title;
            dbBook.isbn = jsonBook.isbn;

            return dbBook;
        }
    }
}
