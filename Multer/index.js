const express = require('express');
const path = require('path');
const upload = require('./Utils/image.Upload');
const app = express();

app.use("/uploads", express.static(path.join(__dirname,"uploads")));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, `view/index.html`));
})


app.post('/', upload.single("img"), (req, res) => {
    console.log(req.file);
    res.send("image successfully uploaded !!");
})


app.listen(5000,()=>{
    console.log('Server is running on port 5000');
})