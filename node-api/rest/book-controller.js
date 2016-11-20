const bookSchema = require('../db/book-schema');

class BookController {

  constructor(Book) {
    this.Book = Book;
  }

  find(req, res, next) {
    return this.Book.find(req.query)
      .then(collection => {
        let view = [];
        collection.forEach(function (book) {
          view.push({
            id: book.id,
            title: book.title ? book.title : "",
            author: book.author ? book.author : "",
            isbn: book.isbn ? book.isbn : ""
          })
        });
        res.status(200).json(view);
      })
      .catch(err => next(err));
  }

  create(req, res, next) {
    var errors = this._validateModel(req);

    if (errors) {
      this._handleValidationError(errors, res);
    } else {
      let book = new this.Book();
      book.title = req.body.title;
      book.author = req.body.author;
      book.isbn = req.body.isbn;

      book.save()
        .then(doc => {
          res.status(201).json({
            id: doc.id,
            title: doc.title,
            author: doc.author,
            isbn: doc.isbn
          })
        })
        .catch(err => next(err));
    }
  }

  update(req, res, next) {
    var errors = this._validateModel(req);

    if (errors) {
      this._handleValidationError(errors, res);
    } else {
      const conditions = { _id: req.params.id };

      this.Book.update(conditions, {
        title: req.body.title,
        author: req.body.author,
        isbn: req.body.isbn
      })
        .then(doc => {
          if (!doc) { return res.status(404).end(); }
          return res.status(200).json({
            id: doc.id,
            title: doc.title,
            author: doc.author,
            isbn: doc.isbn
          });
        })
        .catch(err => next(err));
    }
  }

  remove(req, res, next) {
    this.Book.findByIdAndRemove(req.params.id)
      .then(doc => {
        if (!doc) { return res.status(404).end(); }
        return res.status(204).end();
      })
      .catch(err => next(err));
  }

  _validateModel(req) {
    req.checkBody("title", "Invalid Title").isLength({ min: 3, max: 60 });
    req.checkBody("author", "Invalid Author").isLength({ min: 3, max: 60 });
    req.checkBody("isbn", "Invalid Isbn").isISBN();

    return req.validationErrors();
  }

  _handleValidationError(errors, res) {
    let errorView = [];
    errors.forEach(error => {
      errorView.push({
        errorMessage: error.msg
      })
    })
    res.status(400).send(errorView);
  }

}



module.exports = new BookController(bookSchema);
