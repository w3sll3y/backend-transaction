const express = require('express');
const routes = require('./routes');
const cors = require('cors')
const app = express();


const PORT = 3000;

app.use(express.json());
app.use(cors());
app.use(routes);

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.listen(PORT, () => {
  console.log(`Listening on port`, PORT);
});