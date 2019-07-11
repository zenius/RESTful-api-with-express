const express = require('express');
const Book = require('../models/book-model');

const bookRoutes = express.Router();

bookRoutes.route('/books')
  .get((req, res) => {
    Book.find((err, books) => {
      if (err) {
        res.send(err);
      }
      return res.json(books);
    });
  });

module.exports = bookRoutes;
