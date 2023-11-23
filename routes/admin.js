const express = require("express");
// const rootDir = require("../util/path");
// const path = require("path");
// different way to add a path
const productsController = require("../controllers/products");

const router = express.Router();

router.get("/products", productsController.getAdminProducts);

router.get("/add-product", productsController.getAddProduct);

router.post("/add-product", productsController.postAddProduct);

module.exports = router;
// exports.routes = router;
// removed it because it doesn't live here but it is related to the previous class
// exports.products = products;
