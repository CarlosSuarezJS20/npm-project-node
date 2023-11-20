const express = require("express");
// const rootDir = require("../util/path");
// const path = require("path");
const adminData = require("./admin");

const shopRouter = express.Router();

shopRouter.get("/", (req, res) => {
  const products = adminData.products;
  // res.sendFile(path.join(rootDir, "views", "shop.html"));
  res.render("shop", { prods: products, pageTitle: "Book Shop", path: "/" });
});

module.exports = shopRouter;
