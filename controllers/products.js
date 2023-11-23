const Products = require("../models/product");

// Admin

exports.getAdminProducts = (req, res) => {
  res.render("admin/products", {
    prods: [],
    pageTitle: "Admin - Products",
    path: "admin/add-product",
  });
};

exports.getAddProduct = (req, res) => {
  // res.sendFile(path.join(rootDir, "views", "add-product.html"));
  res.render("admin/add-product", {
    pageTitle: "Add Product",
    path: "/admin/add-product",
  });
};

exports.postAddProduct = (req, res) => {
  const prod = new Products(req.body.title);
  prod.save();
  res.status(200).redirect("/");
};

// Shop

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

exports.getShop = (req, res) => {
  res.render("shop/", {
    pageTitle: "Welcome!",
    path: "/",
  });
};
