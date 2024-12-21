
const express = require("express");
const path = require("path");
const connection = require("./config/db");
const userRouter = require("./routes/UserRoute");

require("dotenv").config();
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// ejs
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.render("index");
});
app.use("/user", userRouter);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log("listening on port on" + PORT);
  connection();
});