const express = require("express");
const path = require("path");
const rootDir = require("./util/path");

const bodyParser = require("body-parser");

const adminData = require("./routes/admin");
const shopRoutes = require("./routes/shop");

const app = express();

// globally available with set
app.set("view engine", "ejs");
app.set("views", "views");

// middleware for parsing body from request
app.use(bodyParser.urlencoded({ extended: false }));

//read access
app.use(express.static(path.join(__dirname, "public")));

// considers the routes from the admin file
app.use("/admin", adminData.routes);
app.use("/", shopRoutes);

app.use((req, res) => {
  // chaining
  // res.status(404).sendFile(path.join(rootDir, "views", "no-page-found.html"));
  res.status(404).render("no-page-Found", { pageTitle: "Page Not Found" });
});

app.listen(3000, () => {
  console.log("Server in port 3000");
});
