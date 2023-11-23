const express = require("express");
const path = require("path");

const bodyParser = require("body-parser");

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");
const errorPageController = require("./controllers/error");

const app = express();

// globally available with set
app.set("view engine", "ejs");
app.set("views", "views");

// middleware for parsing body from request
app.use(bodyParser.urlencoded({ extended: false }));
// read json

//read access
app.use(express.static(path.join(__dirname, "public")));

// considers the routes from the admin file
app.use("/admin", adminRoutes);
app.use("/", shopRoutes);

// 400 error
app.use(errorPageController.get400ErrorPage);

app.listen(3000, () => {
  console.log("Server in port 3000");
});
