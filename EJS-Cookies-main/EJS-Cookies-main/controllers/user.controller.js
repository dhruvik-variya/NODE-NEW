const User = require("../model/user.model");

const signupPage = (req, res) => {
  res.render("signup");
};

const loginPage = (req, res) => {
  res.render("login");
};

const signup = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    console.log(req.body);
    const isExist = await User.findOne({ email: email });

    if (isExist) {
      return res.json({ message: "Email already registered" });
    }

    const user = await User.create({ username, email, password });

    res.json({ message: "Account Created Successfully", user: user });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating account", error: error.message });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email: email });

  if (!user) {
    return res.json({ message: "Email not registers" });
  }

  if (user.password != password) {
    return res.json({ message: "Password incorrect" });
  }

  res.cookie("email", user.email);
  res.cookie("username", user.username);

  return res.json({ message: "User Login Sucessfully", user: user });
};

module.exports = {
  signupPage,
  loginPage,
  signup,
  login,
};
