const express = require("express");
// const rootDir = require("../util/path");
// const path = require("path");
// different way to add a path
const adminController = require("../controllers/admin");

const router = express.Router();

router.get("/add-product", adminController.getAddProduct);

router.get("/products", adminController.getAdminProducts);

router.get("/edit-product/:productId", adminController.getEditProduct);

router.post("/add-product", adminController.postAddProduct);

router.post("/edit-product", adminController.postEditProductChanges);

router.post("/delete-product/:productId", adminController.postDeleteById);

module.exports = router;
// exports.routes = router;
// removed it because it doesn't live here but it is related to the previous class
// exports.products = products;
