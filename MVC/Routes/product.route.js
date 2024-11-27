const { Router } = require("express");
const {
  getProduct,
  getProductById,
  updateProduct,
  createProduct,
  deleteProduct,
} = require("../Controllers/product.controller");

const router = Router();

router.get("/", getProduct);

router.get("/:id", getProductById);

router.patch("/:id", updateProduct);

router.post("/", createProduct);

router.delete("/:id", deleteProduct);

module.exports = router;
