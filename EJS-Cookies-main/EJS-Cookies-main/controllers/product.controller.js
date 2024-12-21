const Product = require("../model/product.model");

const productPage = (req, res) => {
  res.render("product");
};

const createProduct = async (req, res) => {
  const { title, price } = req.body;
  console.log(req.body);

  const product = await Product.create({ title, price });

  res.json({ message: "Product created Sucessfully!", product: product });
};

module.exports = {
  productPage,
  createProduct,
};
