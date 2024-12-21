const User = require("../model/UserSchema");

const getSignUpPage = (req, res) => {
  res.render("signUp");
};

const getLoginPage = (req, res) => {
  res.render("login");
};

const SignUp = async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.send(`Account created successfully ${user.username}`);
  } catch (error) {
    res.status(500).send("Error in Signup");
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const isExistUser = await User.findOne({ email });

    if (!isExistUser) {
      return res.status(401).send("Email not found");
    }
    if (isExistUser.password != password) {
      return res.status(401).send("Password incorrect");
    }
    res.cookie("role", isExistUser.role);
    res.cookie("id", isExistUser.id);
    res.cookie("username", isExistUser.username);
    res.send(`Welcome User ${isExistUser.username}`);
  } catch (error) {
    res.status(500).send("Error in Login");
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findByIdAndDelete(id);

    res.send(`User deleted ${user.username}`);
  } catch (error) {
    res.status(500).send("Error in deleteUser");
  }
};

module.exports = { getSignUpPage, SignUp, getLoginPage, login, deleteUser };
