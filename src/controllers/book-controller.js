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
      res.json(err);
    }
    return res.json(books);
  });
};

// get book by Id
bookController.getBookById = (req, res) => {
  const { id } = req.params;
  Book.findById(id, (err, book) => {
    if (err) {
      res.json(err);
    }
    return res.json(book);
  });
};

// add new book
bookController.addBook = (req, res) => {
  const book = new Book(req.body);

  book.save();

  // return the status code along with data
  return res.status(201).json(book);
};

module.exports = bookController;
