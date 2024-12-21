const express = require('express');
const mongoose = require('mongoose');

const app = express();
const PORT = 8090;

app.use(express.json());


const db=async()=>{
    mongoose.connect("mongodb://localhost:27017/book_store");
    console.log('Connected to MongoDB Atlas');
}  

const bookSchema = new mongoose.Schema({
  title: String,
  author: String,
  category: String,
  publicationYear: Number,
  price: Number,
  quantity: Number,
  description: String,
  imageUrl: String,
}, { timestamps: true });

const Book = mongoose.model('Book', bookSchema);


app.get('/', (req, res) => {
  res.send('welcome to the book store');
});

app.get('/books', async (req, res) => {
 
    const books = await Book.find();
    res.json(books);

});

const validateBookData = (req, res, next) => {
    const { title, author, category, publicationYear, price, quantity, description, imageUrl } = req.body;
    if (!title || !author || !category || !publicationYear || !price || !quantity || !description || !imageUrl) {
      return res.status(400).json({ message: 'All fields are required' });
    }
    next();
  };  

app.post('/books/addbooks', validateBookData, async (req, res) => {

   const books=await Book.create(req.body);
    res.status(200).json(books);
 
});

app.get('/books/book/:id', async (req, res) => {
    
        let {id}=req.params;
        const books=await Book.findById(id);
        res.status(200).json(books);
   
    });
    

app.patch('/books/update/:id', async (req, res) => {

    let {id}=req.params;
    let books=await Book.findByIdAndUpdate(id,req.body,{new:true});
    res.status(200).json(books);
 
});

app.delete('/books/delete/:id', async (req, res) => {
  
      const { id } = req.params;
      const deletedBook = await Book.findByIdAndDelete(id);
      res.status(200).json(deletedBook);
   
  });
  

  app.get('/books/filter', async (req, res) => {
   
      let { author, category, title, price } = req.query;
      let filter = {};
  
      if (author){
        filter.author = author;
      } 
      if (category) {
        filter.category = category;
      }
      if (title) {
        filter.title =title; 
      }
  
      let books = await Book.find(filter); 
  

      if (price == 'lth') {
        books = books.sort((a, b) => a.price - b.price); 
      } else if (price == 'htl') {
        books = books.sort((a,b) => b.price - a.price); 
      }
       res.status(200).json(books);
  
  
  });
  
  
  app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  db()
});