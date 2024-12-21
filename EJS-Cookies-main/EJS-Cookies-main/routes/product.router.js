const {
  productPage,
  createProduct,
} = require("../controllers/product.controller");
const isLogin = require("../middlewares/isLogin");

const productRouter = require("express").Router();

//pages
productRouter.get("/", isLogin, productPage);

//logic
productRouter.post("/", createProduct);

module.exports = productRouter;
