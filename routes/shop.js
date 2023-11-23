const express = require("express");
// const rootDir = require("../util/path");
// const path = require("path");
// const adminData = require("./admin");
const shopControllers = require("../controllers/products");

const shopRouter = express.Router();

shopRouter.get("/cart", shopControllers.getCart);

shopRouter.get("/products", shopControllers.getProducts);

shopRouter.get("/", shopControllers.getShop);

module.exports = shopRouter;
