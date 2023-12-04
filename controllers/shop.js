const Products = require("../models/product");
const Cart = require("../models/cart");

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

exports.postAddCart = (req, res) => {
  const { productId } = req.body;
  Products.fetchProductById(productId, (prod) => {
    Cart.addProductToCart(productId, prod.price);

    res.status(200).redirect("/");
  });
};

exports.postDeleteCartItemById = (req, res) => {
  console.log("here");
  const { prodId } = req.body;
  Products.fetchProductById(prodId, (prod) => {
    Cart.deleteProductFromCart(prodId, prod.price);
    res.status(200).redirect("/");
  });
};

exports.getCart = (req, res) => {
  Cart.getCart((cart) => {
    const { products: cartProducts, totalPrice } = cart;
    Products.fetchAll((prods) => {
      const productsForCart = [];
      for (let product of prods) {
        const productInCart = cartProducts.find(
          (prod) => prod.productId === product.id
        );
        if (productInCart) {
          productsForCart.push({
            product_data: product,
            quantity: productInCart.quantity,
          });
        }
      }

      res.render("shop/cart", {
        prods: productsForCart,
        total: totalPrice,
        pageTitle: "My Cart",
        path: "/cart",
        hasProductsInCart: false,
      });
    });
  });
};

exports.getProductDetails = (req, res) => {
  const productId = req.params.product_id;
  Products.fetchProductById(productId, (prod) => {
    res.render("shop/product-details", {
      product: prod,
      pageTitle: prod.title,
      path: "/products",
    });
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
    res.render("shop/product-list", {
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
    res.render("shop/product-list", {
      prods: prodsArray,
      pageTitle: "Home",
      path: "/",
      hasProducts: prodsArray.length > 0,
      activeShop: true,
      productCss: true,
    });
  });
};
