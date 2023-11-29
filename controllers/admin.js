const Products = require("../models/product");

exports.getAddProduct = (req, res) => {
  // res.sendFile(path.join(rootDir, "views", "add-product.html"));
  res.render("admin/add-product", {
    pageTitle: "Add Product",
    path: "/admin/add-product",
  });
};

exports.postAddProduct = (req, res) => {
  const { title, imageUrl, description, price } = req.body;
  const prod = new Products(title, imageUrl, description, price);
  prod.save();
  res.status(200).redirect("/");
};

// Get Admin products

exports.getAdminProducts = (req, res) => {
  Products.fetchAll((prodsArray) => {
    res.render("admin/products", {
      prods: prodsArray,
      pageTitle: "Admin Products",
      path: "/admin/products",
      hasProducts: prodsArray.length > 0,
      activeShop: true,
      productCss: true,
    });
  });
};
