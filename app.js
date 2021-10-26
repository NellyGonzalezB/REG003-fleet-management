const express = require('express');
const config = require('./config');
const routes = require('./routes');
const pkg = require('./package.json');

const { port, dbUrl, secret } = config;

const app = express();

app.set('config', config);
app.set('pkg', pkg);
// parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Registrar rutas
routes(app, (err) => {
  if (err) {
    throw err;
  }

  app.listen(port, () => {
    console.info(`App listening on port ${port}`);
  });
});

module.exports = app;