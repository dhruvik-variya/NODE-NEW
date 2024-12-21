const { default: mongoose } = require("mongoose");

const productmodel = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
});

const Product = mongoose.model("Product", productmodel);

module.exports = Product;
