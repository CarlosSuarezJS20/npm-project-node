const Products = require("../models/product");

exports.getOrdersPage = (req, res) => {
  res.render("shop/orders", {
    prods: [],
    pageTitle: "Your orders",
    path: "/orders",
  });
};

exports.getCheckout = (req, res) => {
  res.render("shop/checkout", {
    prods: [],
    pageTitle: "checkout",
    path: "/checkout",
  });
};

exports.getCart = (req, res) => {
  res.render("shop/cart", {
    prods: [],
    pageTitle: "My Cart",
    path: "/cart",
    hasProductsInCart: false,
  });
};

exports.getProducts = (req, res) => {
  // res.sendFile(path.join(rootDir, "views", "shop.html"));
  // const productArray = Products.fetchAll();
  // console.log(productArray);
  // res.render("shop", {
  //   prods: productArray,
  //   pageTitle: "Book Shop",
  //   path: "/",
  // });
  Products.fetchAll((prodsArray) => {
    res.render("shop/products-list", {
      prods: prodsArray,
      pageTitle: "Products page",
      path: "/products",
      hasProducts: prodsArray.length > 0,
      activeShop: true,
      productCss: true,
    });
  });
};

exports.getIndex = (req, res) => {
  Products.fetchAll((prodsArray) => {
    res.render("shop/products-list", {
      prods: prodsArray,
      pageTitle: "Home",
      path: "/",
      hasProducts: prodsArray.length > 0,
      activeShop: true,
      productCss: true,
    });
  });
};
