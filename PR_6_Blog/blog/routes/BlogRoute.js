const {Router}=require("express");
const { BlogPage, getAllBlogs, deleteBlog,  SingleBlog, addBlog, addBlogPage, updateBlog } = require("../controller/BlogController.js");
const isAdmin = require("../middleware/isAdmin.js");

const BlogRouter=Router();

BlogRouter.get("/create",isAdmin,addBlogPage)
BlogRouter.get("/",BlogPage)
BlogRouter.post("/create",isAdmin,addBlog)
BlogRouter.get("/blogs",getAllBlogs)
BlogRouter.delete("/delete/:id",isAdmin,deleteBlog)
BlogRouter.patch("/edit/:id",isAdmin,updateBlog)
BlogRouter.get("/singleBlog/:id", SingleBlog);


module.exports=BlogRouter;