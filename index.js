const express = require("express");
const bodyParser = require("body-parser");
const Route = require("./Views/ktpRoute");
const app = express();
const port = 8080;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(Route);

app.listen(port, () => {
  console.log(`Aplikasi berjalan di http://localhost:${port}`);
});
