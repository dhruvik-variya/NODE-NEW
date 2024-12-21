const express = require("express");
const dbConnect = require("./config/db");
const userRouter = require("./routes/user.router");
const path = require("path");
const cookies = require("cookie-parser");
const productRouter = require("./routes/product.router");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// use cookie-parser for store data in cookie storage
app.use(cookies());

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));

// Routes
app.use("/user", userRouter);
app.use("/product", productRouter);

// Intial Route
app.get("/", (req, res) => {
  const { username, email } = req.cookies;
  res.render("index", { username: username, email: email });
});

// Starting the Server
app.listen(11030, () => {
  console.log("Port is running on 11030");
  dbConnect();
});
