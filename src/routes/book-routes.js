const express = require('express');

const bookRoutes = express.Router();

bookRoutes.route('/books')
  .get((req, res) => {
    const response = { message: 'get response for books' };

    res.json(response);
  });

module.exports = bookRoutes;
