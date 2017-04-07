const express = require('express');
const morgan = require('morgan');
const app = express();
const user = [
  {id:1, name: 'alice'},
  {id:2, name: 'bek'},
  {id:3, name: 'chris'}
];

app.use(morgan('dev'));

app.get('/users', (req, res) => {
  res.json(user);
});

const port = 3000;
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
