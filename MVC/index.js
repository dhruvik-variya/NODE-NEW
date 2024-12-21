const express = require("express");
const router = require("./routes/product.route");
const dbconnect = require("./Config/db");

const Products = express();

Products.use(express.json());


Products.use("/products",router)
const PORT = process.env.PORT || 5001;

Products.listen(PORT, () => {
  console.log(`Server Running On ${PORT}`);
  dbconnect();
});
