const Blog = require("../model/BlogSchema")


const BlogPage=(req,res)=>{
    res.render("index")
}

const addBlogPage=(req,res)=>{
    res.render("addBlog")
}

const addBlog=async(req,res)=>{
try {
    req.body.author = req.cookies.username;
     const blogPost = await Blog.create(req.body);
     res.cookie("blogId", blogPost.id);
     res.send(`Blog created by ${req.cookies.username}`);

} catch (error) {
    res.status(500).send("Error creating blog"); 
}
}

const getAllBlogs=async(req, res)=>{
    try {
        let blog=await Blog.find()
        res.status(200).json(blog)
    } catch (error) {
        res.status(500).json({ message: "Error getting Blogs", error: error.message })
    }
}

const deleteBlog=async(req, res)=>{
    try{
        let {id}=req.params
        let blog=await Blog.findByIdAndDelete(id)
        res.status(200).json(blog)
    }
    catch(error){
        res.status(500).json({ message: "Error deleting blog", error: error.message })
    }
}

const updateBlog=async(req,res)=>{
    try{
        let {id}=req.params
        let blog=await Blog.findByIdAndUpdate(id,req.body,{new:true})
        res.send(blog)
    }
    catch(error){
        res.status(500).json({ message: "Error updating blog", error: error.message })
    }
}

const SingleBlog = async (req, res) => {
    try {
      const { id } = req.params;
      const singleBlog = await Blog.findById(id);
      if (!singleBlog) {
        return res.status(404).send("Blog not found");
      }
      res.render("singleBlog", { singleBlog });
    } catch (error) {
      res.status(500).send("Error getting blog");
    }
  };
  

// Search Blog
    

module.exports = { BlogPage, addBlogPage, addBlog, getAllBlogs, deleteBlog, updateBlog, SingleBlog };

