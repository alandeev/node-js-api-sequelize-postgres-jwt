const express = require('express');

const routes = require('./routes');

require('./database/');

const app = express();

app.use(express.json());

app.use('/api', routes);

app.listen(3333, async () => {
  console.log("Server started on port 3333");
})
