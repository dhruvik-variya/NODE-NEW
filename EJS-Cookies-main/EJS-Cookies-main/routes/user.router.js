const {
  signupPage,
  loginPage,
  signup,
  login,
} = require("../controllers/user.controller");

const userRouter = require("express").Router();

//pages
userRouter.get("/signup", signupPage);
userRouter.get("/login", loginPage);

// logic
userRouter.post("/signup", signup);
userRouter.post("/login", login);

module.exports = userRouter;
