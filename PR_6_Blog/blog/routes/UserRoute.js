const {Router}=require("express");
const { getSignUpPage,  getLoginPage,  deleteUser, SignUp, login } = require("../controller/UserController.js");

const UserRouter=Router();

UserRouter.get("/signup",getSignUpPage)
UserRouter.get("/login",getLoginPage)
UserRouter.post("/signup",SignUp)
UserRouter.post("/login",login)
UserRouter.delete("/users/:id", deleteUser);

module.exports=UserRouter;