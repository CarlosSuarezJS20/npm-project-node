const express = require("express");

const app = express();

app.use((req, res, next) => {
  console.log("in the middleware");
  next(); //allows to pass to the next middleware!
}); //adds a middleware function

app.use((req, res, next) => {
  console.log("in second middleware");
  res.send("<h1>Hello from Express</h1>");
}); //adds a middleware function

app.listen(3000, () => {
  console.log("Server in port 3000");
});
