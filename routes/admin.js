const express = require("express");
// const rootDir = require("../util/path");
// const path = require("path");
// different way to add a path
const adminController = require("../controllers/admin");

const router = express.Router();

router.get("/products", adminController.getAdminProducts);

router.get("/add-product", adminController.getAddProduct);

router.post("/add-product", adminController.postAddProduct);

module.exports = router;
// exports.routes = router;
// removed it because it doesn't live here but it is related to the previous class
// exports.products = products;
