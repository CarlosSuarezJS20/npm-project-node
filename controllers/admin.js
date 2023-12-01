const Products = require("../models/product");

// add product controllers

exports.getAddProduct = (req, res) => {
  // res.sendFile(path.join(rootDir, "views", "add-product.html"));
  res.render("admin/edit-product", {
    pageTitle: "Add Product",
    path: "/admin/add-product",
    editing: false,
  });
};

exports.postAddProduct = (req, res) => {
  const { title, imageUrl, description, price } = req.body;
  const prod = new Products(title, imageUrl, description, price);
  prod.save();
  res.status(200).redirect("/");
};

// edit controllers

exports.postEditProductChanges = (req, res) => {
  const { productId, title, imageUrl, description, price } = req.body;

  const prod = new Products(productId, title, imageUrl, description, price);
  prod.edit();
  res.redirect("/admin/products");
};

exports.getEditProduct = (req, res) => {
  const prodId = req.params.productId;
  const editing = req.query.edit;

  // finding current product
  Products.fetchProductById(prodId, (product) => {
    if (!product) {
      return res.redirect("/");
    }
    res.render("admin/edit-product", {
      pageTitle: "Edit Product",
      path: "/admin/edit-product",
      editing: editing,
      prod: product,
    });
  });

  // res.sendFile(path.join(rootDir, "views", "add-product.html"));
};

// Delete Product

exports.postDeleteById = (req, res) => {
  const productId = req.params.productId;
  Products.delete(productId);
  res.status(200).redirect("/admin/products");
};

// Get ALL products

exports.getAdminProducts = (req, res) => {
  Products.fetchAll((prodsArray) => {
    res.render("admin/products", {
      prods: prodsArray,
      pageTitle: "Admin Products",
      path: "/admin/products",
    });
  });
};
