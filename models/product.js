// const products = [];
const fs = require("fs");
const path = require("path");

const rootDir = require("../util/path");

const p = path.join(rootDir, "data", "products.json");

const getProductsFromFile = (cb) => {
  // async
  fs.readFile(p, (err, fileContent) => {
    if (err) {
      return cb([]);
    }

    cb(JSON.parse(fileContent));
  });
  // return products;
};

module.exports = class product {
  constructor(title, imageURL, description, price) {
    this.title = title;
    this.imageUrl = imageURL;
    this.description = description;
    this.price = price;
  }

  delete() {}

  edit() {}

  save() {
    // products.push(this);
    getProductsFromFile((prods) => {
      console.log("here saving");
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
    getProductsFromFile((products) => {
      const selectedProduct = products.find((prod) => prod.id === id);
      cb(selectedProduct);
    });
  }

  static fetchAll(cb) {
    getProductsFromFile(cb);
    // const p = path.join(rootDir, "data", "products.json");

    // fs.readFile(p, (err, fileContent) => {
    //     if (err) {
    //       return cb([]);
    //     }

    //     cb(JSON.parse(fileContent));
    //   });
  }
};
