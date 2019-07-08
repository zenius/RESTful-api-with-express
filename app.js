// require modules
const express = require('express');

const port = process.env.PORT || 3000;

const app = express();

// routes
app.get('/', (req, res) => {
  res.send('Welcome to RESTFul APIs build path');
});

app.listen(port, () => {
  console.log(`server listening at port ${port}`);
});
