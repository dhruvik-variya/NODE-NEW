const express = require('express');
const db = require('./config/db');
const userRoute = require('./routes/UserRoute');

require("dotenv").config();

const app = express();
const port = process.env.PORT;

app.use(express.json());



app.get('/', (req,res)=>{
    res.send('welcome to the my website !');
})

app.use("/users",userRoute)



app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
    db();
  });