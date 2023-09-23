const express = require("express");
const bodyParser = require("body-parser");
const RouteKtp = require("./Views/ktpRoute");
const RouteKK = require("./Views/kkRoute");
const RouteDetail_ktp = require("./Views/detail_ktpRoute");
const app = express();
const port = 8080;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(RouteKtp);
app.use(RouteKK);
app.use(RouteDetail_ktp);

app.listen(port, () => {
  console.log(`Aplikasi berjalan di http://localhost:${port}`);
});
