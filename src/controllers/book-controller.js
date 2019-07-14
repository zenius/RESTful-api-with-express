/* eslint-disable no-param-reassign */

const Book = require('../models/book-model');

const bookController = {};

// get all books +  filter by books property
bookController.getBooks = (req, res) => {
  const query = {};
  const { genre } = req.query;

  if (genre) {
    query.genre = genre;
  }

  Book.find(query, (err, books) => {
    if (err) {
      // books not found: 404(NOT FOUND)
      return res.status(404).json(err);
    }

    // HATEOAS implementation
    // adding link to navigate to self
    const returnBooks = books.map((book) => {
      const newBook = book.toJSON();
      newBook.links = {};
      newBook.links.self = `http://${req.headers.host}/api/v1.0/books/${book._id}`;
      return newBook;
    });
    return res.status(200).json(returnBooks);
  });
};

// get book by Id
bookController.getBookById = (req, res, next) => {
  const { id } = req.params;
  Book.findById(id, (err, book) => {
    if (err) {
      // Bad Request
      return res.json(err);
    }

    if (book) {
      req.book = book;
      return next();
    }
    // book not found
    return res.sendStatus(404);
  });
};

// add new book
bookController.addBook = (req, res) => {
  const book = new Book(req.body);

  book.save();

  // book successfully created
  return res.status(201).json(book);
};

// update the existing book
bookController.updateBook = (req, res) => {
  const { book } = req;
  const {
    title, author, genre, read,
  } = req.body;

  book.title = title;
  book.author = author;
  book.genre = genre;
  book.read = read;

  book.save((err) => {
    if (err) {
      // Internal server error
      return res.status(500).json(err);
    }
    // book update successful
    return res.json(book);
  });
};

// update the specific property/properties of the book
bookController.patchBook = (req, res) => {
  const { book } = req;

  // remove the id of the book: prevent id from being updated
  // eslint-disable-next-line no-underscore-dangle
  if (req.body._id) {
    // eslint-disable-next-line no-underscore-dangle
    delete req.body._id;
  }

  // update the property/properties in the request body
  Object.entries(req.body).forEach((item) => {
    const [key, value] = item;
    book[key] = value;
  });

  book.save((err) => {
    if (err) {
      // Internal server error
      return res.json(err);
    }
    // book update successful
    return res.json(book);
  });
};

bookController.deleteBook = (req, res) => {
  const { book } = req;

  book.remove((err) => {
    if (err) {
      return res.json(err);
    }
    // book deleted successfully : 204(No-Content)
    return res.sendStatus(204);
  });
};

module.exports = bookController;
