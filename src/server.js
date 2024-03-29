const express = require('express');
const swaggerUi = require('swagger-ui-express');
const routes = require('./routes');
const cors = require('cors')
const app = express();

const swaggerDocs = require('./swagger.json');

const PORT = 3000;

app.use(express.json());
app.use(cors());
app.use(routes);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.listen(PORT, () => {
  console.log(`Listening on port`, PORT);
});
