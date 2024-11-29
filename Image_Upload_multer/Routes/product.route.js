const { Router } = require("express");
const {
  getallproduct,
  createproduct,
  updateproduct,
  getproductbyid,
  deleteproduct,
} = require("../Controllers/product.controller");

const router = Router();

router.get("/", getallproduct);

router.get("/:productid", getproductbyid);

router.patch("/:productid", updateproduct);

router.post("/", createproduct);

router.delete("/:productid", deleteproduct);

module.exports = router;
