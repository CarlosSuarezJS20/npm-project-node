const fs = require("fs");

getProductsFromFile = (path, cb) => {
  fs.readFile(path, (err, fileContent) => {
    if (err) {
      if (path.includes("cart")) {
        return cb({ products: [], totalPrice: 0 });
      }
      return cb([]);
    }

    cb(JSON.parse(fileContent));
  });
  // return products;
};

module.exports = getProductsFromFile;
