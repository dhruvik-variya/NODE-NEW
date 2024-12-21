const { Router } = require("express");
const { getLoginPage, getSignupPage, getUser, getUserById, createUser, updateUser, deleteUser, login } = require("../controllers/UserController");


const userRouter = Router();

// pages
userRouter.get("/login", getLoginPage);
userRouter.get("/signup", getSignupPage);
userRouter.get("/", getUser);
userRouter.get("/:userId", getUserById);
userRouter.post("/", createUser);
userRouter.patch("/:userId", updateUser);
userRouter.delete("/:userId", deleteUser);
userRouter.post("/login", login);

module.exports = userRouter;