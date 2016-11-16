package server.data;

import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface BookRepository extends MongoRepository<Book, String> {

    List<Book> findAll();
    Book findById(String id);
    Book save(Book book);
    void delete(String id);

}
