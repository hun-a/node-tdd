const app = require('../');
const port =3000;
const syncDb = require('./sync-db');

syncDb().then(_ => {
  console.log('Sync database!');
  app.listen(port, () => {
    console.log(`SERVER is running on ${port}`);
  });
});


