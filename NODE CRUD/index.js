const express= require("express")
const dbconnect = require("./db")
const Product = require("./productSchema")

const app = express()

app.use(express.json())

app.get("/", (req, res) => {
    res.send("Hello World")
})

// create new product
app.post("/product",async(req, res) => {
let data=await Product.create(req.body)
    res.send(data)
})

// all prodcuts

app.get("/products",async(req, res) => {
    let data=await Product.find()
    res.send(data);
})

// get prodcut by id
app.get("/products/:id",async(req, res) => {
    
    let {id}=req.params
    let data=await Product.findById(id)
    res.send(data)
})

// update the product

app.patch("/products/:id",async(req, res) => {
    let {id}=req.params
    let data=await Product.findByIdAndUpdate(id,req.body,
        // updated data stored
        {new:true}) 
        res.send(data)
})

// delete the product

app.delete("/products/:id",async(req, res) => {
    let {id}=req.params
    let data=await Product.findByIdAndDelete(id)
    res.send(data)
})

app.listen(5000,(req,res) => {
    console.log("Server is running on port 5000")
    dbconnect()
})