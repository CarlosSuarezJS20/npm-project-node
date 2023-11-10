const express = require("express");
const path = require("path");
const rootDir = require("./util/path");

const bodyParser = require("body-parser");

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");

const app = express();

// middleware for parsing body from request
app.use(bodyParser.urlencoded({ extended: false }));

//read access
app.use(express.static(path.join(__dirname, "public")));

// considers the routes from the admin file
app.use("/admin", adminRoutes);
app.use("/", shopRoutes);

app.use((req, res, next) => {
  // chaining
  res.status(404).sendFile(path.join(rootDir, "views", "no-page-found.html"));
});

app.listen(3000, () => {
  console.log("Server in port 3000");
});
