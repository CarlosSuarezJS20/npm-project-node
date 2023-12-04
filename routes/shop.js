const express = require("express");
// const rootDir = require("../util/path");
// const path = require("path");
// const adminData = require("./admin");
const shopControllers = require("../controllers/shop");

const shopRouter = express.Router();

shopRouter.get("/orders", shopControllers.getOrdersPage);

shopRouter.get("/checkout", shopControllers.getCheckout);

shopRouter.post("/delete-cart-product", shopControllers.postDeleteCartItemById);

shopRouter.post("/cart", shopControllers.postAddCart);

shopRouter.get("/cart", shopControllers.getCart);

shopRouter.get("/products", shopControllers.getProducts);

shopRouter.get(
  "/product-details/:product_id",
  shopControllers.getProductDetails
);

shopRouter.get("/", shopControllers.getIndex);

module.exports = shopRouter;
