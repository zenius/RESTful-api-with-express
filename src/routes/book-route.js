const express = require('express');
const bookController = require('../controllers/book-controller');

const bookRoutes = express.Router();

bookRoutes.get('/books', bookController.getBooks);
bookRoutes.get('/books/:id', bookController.getBookById);

module.exports = bookRoutes;
