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
    return res.status(200).json(books);
  });
};

// get book by Id
bookController.getBookById = (req, res, next) => {
  const { id } = req.params;
  Book.findById(id, (err, book) => {
    if (err) {
      // Bad Request
      return res.status(400).json(err);
    }

    if (book) {
      req.book = book;
      return next();
    }
    // book not found
    return res.status(404).json(book);
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

  book.save();

  // book update successful
  return res.json(book);
};

module.exports = bookController;
