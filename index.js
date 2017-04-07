const express = require('express');
const morgan = require('morgan');
const app = express();
const users = [
  {id:1, name: 'alice'},
  {id:2, name: 'bek'},
  {id:3, name: 'chris'}
];

app.use(morgan('dev'));

app.get('/users', (req, res) => {
  req.query.limit = req.query.limit || 10;
  const limit = parseInt(req.query.limit, 10);
  if (Number.isNaN(limit)) {
    return res.status(400).end();
  }
  res.json(users.slice(0, limit));
});

app.get('/users/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  const user = users.filter((user) => user.id === id)[0];
  console.log(user);
  res.json(user);
});

const port = 3000;
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

module.exports = app;
