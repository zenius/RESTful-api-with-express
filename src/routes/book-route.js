const express = require('express');
const bookController = require('../controllers/book-controller');

const bookRoutes = express.Router();

bookRoutes.get('/books', bookController.getBooks);
// inserting middleware for the route '/books/:id'
bookRoutes.use('/books/:id', bookController.getBookById);
bookRoutes.get('/books/:id', (req, res) => {
  const returnBook = req.book.toJSON();
  // fixing space issue for query string
  const genre = encodeURIComponent(req.book.genre);
  returnBook.links = {};
  returnBook.links.filterByGenre = `http://${req.headers.host}/api/v1.0/books?genre=${genre}`;
  res.json(returnBook);
});
bookRoutes.post('/books', bookController.addBook);
bookRoutes.put('/books/:id', bookController.updateBook);
bookRoutes.patch('/books/:id', bookController.patchBook);
bookRoutes.delete('/books/:id', bookController.deleteBook);

module.exports = bookRoutes;
