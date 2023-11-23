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
  constructor(t) {
    this.title = t;
  }

  save() {
    // products.push(this);
    getProductsFromFile((prods) => {
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
