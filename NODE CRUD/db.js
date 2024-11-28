const mongoose = require('mongoose')    

const dbconnect=async () =>{
await mongoose.connect("mongodb://localhost:27017/product")
console.log("Connected to MongoDB");

}

module.exports=dbconnect;