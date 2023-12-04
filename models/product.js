// const products = [];
const fs = require("fs");

const path = require("path");
const getProductsFromFile = require("../util/getProductsFile");

const rootDir = require("../util/path");
const Cart = require("./cart");

const p = path.join(rootDir, "data", "products.json");

module.exports = class product {
  constructor(productId, title, imageURL, description, price) {
    this.id = productId !== undefined ? productId : null;
    this.title = title;
    this.imageUrl = imageURL;
    this.description = description;
    this.price = price;
  }

  static deleteById(productId) {
    getProductsFromFile(p, (prods) => {
      const currentProducts = [...prods];
      const deletedProduct = currentProducts.find(
        (prod) => prod.id === productId
      );
      const deletingProductIndex = currentProducts.findIndex(
        (prod) => prod.id === productId
      );
      currentProducts.splice(deletingProductIndex, 1);
      fs.writeFile(p, JSON.stringify(currentProducts), (err) => {
        if (!err) {
          Cart.getCart((cart) => {
            const { products: cartProducts, totalPrice } = cart;
            const productExistInCart = cartProducts.find(
              (prod) => prod.productId === productId
            );
            if (productExistInCart) {
              Cart.deleteProductFromCart(productId, deletedProduct.price);
            } else {
              return;
            }
          });
        }
      });
    });
  }

  edit() {
    getProductsFromFile(p, (prods) => {
      const currentProducts = [...prods];
      const editingProductPosition = prods.findIndex(
        (prod) => prod.id == this.id
      );

      currentProducts[editingProductPosition] = this;
      fs.writeFile(p, JSON.stringify(currentProducts), (err) => {
        console.log(err);
      });
    });
  }

  save() {
    // products.push(this);
    getProductsFromFile(p, (prods) => {
      this.id = (this.title + Math.random().toString()).trim();
      prods.push(this);
      fs.writeFile(p, JSON.stringify(prods), (err) => {
        console.log(err);
      });
    });
    // replaced by helper function above:
    // fs.readFile(p, (err, fileContent) => {
    //   let products = [];

    //   if (!err) {
    //     products = JSON.parse(fileContent);
    //   }

    // products.push(this);
    // fs.writeFile(p, JSON.stringify(products), (err) => {
    //   console.log(err);
    // });
  }

  static fetchProductById(id, cb) {
    getProductsFromFile(p, (products) => {
      const selectedProduct = products.find((prod) => prod.id === id);
      cb(selectedProduct);
    });
  }

  static fetchAll(cb) {
    getProductsFromFile(p, cb);
    // const p = path.join(rootDir, "data", "products.json");

    // fs.readFile(p, (err, fileContent) => {
    //     if (err) {
    //       return cb([]);
    //     }

    //     cb(JSON.parse(fileContent));
    //   });
  }
};
