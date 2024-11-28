const Product = require("../Models/product.schema")
require('dotenv').config();

const getallproduct=async(req,res)=>{
 try {
   let product=await Product.find()
   res.status(201).send(product)
 } catch (error) {
  console.status(500).log({error: error.message });
 }
}

const createproduct=async(req,res)=>{
 try {
   let product=await Product.create(req.body)
   res.status(201).send(product)
 } catch (error) {
  console.log({error: error.message });

 }
}

const getproductbyid=async(req,res)=>{
try {
    let {productid}=req.params
    let product=await Product.findById(productid)
    res.status(200).send(product)
} catch (error) {
  console.status(500).log({error: error.message });
}
}

const updateproduct=async(req,res)=>{
  try {
    let {productid}=req.params
  let product=await Product.findByIdAndUpdate(productid,req.body,{new:true})
   res.status(200).send(product)
  } catch (error) {
    console.status(500).log({error: error.message });
  }
}

const deleteproduct=async(req,res)=>{
  try {
    let {productid}=req.params
  let product=await Product.findByIdAndDelete(productid)
   res.status(200).send(product)
  } catch (error) {
    console.status(500).log({error: error.message });
  }
}

module.exports={getallproduct,createproduct,getproductbyid,updateproduct,deleteproduct}