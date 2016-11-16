package server.books;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import server.data.Book;
import server.data.BookRepository;

import java.util.ArrayList;
import java.util.List;

import static org.springframework.web.bind.annotation.RequestMethod.*;

@RestController
@CrossOrigin
public class BookController {

    @Autowired
    private BookRepository bookRepository;

    @RequestMapping(method = GET, value = "/api/books")
    public List<BookView> getBooks() {
        List<BookView> bookViews = new ArrayList<>();
        List<Book> booksFromRepo = bookRepository.findAll();
        for (Book book : booksFromRepo) {
            bookViews.add(bookToBookView(book));
        }

        return bookViews;
    }

    @RequestMapping(method = POST, value = "/api/books")
    public BookView createBook(@RequestBody BookView bookView) {
        Book book = bookRepository.save(bookViewToBook(bookView));

        return bookToBookView(book);
    }

    @RequestMapping(method = PUT, value = "/api/books/{bookId}")
    public BookView updateBook(@PathVariable("bookId") String bookId, @RequestBody BookView bookView) {
        Book book = bookRepository.findById(bookId);

        book.setTitle(bookView.getTitle());
        book.setAuthor(bookView.getAuthor());
        book.setIsbn(bookView.getIsbn());

        Book updatedBook = bookRepository.save(book);

        return bookToBookView(updatedBook);
    }

    @RequestMapping(method = DELETE, value = "/api/books/{bookId}")
    public void deleteBook(@PathVariable String bookId) {
        bookRepository.delete(bookId);
    }



    private BookView bookToBookView(Book book) {
        BookView bookView = new BookView();

        bookView.setId(book.getId());
        bookView.setTitle(book.getTitle());
        bookView.setAuthor(book.getAuthor());
        bookView.setIsbn(book.getIsbn());

        return bookView;
    }

    private Book bookViewToBook(BookView bookView) {
        Book book = new Book();

        book.setId(bookView.getId());
        book.setTitle(bookView.getTitle());
        book.setAuthor(bookView.getAuthor());
        book.setIsbn(bookView.getIsbn());

        return book;
    }
}