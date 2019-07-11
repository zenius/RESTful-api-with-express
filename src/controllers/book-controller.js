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
      res.send(err);
    }
    return res.send(books);
  });
};

// get book by Id
bookController.getBookById = (req, res) => {
  const { id } = req.params;
  Book.findById(id, (err, book) => {
    if (err) {
      res.send(err);
    }
    return res.send(book);
  });
};

module.exports = bookController;
