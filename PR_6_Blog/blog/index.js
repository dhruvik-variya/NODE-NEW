const express = require("express");
const cookieParser = require("cookie-parser");
const path = require("path");
const db = require("./config/db");
const UserRouter = require("./routes/UserRoute.js");
const BlogRouter = require("./routes/BlogRoute.js");

const app = express();
const port = process.env.PORT || 8090;

// Middleware
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Set up view engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Routers
app.use("/user", UserRouter);
app.use("/blog", BlogRouter);

// Default route
app.get("/", (req, res) => {
  res.send("Welcome to the movie API");
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
  db();
});
