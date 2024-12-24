const userRoute = require("express").Router();
const { Signup, login } = require("../controller/UserController");


userRoute.post("/signup",Signup);
userRoute.post("/login",login);

module.exports = userRoute;