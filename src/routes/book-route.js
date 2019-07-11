const express = require('express');
const bookController = require('../controllers/book-controller');

const bookRoutes = express.Router();

bookRoutes.get('/books', bookController.getBooks);
// inserting middleware for the route '/books/:id'
bookRoutes.use('/books/:id', bookController.getBookById);
bookRoutes.get('/books/:id', (req, res) => { res.json(req.book); });
bookRoutes.post('/books', bookController.addBook);
bookRoutes.put('/books/:id', bookController.updateBook);
bookRoutes.patch('/books/:id', bookController.patchBook);

module.exports = bookRoutes;
