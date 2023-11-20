const express = require("express");
const rootDir = require("../util/path");
const path = require("path");

const router = express.Router();

// const
const products = [];

router.get("/add-product", (req, res) => {
  // res.sendFile(path.join(rootDir, "views", "add-product.html"));
  res.render("add-product", {
    pageTitle: "Add Product",
    path: "/admin/add-product",
  });
});

router.post("/add-product", (req, res) => {
  const { title } = req.body;
  products.push({ title: title });

  res.status(200).redirect("/");
});

exports.routes = router;
exports.products = products;
