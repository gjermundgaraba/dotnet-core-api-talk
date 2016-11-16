
using System.Collections.Generic;

namespace WebAPIApplication.DataAccess
{
    public interface IBookRepository
    {
        IEnumerable<Book> GetBooks();
        Book GetBook(string id);
        Book Create(Book p);
        Book Update(string id, Book p);
        void Remove(string id);
    }
}