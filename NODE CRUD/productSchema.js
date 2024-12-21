const mongoose = require('mongoose')

// prosuct schema

const productSchema = new mongoose.Schema({
    title: String,
    price: Number,
    image: String
})

const Product=mongoose.model("Product", productSchema)

module.exports=Product;