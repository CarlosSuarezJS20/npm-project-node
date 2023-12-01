const fs = require("fs");
const path = require("path");
const getProductsFromFile = require("../util/getProductsFile");

const rootDir = require("../util/path");

const p = path.join(rootDir, "data", "cart.json");

module.exports = class Cart {
  static getCart(cb) {
    getProductsFromFile(p, cb);
  }

  static deleteProductFromCart(productId, price) {
    getProductsFromFile(p, (cart) => {
      const newCart = { products: [], totalPrice: 0 };
      if (cart.length === 0) {
        return;
      }

      let { products, totalPrice } = cart;
      const updatedCartProducts = [...products];
      const deletedItemIndex = updatedCartProducts.findIndex(
        (prod) => prod.productId === productId
      );
      const deletedProductDetails = updatedCartProducts[deletedItemIndex];
      const valueFromDeletedProductQuantity =
        deletedProductDetails.quantity * price;
      newCart.products = [
        ...updatedCartProducts.filter(
          (prod) => prod.productId !== deletedProductDetails.productId
        ),
      ];
      newCart.totalPrice = totalPrice - valueFromDeletedProductQuantity;
      fs.writeFile(p, JSON.stringify(newCart), (err) => console.log(err));
    });
  }

  static addProductToCart(id, productPrice) {
    let cart = { products: [], totalPrice: 0 };
    // Fetch previous cart
    fs.readFile(p, (err, fileContent) => {
      let updateProduct;
      //if error cart does not exist
      if (!err) {
        cart = JSON.parse(fileContent);
      }
      // analyze cart

      const existingProductPosition = cart.products.findIndex(
        (prod) => prod.productId === id
      );

      const existingProductDetails = cart.products[existingProductPosition];

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
