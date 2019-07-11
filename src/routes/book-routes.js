const express = require('express');
const Book = require('../models/book-model');

const bookRoutes = express.Router();

// get all books +  filter by books property
bookRoutes.route('/books')
  .get((req, res) => {
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
  });


module.exports = bookRoutes;
