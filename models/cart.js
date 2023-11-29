const fs = require("fs");
const path = require("path");

const rootDir = require("../util/path");

const p = path.join(rootDir, "data", "cart.json");

module.exports = class Cart {
  static addProductToCart(id, productPrice) {
    let cart = { products: [], totalPrice: 0 };
    // Fetch previous cart
    fs.readFile(p, (err, fileContent) => {
      //if error cart does not exist
      if (!err) {
        cart = JSON.parse(fileContent);
      }
      // analyze cart

      const existingProductPosition = cart.products.findIndex(
        (prod) => prod.id === id
      );
      const existingProductDetails = cart.products[existingProductPosition];
      let updateProduct;
      //  if product is not in cart
      if (existingProductDetails) {
        updateProduct = { ...existingProductDetails };
        updateProduct.quantity = updateProduct.quantity + 1;
        // adding to the cart
        cart.products = [...cart.products];
        cart.products[existingProductPosition] = updateProduct;
      } else {
        updateProduct = { productId: id, quantity: 1 };
        cart.products = [...cart.products, updateProduct];
      }
      cart.totalPrice = cart.totalPrice + +productPrice;
      fs.writeFile(p, JSON.stringify(cart), (err) => console.log(err));
    });
    // return products;
  }

  // increase or decrease quantity
};
